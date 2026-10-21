import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import Layout from "../site/Layout";
import { useI18n } from "../i18n";
import { SOLUTIONS, SCENARIOS, PROCESS } from "../ai/solutions";
import { HEROSCENE, CARDS } from "../ai/chunks";
import SolutionModal from "../ai/SolutionModal";
import Tour from "../ai/Tour";
import "../ai/dz.css";

const POS = ["4%", "50%", "82%"];
const ORB = ["calc(4% + 68px)", "calc(50% - 8px)", "calc(82% - 20px)"];
const TALK = ["5%", "calc(50% - 150px)", "calc(95% - 300px)"];
const pad = (n) => (n < 10 ? "0" + n : "" + n);

const AiSolutions = () => {
	const { site } = useI18n();
	const [tick, setTick] = useState(0);
	const [scn, setScn] = useState(0);
	const [t0, setT0] = useState(0);
	const [modal, setModal] = useState(-1);
	const [world, setWorld] = useState(false);
	const [focus, setFocus] = useState(null);
	const heroRef = useRef(null);

	useEffect(() => { window.scrollTo(0, 0); }, []);
	useEffect(() => {
		const id = setInterval(() => setTick((t) => t + 1), 3200);
		return () => clearInterval(id);
	}, []);

	const closeModal = useCallback(() => setModal(-1), []);
	const closeWorld = useCallback(() => setWorld(false), []);
	const openWorld = (station) => { setFocus(station == null ? null : station); setWorld(true); };
	const openSol = (i) => setModal(i);
	
	const delegate = (e) => {
		const o = e.target.closest("[data-open]");
		if (o) { openSol(Number(o.getAttribute("data-open"))); return; }
		if (e.target.closest("[data-act=world]")) openWorld(null);
	};

	// scenarios
	const S = SCENARIOS[scn];
	const n = S.steps.length;
	const k = (tick - t0) % (n + 1);
	const idle = k === n;
	const step = Math.min(n - 1, k);
	const who = idle ? 1 : S.steps[step][0];
	const act = (i) => "dz-actor" + (who === i ? " dz-on" : "");
	const fa = Math.floor(tick / 2) % PROCESS.length;

	return (
		<Layout current="ai">
			<Helmet>
				<title>{`AI solutions | ${site.name}`}</title>
				<meta name="description" content="AI solutions built to run in production: data readiness, knowledge search, AI features, agents, governance, integration and team enablement." />
			</Helmet>

			<div className="dz">
				<section className="dz-hero">
					<div className="dz-wrap" style={{ zIndex: 2 }}>
						<div className="dz-hero-grid">
							<div>
								<div className="dz-eyebrow"><span className="dz-dot" />Window open · live view from the future of work</div>
								<h1 className="dz-disp" style={{ fontSize: "clamp(40px,6vw,68px)", lineHeight: 1.02, fontWeight: 700, margin: "22px 0 20px", letterSpacing: "-.02em" }}>Build AI that works in <span style={{ background: "var(--grad-warm)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>production.</span></h1>
								<p style={{ fontSize: 18, color: "#d8d0ff", maxWidth: "50ch", margin: "0 0 30px" }}>From clean data to agents running in production. I design, build and ship AI features inside real products, with the engineering around them that keeps them reliable, secure and affordable.</p>
								<div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
									<Link className="dz-btn dz-btn--hot" to="/contact">Book a discovery call</Link>
									<button type="button" className="dz-btn dz-btn--ghost" onClick={() => openWorld(null)} style={{ background: "transparent" }}>Take the guided tour</button>
									<a className="dz-btn dz-btn--ghost" href="#modules">See what I offer</a>
								</div>
								<p className="dz-mono" style={{ margin: "26px 0 0", fontSize: 13, color: "#a99fd2", maxWidth: "46ch" }}>Step through the window for a short guided tour. Byte, our AI guide, follows one real job through each of the eight areas.</p>
							</div>
							<div style={{ padding: "0 6px 14px" }}>
								<div className="dz-window" role="img" aria-label="An animated window onto a future city where four small AI robots read invoices, answer customers, block bad requests and search documents" ref={heroRef} onClick={delegate} dangerouslySetInnerHTML={{ __html: HEROSCENE }} />
								<p className="dz-herocap"><span className="dz-dot" style={{ display: "inline-block", marginRight: 8 }} />Window open. Step through for a guided tour with Byte.</p>
							</div>
						</div>
					</div>
				</section>

				<section id="modules" className="dz-sec" style={{ marginTop: -60, paddingTop: 140 }}>
					<div className="dz-wrap">
						<h2 className="dz-h2">What I can do for you</h2>
						<p className="dz-lede">Pick one area or combine them. Each is a clear piece of work with a defined outcome. Every window below shows it happening.</p>
						<div onClick={delegate} dangerouslySetInnerHTML={{ __html: CARDS }} />
					</div>
				</section>

				<section id="scenarios" className="dz-sec dz-sec--wash">
					<div className="dz-wrap">
						<h2 className="dz-h2">Where this pays off</h2>
						<p className="dz-lede">Pick a scenario and watch it happen. If yours is not here, tell me what you are trying to do.</p>
						<div className="dz-scn">
							<div>
								{SCENARIOS.map((s, i) => (
									<button type="button" key={s.title} className={"dz-chip" + (i === scn ? " dz-on" : "")} onClick={() => { setScn(i); setT0(tick); }}><span className="dz-n">{pad(i + 1)}</span>{s.title}</button>
								))}
							</div>
							<div className="dz-stage" role="region" aria-label="Animated scenario">
								<div className="dz-outcome">{S.blurb}</div>
								<div className="dz-orb" style={{ left: ORB[who] }} />
								<div className="dz-talk" style={{ left: TALK[who] }}>{idle ? S.blurb : S.steps[step][1]}</div>
								<div className={act(0)} style={{ left: POS[0] }}><div className="dz-person" style={{ "--p": "#ff5c7a" }} /><div className="dz-nm">{S.left}</div></div>
								<div className={act(1)} style={{ left: "50%", marginLeft: -75 }}><div style={{ position: "relative", height: 78 }}><div className="dz-bot" style={{ "--b": "#3fe0b5", left: 56, top: 34, transform: "scale(1.5)" }} /></div><div className="dz-nm">AI agent</div></div>
								<div className={act(2)} style={{ right: "4%" }}><div className="dz-sbox"><i /><i style={{ "--c": "#ffb84d" }} /><i style={{ "--c": "#ff5c7a" }} /><i style={{ "--c": "#6b4cff" }} /></div><div className="dz-nm">{S.right}</div></div>
								<div className="dz-dots">{S.steps.map((_, i) => <i key={i} className={!idle && i === step ? "dz-on" : ""} />)}</div>
							</div>
						</div>
					</div>
				</section>

				<section className="dz-sec">
					<div className="dz-wrap">
						<h2 className="dz-h2">How an AI project runs</h2>
						<p className="dz-lede">One use case, one clear measure, and a working version fast.</p>
						<div className="dz-path"><div className="dz-walker" style={{ left: 4 + fa * 19.2 + "%" }}><div className="dz-bot" style={{ "--b": "#6b4cff", position: "relative", left: 0 }} /></div></div>
						<div className="dz-steps">
							{PROCESS.map((p, i) => (<div key={p[0]} className={"dz-step" + (i === fa ? " dz-on" : "")}><div className="dz-lb">Step {i + 1}</div><div className="dz-tt">{p[0]}</div><div className="dz-tx">{p[1]}</div></div>))}
						</div>
					</div>
				</section>

				<section className="dz-sec dz-sec--wash">
					<div className="dz-wrap" style={{ maxWidth: 860 }}>
						<h2 className="dz-h2">Why work with me</h2>
						<ul style={{ margin: "20px 0 0", padding: 0, listStyle: "none", display: "grid", gap: 14, fontSize: 18, color: "var(--ink2)" }}>
							{["An engineer, not a slide deck. I build the data layer, the AI feature and the production platform myself.", "Product thinking from leading a product team, so the AI solves a real user problem.", "Strong backend, cloud and payments background: Node.js, Python, PostgreSQL and AWS.", "Hands-on with the Claude API and AI-assisted development every day."].map((t, i) => (
								<li key={t} style={{ display: "flex", gap: 14 }}><span className="dz-mono" style={{ color: "var(--violet-deep)" }}>{pad(i + 1)}</span>{t}</li>
							))}
						</ul>
					</div>
				</section>

				<section className="dz-band">
					<div className="dz-wrap" style={{ textAlign: "center", maxWidth: 760 }}>
						<h2 className="dz-disp" style={{ fontSize: "clamp(32px,4.5vw,50px)", lineHeight: 1.06, margin: "0 0 14px", fontWeight: 700 }}>Have an AI idea or a stalled prototype?</h2>
						<p style={{ margin: "0 auto 28px", fontSize: 18, maxWidth: "52ch" }}>Tell me what you are building, your timeline and your budget range. I reply with a plan and a first step.</p>
						<Link className="dz-btn" style={{ background: "var(--ink)", color: "#fff" }} to="/contact">Book a discovery call</Link>
					</div>
				</section>

				<SolutionModal sol={modal >= 0 ? SOLUTIONS[modal] : null} onClose={closeModal} onWatch={(s) => { setModal(-1); openWorld(s.station); }} />
				<Tour open={world} start={focus} onClose={closeWorld} onOpenSolution={(s) => { setWorld(false); setModal(s.station); }} />
			</div>
		</Layout>
	);
};

export default AiSolutions;
