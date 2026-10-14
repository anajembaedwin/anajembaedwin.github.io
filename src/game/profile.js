// The player's record, kept on their own device.

const KEY = "tinywars:profile";

const newId = () => {
	const bytes = new Uint8Array(12);
	(window.crypto || window.msCrypto).getRandomValues(bytes);
	return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
};

const blank = () => ({ id: newId(), name: "", side: "red", difficulty: "normal", glory: 0, battles: 0, wins: 0 });

export const loadProfile = () => {
	try {
		const raw = JSON.parse(window.localStorage.getItem(KEY));
		if (raw && raw.id) return { ...blank(), ...raw };
	} catch (error) {
		// fall through
	}
	return blank();
};

export const saveProfile = (profile) => {
	try {
		window.localStorage.setItem(KEY, JSON.stringify(profile));
	} catch (error) {
		// private mode: the record just won't persist
	}
};

export const cleanName = (raw) =>
	String(raw || "")
		.normalize("NFKC")
		.replace(/[^\p{L}\p{N} _.-]/gu, "")
		.replace(/\s+/g, " ")
		.trim()
		.slice(0, 16);

// ---- war server (optional) ----
const API = (process.env.REACT_APP_TINYWARS_API || "").replace(/\/$/, "");
export const hasServer = !!API;

const call = async (path, options) => {
	const ctl = new AbortController();
	const timer = setTimeout(() => ctl.abort(), 6000);
	try {
		const res = await fetch(`${API}${path}`, { ...options, signal: ctl.signal });
		const data = await res.json().catch(() => ({}));
		return { ok: res.ok, status: res.status, data };
	} finally {
		clearTimeout(timer);
	}
};

export const fetchWar = async () => {
	if (!API) return null;
	try {
		const r = await call("/api/war");
		return r.ok ? r.data : null;
	} catch (error) {
		return null;
	}
};

export const submitResult = async (profile, score) => {
	if (!API) return { sent: false };
	try {
		const r = await call("/api/result", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				id: profile.id,
				name: profile.name,
				side: profile.side,
				win: score.win,
				draw: score.draw,
				glory: score.glory,
				seconds: score.seconds,
				castlePct: score.castlePct,
				kills: score.kills,
			}),
		});
		return { sent: r.ok, status: r.status, data: r.data };
	} catch (error) {
		return { sent: false };
	}
};
