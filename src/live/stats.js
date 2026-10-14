// Live visitor and player stats, backed by Supabase (see supabase/schema.sql).
//
// Everything is off until REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_ANON_KEY
// are set at build time. The anon key is public by design: the database only
// exposes three functions to it. Nothing here uses cookies or stores an IP.

import { useEffect, useState } from "react";

const URL = (process.env.REACT_APP_SUPABASE_URL || "").replace(/\/$/, "");
const KEY = process.env.REACT_APP_SUPABASE_ANON_KEY || "";

export const LIVE_ON = Boolean(URL && KEY);

const BEAT_MS = 20000;
const POLL_MS = 15000;

const rpc = async (fn, args) => {
	// Legacy anon keys are JWTs and also go in Authorization; the newer
	// "sb_publishable_..." keys are sent as the apikey header only.
	const headers = { apikey: KEY, "Content-Type": "application/json" };
	if (KEY.startsWith("eyJ")) headers.Authorization = `Bearer ${KEY}`;
	const res = await fetch(`${URL}/rest/v1/rpc/${fn}`, {
		method: "POST",
		headers,
		body: JSON.stringify(args),
		keepalive: true,
	});
	if (!res.ok) throw new Error(`stats ${res.status}`);
	const text = await res.text();
	return text ? JSON.parse(text) : null;
};

const uuid = () =>
	typeof crypto !== "undefined" && crypto.randomUUID
		? crypto.randomUUID()
		: "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
				const r = (Math.random() * 16) | 0;
				return (c === "x" ? r : (r & 3) | 8).toString(16);
		  });

// One random id per browser tab. It dies with the tab.
let session = null;
const sessionId = () => {
	if (session) return session;
	try {
		session = sessionStorage.getItem("live-id");
		if (!session) {
			session = uuid();
			sessionStorage.setItem("live-id", session);
		}
	} catch (e) {
		session = session || uuid();
	}
	return session;
};

const doNotTrack = () => {
	try {
		return navigator.doNotTrack === "1" || window.doNotTrack === "1" || navigator.globalPrivacyControl === true;
	} catch (e) {
		return false;
	}
};

const gameOf = (path) => {
	const m = /^\/games\/([^/]+)\/play\/?$/.exec(path);
	return m ? m[1] : null;
};

// Tells the server "this tab is here" while the tab is visible.
export const useLiveHeartbeat = (path) => {
	useEffect(() => {
		if (!LIVE_ON || doNotTrack()) return undefined;
		const beat = () => {
			if (document.hidden) return;
			rpc("live_heartbeat", { p_id: sessionId(), p_page: path, p_game: gameOf(path) }).catch(() => {});
		};
		beat();
		const timer = setInterval(beat, BEAT_MS);
		document.addEventListener("visibilitychange", beat);
		return () => {
			clearInterval(timer);
			document.removeEventListener("visibilitychange", beat);
		};
	}, [path]);
};

// kind: "start" | "finish". Fire and forget.
export const trackPlay = (game, kind, score) => {
	if (!LIVE_ON || doNotTrack()) return;
	rpc("live_track", { p_game: game, p_kind: kind, p_score: Number.isFinite(score) ? Math.round(score) : null }).catch(() => {});
};

// Live numbers for the badge; null until the first answer (or when off).
export const useLiveStats = () => {
	const [stats, setStats] = useState(null);
	useEffect(() => {
		if (!LIVE_ON) return undefined;
		let alive = true;
		const load = () => {
			if (document.hidden) return;
			rpc("live_stats", {})
				.then((s) => alive && s && setStats(s))
				.catch(() => {});
		};
		const first = setTimeout(load, 1000); // after this tab's own first heartbeat lands
		const timer = setInterval(load, POLL_MS);
		document.addEventListener("visibilitychange", load);
		return () => {
			alive = false;
			clearTimeout(first);
			clearInterval(timer);
			document.removeEventListener("visibilitychange", load);
		};
	}, []);
	return stats;
};
