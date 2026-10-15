import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import Layout from "../site/Layout";
import GameBanner from "../site/GameBanner";
import { SIDES } from "../site/tiny";
import {
	CASTLE_HP,
	DURATION,
	KINDS,
	UNITS,
	H,
	W,
	blowHorn,
	canSpawn,
	createBattle,
	scoreBattle,
	spawn,
	step,
} from "../game/engine";
import { drawBattle, GLYPH } from "../game/draw";
import { cleanName, fetchWar, hasServer, loadProfile, saveProfile, submitResult } from "../game/profile";

import { useI18n } from "../i18n";
import { trackPlay } from "../live/stats";

const sideColor = (id) => SIDES.find((s) => s.id === id).color;
const fmt = (text, map) =>
	Object.keys(map).reduce((s, k) => s.split(`{${k}}`).join(map[k]), text);
const clock = (secs) => `${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, "0")}`;

// ---------- the battle itself ----------
const Battle = ({ profile, enemySide, onDone, onQuit }) => {
	const { ui } = useI18n();
	const t = ui.playPage;
	const canvas = useRef(null);
	const root = useRef(null);
	const battle = useRef(null);
	const [hud, setHud] = useState(null);
	const colors = useMemo(() => [sideColor(profile.side), sideColor(enemySide)], [profile.side, enemySide]);

	if (!battle.current) battle.current = createBattle({ difficulty: profile.difficulty });

	const trySpawn = useCallback((kind) => {
		if (spawn(battle.current, 0, kind)) {
			try {
				if (navigator.vibrate) navigator.vibrate(8);
			} catch (error) {
				// ignore
			}
		}
	}, []);
	const tryHorn = useCallback(() => blowHorn(battle.current, 0), []);

	// bring the field into view when the battle starts
	useEffect(() => {
		if (root.current) {
			const top = root.current.getBoundingClientRect().top + window.scrollY - 84;
			window.scrollTo({ top, behavior: "smooth" });
		}
	}, []);

	useEffect(() => {
		const onKey = (event) => {
			if (event.ctrlKey || event.metaKey || event.altKey) return;
			const i = Number(event.key);
			if (i >= 1 && i <= KINDS.length) {
				event.preventDefault();
				trySpawn(KINDS[i - 1]);
			} else if (event.key === "h" || event.key === "H" || event.key === "5") {
				event.preventDefault();
				tryHorn();
			}
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [trySpawn, tryHorn]);

	useEffect(() => {
		const el = canvas.current;
		const ctx = el.getContext("2d");
		let raf = null;
		let last = performance.now();
		let lastHud = 0;
		let finished = false;
		let dpr = 1;
		let width = 0;

		const size = () => {
			dpr = Math.min(2, window.devicePixelRatio || 1);
			width = el.clientWidth;
			el.width = Math.round(width * dpr);
			el.height = Math.round(((width * H) / W) * dpr);
		};
		size();
		window.addEventListener("resize", size);

		const frame = (now) => {
			raf = requestAnimationFrame(frame);
			const s = battle.current;
			const dt = Math.min(0.05, (now - last) / 1000);
			last = now;
			if (!document.hidden) step(s, dt);
			drawBattle(ctx, s, colors, dpr, el.width / dpr);
			if (now - lastHud > 90) {
				lastHud = now;
				setHud({
					time: Math.max(0, Math.ceil(DURATION - s.t)),
					gold: Math.floor(s.gold[0]),
					hp: [s.hp[0], s.hp[1]],
					cd: KINDS.map((k) => s.spawnCd[0][k] || 0),
					can: KINDS.map((k) => canSpawn(s, 0, k)),
					horn: Math.max(0, s.hornReady[0] - s.t),
					hornOn: s.t < s.hornUntil[0],
					count: s.units.filter((u) => u.team === 0 && u.hp > 0).length,
				});
			}
			if (s.over && !finished) {
				finished = true;
				setTimeout(() => onDone(scoreBattle(s)), 1100);
			}
		};
		raf = requestAnimationFrame(frame);
		return () => {
			cancelAnimationFrame(raf);
			window.removeEventListener("resize", size);
		};
	}, [colors, onDone]);

	const hpPct = (n) => `${Math.max(0, (100 * n) / CASTLE_HP)}%`;

	return (
		<div className="battle" ref={root}>
			<div className="battle__hud" aria-live="off">
				<div className="battle__castle">
					<span>{t.hud.you}</span>
					<div className="bar">
						<i style={{ width: hud ? hpPct(hud.hp[0]) : "100%", background: colors[0] }} />
					</div>
				</div>
				<div className="battle__time" aria-label={t.hud.time}>
					{clock(hud ? hud.time : DURATION)}
				</div>
				<div className="battle__castle battle__castle--right">
					<span>{t.hud.enemy}</span>
					<div className="bar">
						<i style={{ width: hud ? hpPct(hud.hp[1]) : "100%", background: colors[1] }} />
					</div>
				</div>
			</div>

			<canvas
				ref={canvas}
				className="battle__canvas"
				role="img"
				aria-label={t.canvasLabel}
			/>

			<div className="battle__bar">
				<div className="battle__gold" aria-label={t.hud.gold}>
					<span aria-hidden="true">🪙</span> {hud ? hud.gold : 100}
				</div>
				<div className="battle__units">
					{KINDS.map((kind, i) => {
						const def = UNITS[kind];
						const cd = hud ? hud.cd[i] : 0;
						const can = hud ? hud.can[i] : true;
						return (
							<button
								type="button"
								key={kind}
								className={`unit-btn${can ? "" : " is-off"}`}
								onClick={() => trySpawn(kind)}
								aria-disabled={!can}
								aria-keyshortcuts={String(i + 1)}
							>
								<span className="unit-btn__glyph" aria-hidden="true">
									{GLYPH[kind]}
								</span>
								<span className="unit-btn__name">{t.units[kind]}</span>
								<span className="unit-btn__cost">🪙 {def.cost}</span>
								<span className="unit-btn__key" aria-hidden="true">
									{i + 1}
								</span>
								{cd > 0 && (
									<i
										className="unit-btn__cd"
										style={{ height: `${Math.min(100, (cd / def.cd) * 100)}%` }}
									/>
								)}
							</button>
						);
					})}
				</div>
				<button
					type="button"
					className={`horn-btn${hud && hud.horn <= 0 ? " is-ready" : ""}${hud && hud.hornOn ? " is-on" : ""}`}
					onClick={tryHorn}
					aria-disabled={!(hud && hud.horn <= 0)}
					aria-keyshortcuts="H"
				>
					<span aria-hidden="true">📯</span> {t.hud.horn}
					<small>{hud && hud.horn > 0 ? `${Math.ceil(hud.horn)}s` : t.hud.ready}</small>
				</button>
			</div>
			<button type="button" className="battle__quit" onClick={onQuit}>
				{t.quit}
			</button>
		</div>
	);
};

// ---------- the page ----------
const Play = () => {
	const { site, ui } = useI18n();
	const t = ui.playPage;
	const sideNames = ui.tiny.sides;

	const [profile, setProfile] = useState(loadProfile);
	const [phase, setPhase] = useState("lobby"); // lobby | battle | result
	const [enemy, setEnemy] = useState("blue");
	const [result, setResult] = useState(null);
	const [war, setWar] = useState(null);
	const [name, setName] = useState(() => loadProfile().name);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const refreshWar = useCallback(() => {
		fetchWar().then(setWar);
	}, []);
	useEffect(() => {
		refreshWar();
	}, [refreshWar]);

	const nameOk = cleanName(name).length >= 2;

	const start = () => {
		if (!nameOk) return;
		const next = { ...profile, name: cleanName(name) };
		setProfile(next);
		saveProfile(next);
		const others = SIDES.filter((s) => s.id !== next.side);
		setEnemy(others[Math.floor(Math.random() * others.length)].id);
		setResult(null);
		trackPlay("tiny-wars", "start");
		setPhase("battle");
	};

	const onDone = useCallback(
		async (score) => {
			trackPlay("tiny-wars", "finish", score.glory);
			const next = {
				...profile,
				glory: profile.glory + score.glory,
				battles: profile.battles + 1,
				wins: profile.wins + (score.win ? 1 : 0),
			};
			setProfile(next);
			saveProfile(next);
			setResult({ score, status: hasServer ? "sending" : "offline" });
			setPhase("result");
			if (hasServer) {
				const r = await submitResult(profile, score);
				let status = "failed";
				if (r.sent) status = "sent";
				else if (r.status === 409) {
					status = "locked";
					if (r.data && r.data.side) {
						const fixed = { ...next, side: r.data.side };
						setProfile(fixed);
						saveProfile(fixed);
					}
				} else if (r.status === 429) status = "slow";
				setResult({ score, status });
				refreshWar();
			}
		},
		[profile, refreshWar]
	);

	const diffs = ["easy", "normal", "hard"];
	const totals = war ? war.totals : null;
	const totalSum = totals ? Math.max(1, totals.red + totals.blue + totals.green) : 1;

	return (
		<Layout current="games">
			<Helmet>
				<title>{`${t.title} | ${site.name}`}</title>
				<meta name="description" content={t.metaDesc} />
			</Helmet>

			<section className="page-hero">
				<div className="wrap page-hero--split">
					<div>
						<h1 className="page-hero__title">{t.title}</h1>
						<p className="page-hero__lead">{t.lead}</p>
					</div>
					<GameBanner slug="tiny-wars" />
				</div>
			</section>

			<section className="section">
				<div className="wrap">
					{phase === "battle" && (
						<Battle
							profile={profile}
							enemySide={enemy}
							onDone={onDone}
							onQuit={() => setPhase("lobby")}
						/>
					)}

					{phase === "result" && result && (
						<div className="result">
							<h2 className="result__title">
								{result.score.win ? t.result.win : result.score.draw ? t.result.draw : t.result.lose}
							</h2>
							<p className="result__glory">
								{fmt(t.result.glory, { n: result.score.glory })}
							</p>
							<ul className="result__stats">
								<li>{fmt(t.result.kills, { n: result.score.kills })}</li>
								<li>{fmt(t.result.castle, { n: result.score.castlePct })}</li>
								<li>{fmt(t.result.time, { n: result.score.seconds })}</li>
							</ul>
							<p className="result__note">{t.result[result.status]}</p>
							<p className="result__note">
								{fmt(t.result.record, { w: profile.wins, b: profile.battles, g: profile.glory })}
							</p>
							<div className="game-card__actions">
								<button type="button" className="btn btn--hot" onClick={start}>
									{t.result.again}
								</button>
								<button type="button" className="btn btn--ghost-dark" onClick={() => setPhase("lobby")}>
									{t.result.change}
								</button>
							</div>
						</div>
					)}

					{phase === "lobby" && (
						<div className="lobby">
							<form
								className="lobby__form"
								onSubmit={(event) => {
									event.preventDefault();
									start();
								}}
							>
								<label className="field">
									<span>{t.lobby.nameLabel}</span>
									<input
										type="text"
										value={name}
										maxLength={16}
										autoComplete="off"
										placeholder={t.lobby.namePlaceholder}
										onChange={(event) => setName(event.target.value)}
									/>
								</label>

								<fieldset className="choice">
									<legend>{t.lobby.sideLabel}</legend>
									{SIDES.map((side) => (
										<label
											key={side.id}
											className={`choice__item${profile.side === side.id ? " is-on" : ""}`}
											style={{ "--c": side.color }}
										>
											<input
												type="radio"
												name="side"
												checked={profile.side === side.id}
												onChange={() => setProfile({ ...profile, side: side.id })}
											/>
											<i aria-hidden="true" />
											{sideNames[side.id]}
										</label>
									))}
								</fieldset>

								<fieldset className="choice">
									<legend>{t.lobby.diffLabel}</legend>
									{diffs.map((d) => (
										<label
											key={d}
											className={`choice__item${profile.difficulty === d ? " is-on" : ""}`}
										>
											<input
												type="radio"
												name="difficulty"
												checked={profile.difficulty === d}
												onChange={() => setProfile({ ...profile, difficulty: d })}
											/>
											{t.lobby.diff[d]}
										</label>
									))}
								</fieldset>

								<button type="submit" className="btn btn--hot" disabled={!nameOk}>
									{t.lobby.start}
								</button>
								{profile.battles > 0 && (
									<p className="lobby__record">
										{fmt(t.result.record, { w: profile.wins, b: profile.battles, g: profile.glory })}
									</p>
								)}
							</form>

							<div className="lobby__how">
								<h2>{t.how.title}</h2>
								<ol>
									{t.how.steps.map((step) => (
										<li key={step}>{step}</li>
									))}
								</ol>
								<p className="lobby__keys">{t.how.keys}</p>
							</div>
						</div>
					)}
				</div>
			</section>

			<section className="section section--wash">
				<div className="wrap">
					<h2 className="section-title">{t.war.title}</h2>
					<p className="prose">{t.war.lead}</p>
					{totals ? (
						<div className="war">
							{SIDES.map((side) => (
								<div className="war__row" key={side.id}>
									<span className="war__name">{sideNames[side.id]}</span>
									<div className="bar">
										<i style={{ width: `${(100 * totals[side.id]) / totalSum}%`, background: side.color }} />
									</div>
									<span className="war__n">{totals[side.id]}</span>
								</div>
							))}
							{war.top.length > 0 && (
								<ol className="war__top">
									{war.top.slice(0, 5).map((p, i) => (
										<li key={`${p.name}${i}`}>
											<i style={{ background: sideColor(p.side) }} aria-hidden="true" />
											{p.name}
											<b>{p.glory}</b>
										</li>
									))}
								</ol>
							)}
						</div>
					) : (
						<p className="war__offline">{t.war.offline}</p>
					)}
					<p className="prose war__next">{t.war.next}</p>
					<div className="game-card__actions">
						<Link className="btn btn--ghost-dark" to="/games/tiny-wars">
							{t.war.village}
						</Link>
						<Link className="btn btn--ghost-dark" to="/games">
							{t.war.back}
						</Link>
					</div>
				</div>
			</section>
		</Layout>
	);
};

export default Play;
