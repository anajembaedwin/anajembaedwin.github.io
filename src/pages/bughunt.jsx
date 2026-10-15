import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import Layout from "../site/Layout";
import GameBanner from "../site/GameBanner";
import { Pip } from "../site/Guide";
import { todays, dayKey } from "../game/bugs";
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

const yesterday = () => {
	const d = new Date();
	d.setDate(d.getDate() - 1);
	return dayKey(d);
};

const BugHunt = () => {
	const { site, ui } = useI18n();
	const T = ui.bugHunt;
	const puzzles = useMemo(() => todays(), []);
	const today = dayKey();

	const [done, setDone] = useState(() => read(`bughunt:${today}`));
	const [streak, setStreak] = useState(() => read("bughunt:streak") || { n: 0, last: "" });
	const [started, setStarted] = useState(false);
	const [idx, setIdx] = useState(0);
	const [scores, setScores] = useState([]);
	const [wrong, setWrong] = useState([]); // wrong line indexes this puzzle
	const [solved, setSolved] = useState(false);
	const [hint, setHint] = useState(null); // line indexes lit by the lantern
	const [hintsLeft, setHintsLeft] = useState(2);
	const [usedHint, setUsedHint] = useState(false);
	const [mood, setMood] = useState("idle");
	const [say, setSay] = useState(T.intro);
	const [copied, setCopied] = useState(false);
	const [look, setLook] = useState({ x: 0, y: 0 });
	const moodTimer = useRef(null);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const pose = (m, ms = 1800) => {
		clearTimeout(moodTimer.current);
		setMood(m);
		moodTimer.current = setTimeout(() => setMood("idle"), ms);
	};
	useEffect(() => () => clearTimeout(moodTimer.current), []);

	const puzzle = puzzles[idx];
	const total = puzzles.length;

	const start = () => {
		setStarted(true);
		trackPlay("daily-bug-hunt", "start");
		setSay(T.go);
		pose("wave");
	};

	const pick = (i) => {
		if (solved || wrong.includes(i)) return;
		if (i === puzzle.bug) {
			const pts = wrong.length === 0 ? 10 : 5;
			const got = Math.max(pts - (usedHint ? 2 : 0), 3);
			setScores((s) => [...s, got]);
			setSolved(true);
			setHint(null);
			setSay(T.right);
			pose("wave", 2200);
		} else {
			setWrong((w) => [...w, i]);
			setSay(T.wrong);
			pose("look", 1500);
		}
	};

	const lantern = () => {
		if (hintsLeft < 1 || solved) return;
		const decoy = [0, 1, 2, 3, 4].filter((n) => n !== puzzle.bug && n < puzzle.lines.length && puzzle.lines[n]).slice(0, 1);
		setHint([puzzle.bug, ...decoy].sort());
		setHintsLeft((h) => h - 1);
		setUsedHint(true);
		setSay(T.hintSay);
		pose("lantern", 1800);
	};

	const next = () => {
		if (idx + 1 >= total) {
			const score = scores.reduce((a, b) => a + b, 0);
			const result = { score, date: today };
			let n = 1;
			if (streak.last === yesterday()) n = streak.n + 1;
			else if (streak.last === today) n = streak.n;
			const ns = { n, last: today };
			trackPlay("daily-bug-hunt", "finish", score);
			write(`bughunt:${today}`, result);
			write("bughunt:streak", ns);
			setStreak(ns);
			setDone(result);
			setSay(T.finished);
			pose("wave", 2400);
			return;
		}
		setIdx(idx + 1);
		setWrong([]);
		setSolved(false);
		setHint(null);
		setUsedHint(false);
		setSay(T.next);
	};

	const share = async () => {
		const text = T.shareText
			.replace("{score}", done.score)
			.replace("{max}", total * 10)
			.replace("{streak}", streak.n)
			.replace("{date}", today)
			.replace("{url}", window.location.origin + "/games/daily-bug-hunt/play");
		try {
			await navigator.clipboard.writeText(text);
			setCopied(true);
			setTimeout(() => setCopied(false), 2500);
		} catch (error) {
			window.prompt(T.share, text); // eslint-disable-line no-alert
		}
	};

	const onMove = (e) => {
		const r = e.currentTarget.getBoundingClientRect();
		const vx = e.clientX - (r.left + r.width / 2);
		const vy = e.clientY - (r.top + r.height * 0.3);
		const d = Math.hypot(vx, vy) || 1;
		const k = Math.min(1, d / 240);
		setLook({ x: (vx / d) * 2.4 * k, y: (vy / d) * 1.8 * k });
	};

	const maxScore = total * 10;

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
					<GameBanner slug="daily-bug-hunt" />
				</div>
			</section>

			<section className="section">
				<div className="wrap bh" onPointerMove={onMove}>
					<aside className="bh__pip">
						<div className="bh__pipbox">
							<Pip mood={mood} look={look} talking={mood === "wave" || mood === "look"} />
						</div>
						<p className="bh__say" role="status" aria-live="polite">
							{say}
						</p>
					</aside>

					<div className="bh__main">
						{done && (
							<div className="bh__card">
								<h2>{T.doneTitle}</h2>
								<p className="bh__score">
									{done.score}
									<span> / {maxScore}</span>
								</p>
								<p>
									{T.streak.replace("{n}", streak.n)} {streak.n >= 3 ? "🔥" : ""}
								</p>
								<div className="game-card__actions">
									<button type="button" className="btn btn--hot" onClick={share}>
										{copied ? T.copied : T.share}
									</button>
									<Link className="btn btn--ghost-dark" to="/games">
										{T.moreGames}
									</Link>
								</div>
								<p className="bh__note">{T.comeBack}</p>
							</div>
						)}

						{!done && !started && (
							<div className="bh__card">
								<h2>{T.readyTitle}</h2>
								<p>{T.readyBody.replace("{n}", total)}</p>
								{streak.n > 0 && <p>{T.streak.replace("{n}", streak.n)}</p>}
								<button type="button" className="btn btn--hot" onClick={start}>
									{T.start}
								</button>
							</div>
						)}

						{!done && started && (
							<div className="bh__card">
								<div className="bh__top">
									<span>{T.progress.replace("{n}", idx + 1).replace("{total}", total)}</span>
									<span>{scores.reduce((a, b) => a + b, 0)} {T.pts}</span>
								</div>
								<p className="bh__ask">{T.find}</p>
								<ol className="bh__code" aria-label={T.codeLabel}>
									{puzzle.lines.map((line, i) => {
										const cls = [
											"bh__line",
											wrong.includes(i) ? "is-wrong" : "",
											solved && i === puzzle.bug ? "is-bug" : "",
											hint && hint.includes(i) && !solved ? "is-lit" : "",
										].join(" ");
										return (
											<li key={i}>
												<button type="button" className={cls} onClick={() => pick(i)} disabled={!line || solved}>
													<span className="bh__no">{i + 1}</span>
													<code>{line || " "}</code>
												</button>
											</li>
										);
									})}
								</ol>

								{solved ? (
									<div className="bh__why">
										<strong>{T.whyTitle}</strong>
										<p>{T.why[puzzle.id]}</p>
										<button type="button" className="btn btn--hot" onClick={next}>
											{idx + 1 >= total ? T.finish : T.nextBtn}
										</button>
									</div>
								) : (
									<button type="button" className="btn btn--ghost-dark" onClick={lantern} disabled={hintsLeft < 1}>
										{T.lantern.replace("{n}", hintsLeft)}
									</button>
								)}
							</div>
						)}
					</div>
				</div>
			</section>
		</Layout>
	);
};

export default BugHunt;
