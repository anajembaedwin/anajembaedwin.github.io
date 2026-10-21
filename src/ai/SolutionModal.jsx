import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const TALK = ["5%", "calc(50% - 150px)", "calc(95% - 300px)"];
const ORB = ["calc(4% + 68px)", "calc(50% - 8px)", "calc(82% - 20px)"];

const SolutionModal = ({ sol, onClose, onWatch }) => {
	const [ms, setMs] = useState(0);
	const [convo, setConvo] = useState([]);

	useEffect(() => { setMs(0); setConvo([]); }, [sol]);
	useEffect(() => {
		if (!sol) return undefined;
		const onKey = (e) => e.key === "Escape" && onClose();
		window.addEventListener("keydown", onKey);
		document.body.style.overflow = "hidden";
		return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
	}, [sol, onClose]);

	if (!sol) return null;
	const st = sol.steps[Math.min(ms, sol.steps.length - 1)];
	const actor = (i, extra) => "dz-actor" + (st.who === i ? " dz-on" : "") + (extra ? " " + extra : "");

	return (
		<div className="dz-ovl" onClick={onClose}>
			<div className="dz-mdl" role="dialog" aria-modal="true" aria-label="Interactive explanation" onClick={(e) => e.stopPropagation()}>
				<div className="dz-mdl-head">
					<div>
						<div className="dz-mono" style={{ fontSize: 12, color: "var(--violet-deep)", letterSpacing: ".08em", textTransform: "uppercase" }}>Interactive explanation</div>
						<h2 className="dz-h2" style={{ margin: "6px 0 6px", fontSize: 32 }}>{sol.title}</h2>
						<p style={{ margin: 0, color: "var(--ink2)", maxWidth: "60ch" }}>{sol.tagline}</p>
					</div>
					<button type="button" className="dz-xbtn" onClick={onClose} aria-label="Close explanation">✕</button>
				</div>

				<div className="dz-mdl-grid">
					<div className="dz-stage" style={{ minHeight: 350 }}>
						<div className="dz-orb" style={{ left: ORB[st.who] }} />
						<div className="dz-talk" style={{ left: TALK[st.who], top: 30 }}>{st.say}</div>
						<div className={actor(0)} style={{ left: "4%" }}><div className="dz-person" style={{ "--p": "#ff5c7a" }} /><div className="dz-nm">{sol.left}</div></div>
						<div className={actor(1)} style={{ left: "50%", marginLeft: -75 }}><div style={{ position: "relative", height: 78 }}><div className="dz-bot" style={{ "--b": "#3fe0b5", left: 56, top: 34, transform: "scale(1.5)" }} /></div><div className="dz-nm">AI agent</div></div>
						<div className={actor(2)} style={{ right: "4%" }}><div className="dz-sbox"><i /><i style={{ "--c": "#ffb84d" }} /><i style={{ "--c": "#ff5c7a" }} /><i style={{ "--c": "#6b4cff" }} /></div><div className="dz-nm">{sol.right}</div></div>
						<div className="dz-dots">{sol.steps.map((_, i) => <i key={i} className={i === ms ? "dz-on" : ""} />)}</div>
					</div>
					<div className="dz-msteps">
						{sol.steps.map((s, i) => (
							<button type="button" key={s.t} className={"dz-mstep" + (i === ms ? " dz-on" : "")} onClick={() => setMs(i)}>
								<span className="dz-n">{i + 1}</span><b>{s.t}</b><span>{s.d}</span>
							</button>
						))}
					</div>
				</div>

				<div className="dz-tryh">Try it yourself</div>
				<div style={{ color: "var(--ink2)", fontSize: 15 }}>Pick a question and watch the AI answer. These are prepared examples, built the way your version would behave.</div>
				<div className="dz-try-chips">
					{sol.tries.map((t) => (<button type="button" key={t.q} className="dz-try-chip" onClick={() => setConvo((c) => c.concat([{ ...t, id: Math.random() }]).slice(-4))}>{t.q}</button>))}
				</div>
				<div className="dz-convo">
					{convo.map((c) => (
						<div key={c.id} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
							<div className="dz-cq">{c.q}</div>
							<div className="dz-ca"><div className="dz-dots2"><i /><i /><i /></div><div className="dz-ans">{c.a}</div><div className="dz-nt">{c.note}</div></div>
						</div>
					))}
				</div>

				<div className="dz-gets">
					<span className="dz-mono" style={{ fontSize: 12, color: "var(--ink2)", letterSpacing: ".06em", textTransform: "uppercase" }}>What you get</span>
					{sol.gets.map((g) => <span key={g} className="dz-g">{g}</span>)}
					<button type="button" className="dz-btn dz-btn--ghost" style={{ marginLeft: "auto", color: "var(--violet-deep)", borderColor: "var(--violet)", background: "transparent" }} onClick={() => onWatch(sol)}>See it on the tour</button>
					<Link className="dz-btn dz-btn--hot" to="/contact">Discuss this with Edwin</Link>
				</div>
			</div>
		</div>
	);
};

export default SolutionModal;
