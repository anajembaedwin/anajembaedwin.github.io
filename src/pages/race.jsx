import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import Layout from "../site/Layout";
import GameBanner from "../site/GameBanner";
import { createRace, RACE } from "../game/race";
import { useI18n } from "../i18n";
import { trackPlay } from "../live/stats";

const read = (k) => {
	try {
		return JSON.parse(window.localStorage.getItem(k));
	} catch (error) {
		return null;
	}
};
const write = (k, v) => {
	try {
		window.localStorage.setItem(k, JSON.stringify(v));
	} catch (error) {
		// ignore
	}
};

const fmt = (t) => {
	const m = Math.floor(t / 60);
	const s = (t % 60).toFixed(2).padStart(5, "0");
	return `${m}:${s}`;
};

const KEYMAP = {
	ArrowLeft: "left",
	a: "left",
	A: "left",
	ArrowRight: "right",
	d: "right",
	D: "right",
	ArrowDown: "brake",
	s: "brake",
	S: "brake",
	" ": "nitro",
	ArrowUp: "nitro",
	Shift: "nitro",
	w: "nitro",
	W: "nitro",
};

const Race = () => {
	const { site, ui } = useI18n();
	const T = ui.race;
	const canvasRef = useRef(null);
	const engine = useRef(null);
	const [phase, setPhase] = useState("ready");
	const [result, setResult] = useState(null);
	const [muted, setMuted] = useState(() => read("race:muted") === true);
	const [copied, setCopied] = useState(false);
	const best = useRef(read("race:best"));

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	useEffect(() => {
		const labels = {
			pos: T.hud.pos,
			lap: T.hud.lap,
			kmh: T.hud.kmh,
			nitro: T.hud.nitro,
			go: T.hud.go,
			bolt: T.hud.bolt,
			finish: T.hud.finish,
		};
		const race = createRace(canvasRef.current, labels, {
			onStart: () => {
				setPhase("racing");
				setResult(null);
				trackPlay("deploy-rush", "start");
			},
			onFinish: (r) => {
				const prev = best.current;
				const record = !prev || r.time < prev.time;
				if (record) {
					best.current = { time: r.time, lap: r.bestLap, place: r.place };
					write("race:best", best.current);
				}
				setResult({ ...r, record, best: best.current });
				setPhase("done");
				// score: the faster the time and the higher the place, the bigger the number
				trackPlay("deploy-rush", "finish", Math.max(1, (RACE.TOTAL - r.place + 1) * 1000 - r.time * 4));
			},
		});
		race.setMuted(read("race:muted") === true);
		engine.current = race;
		if (/[?&]dev=1/.test(window.location.search)) window.__race = race;
		return () => {
			race.destroy();
			engine.current = null;
		};
	}, [T]);

	useEffect(() => {
		const onKey = (down) => (e) => {
			const name = KEYMAP[e.key];
			if (!name || !engine.current) return;
			if (e.target && /input|textarea|select/i.test(e.target.tagName)) return;
			e.preventDefault();
			engine.current.input(name, down);
		};
		const kd = onKey(true);
		const ku = onKey(false);
		window.addEventListener("keydown", kd);
		window.addEventListener("keyup", ku);
		const blur = () => ["left", "right", "brake", "nitro"].forEach((n) => engine.current && engine.current.input(n, false));
		window.addEventListener("blur", blur);
		return () => {
			window.removeEventListener("keydown", kd);
			window.removeEventListener("keyup", ku);
			window.removeEventListener("blur", blur);
		};
	}, []);

	const start = useCallback(() => {
		if (engine.current) engine.current.start();
	}, []);

	const toggleMute = () => {
		const next = !muted;
		setMuted(next);
		write("race:muted", next);
		if (engine.current) engine.current.setMuted(next);
	};

	const hold = (name) => ({
		onPointerDown: (e) => {
			e.preventDefault();
			e.currentTarget.setPointerCapture && e.currentTarget.setPointerCapture(e.pointerId);
			engine.current && engine.current.input(name, true);
		},
		onPointerUp: () => engine.current && engine.current.input(name, false),
		onPointerCancel: () => engine.current && engine.current.input(name, false),
		onLostPointerCapture: () => engine.current && engine.current.input(name, false),
		onContextMenu: (e) => e.preventDefault(),
	});

	const share = () => {
		if (!result) return;
		const text = T.shareText
			.replace("{place}", T.places[result.place - 1])
			.replace("{total}", result.total)
			.replace("{time}", fmt(result.time));
		const full = `${text} ${window.location.origin}/games/deploy-rush/play`;
		const done = () => {
			setCopied(true);
			setTimeout(() => setCopied(false), 1800);
		};
		if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(full).then(done, done);
		else done();
	};

	return (
		<Layout current="games">
			<Helmet>
				<title>{`${T.name} | ${site.name}`}</title>
				<meta name="description" content={T.metaDesc} />
			</Helmet>

			<section className="page-hero">
				<div className="wrap page-hero--split">
					<div>
						<p className="eyebrow">{T.eyebrow}</p>
						<h1 className="page-hero__title">{T.name}</h1>
						<p className="page-hero__lead">{T.lead}</p>
					</div>
					<GameBanner slug="deploy-rush" phoneHide />
				</div>
			</section>

			<section className="section">
				<div className="wrap">
					<div className="race">
						<div className="race__stage">
							<canvas ref={canvasRef} className="race__canvas" aria-label={T.name} />

							{phase === "ready" && (
								<div className="race__overlay">
									<div className="race__card">
										<h2>{T.readyTitle}</h2>
										<p>{T.readyBody}</p>
										<p className="race__keys">{T.keys}</p>
										{best.current && (
											<p className="race__best">
												{T.best} {fmt(best.current.time)}
											</p>
										)}
										<button type="button" className="btn btn--hot" onClick={start}>
											{T.start}
										</button>
									</div>
								</div>
							)}

							{phase === "done" && result && (
								<div className="race__overlay">
									<div className="race__card">
										<h2>{T.places[result.place - 1]}</h2>
										<p className="race__time">{fmt(result.time)}</p>
										<p>
											{T.bestLap} {fmt(result.bestLap)}
										</p>
										{result.record ? <p className="race__best">{T.record}</p> : <p className="race__best">{T.best} {fmt(result.best.time)}</p>}
										<div className="game-card__actions">
											<button type="button" className="btn btn--hot" onClick={start}>
												{T.again}
											</button>
											<button type="button" className="btn btn--ghost-dark" onClick={share}>
												{copied ? T.copied : T.share}
											</button>
											<Link className="btn btn--ghost-dark" to="/games">
												{T.moreGames}
											</Link>
										</div>
									</div>
								</div>
							)}

							<button type="button" className="race__mute" onClick={toggleMute} aria-pressed={muted} aria-label={muted ? T.soundOn : T.soundOff}>
								{muted ? "🔇" : "🔊"}
							</button>
						</div>

						<div className="race__pad" aria-label={T.controls}>
							<div className="race__pad-group">
								<button type="button" className="race__btn" aria-label={T.left} {...hold("left")}>
									◀
								</button>
								<button type="button" className="race__btn" aria-label={T.right} {...hold("right")}>
									▶
								</button>
							</div>
							<div className="race__pad-group">
								<button type="button" className="race__btn race__btn--brake" {...hold("brake")}>
									{T.brake}
								</button>
								<button type="button" className="race__btn race__btn--nitro" {...hold("nitro")}>
									{T.boost}
								</button>
							</div>
						</div>
						<p className="race__tip">{T.tip}</p>
					</div>
				</div>
			</section>
		</Layout>
	);
};

export default Race;
