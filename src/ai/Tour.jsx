import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { createSim, step, inject, JOB_TYPES, STATIONS } from "./sim";
import { SOLUTIONS } from "./solutions";

// One job per stop, run through the real simulation engine with a single
// courier. Nothing else is moving, so it is easy to follow.
const JOB_FOR = ["invoice", "question", "ticket", "lead", "release", "attack", "invoice", "release"];

const nameOf = (id) => (id === "inbox" ? "Inbox" : id === "outbox" ? "Delivered" : STATIONS[id].name);

const Tour = ({ open, start, onClose, onOpenSolution }) => {
	const [i, setI] = useState(0);
	const [run, setRun] = useState(0);
	const [, force] = useState(0);
	const ref = useRef({ sim: null, job: null, doneAt: null });

	useEffect(() => { if (open) { setI(start == null ? 0 : start); setRun(0); } }, [open, start]);

	useEffect(() => {
		if (!open) return undefined;
		const sim = createSim(3, { couriers: 1, spawn: false });
		const job = inject(sim, JOB_FOR[i]);
		ref.current = { sim, job, doneAt: null, snap: { text: "", step: 0 } };
		const id = setInterval(() => {
			const r = ref.current;
			step(r.sim, 0.1);
			const j = r.sim.jobs.get(r.job.id);
			if (j) { r.last = { status: j.status, loc: j.loc, step: j.step, progress: j.loc !== "courier" && typeof j.loc === "number" && r.sim.stations[j.loc].active === j.id ? r.sim.stations[j.loc].progress : 0 }; }
			if (!j && r.doneAt == null) r.doneAt = r.sim.t;
			if (r.doneAt != null && r.sim.t - r.doneAt > 3.5) { setRun((n) => n + 1); return; }
			force((n) => n + 1);
		}, 100);
		return () => clearInterval(id);
	}, [open, i, run]);

	useEffect(() => {
		if (!open) return undefined;
		const onKey = (e) => {
			if (e.key === "Escape") onClose();
			if (e.key === "ArrowRight") setI((n) => Math.min(7, n + 1));
			if (e.key === "ArrowLeft") setI((n) => Math.max(0, n - 1));
		};
		window.addEventListener("keydown", onKey);
		document.body.style.overflow = "hidden";
		return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
	}, [open, onClose]);

	if (!open) return null;
	const sol = SOLUTIONS[i];
	const { sim, job, last } = ref.current;
	if (!sim) return null;
	const type = JOB_TYPES[JOB_FOR[i]];
	const nodes = ["inbox", ...job.route, "outbox"];
	const live = sim.jobs.get(job.id);
	const blocked = !live && sim.stats.blocked > 0;
	const delivered = !live && sim.stats.delivered > 0;

	// where is the job right now, as a position along the route
	let pos = 0;
	if (blocked) pos = nodes.indexOf(5);
	else if (delivered) pos = nodes.length - 1;
	else if (live) {
		if (live.status === "inbox") pos = 0;
		else if (live.status === "carried") pos = live.step + 0.5;
		else if (live.status === "ready") pos = live.step;
		else pos = live.step + 1;
	}
	const evs = sim.events.filter((e) => e.jobId === job.id);
	const lastEv = evs.length ? evs[evs.length - 1] : null;
	let status = lastEv ? lastEv.text : "Waiting in the inbox.";
	if (live && live.status === "inbox") status = "Waiting in the inbox for a courier.";
	const pct = last && live && live.status === "working" ? Math.round(last.progress * 100) : null;

	return (
		<div className="dz-ovl" onClick={onClose}>
			<div className="dz-mdl dz-tour" role="dialog" aria-modal="true" aria-label="Guided tour" onClick={(e) => e.stopPropagation()}>
				<div className="dz-mdl-head">
					<div>
						<div className="dz-mono" style={{ fontSize: 12, color: "var(--violet-deep)", letterSpacing: ".08em", textTransform: "uppercase" }}>Guided tour · {i + 1} of 8</div>
						<h2 className="dz-h2" style={{ margin: "6px 0 6px", fontSize: 32 }}>{sol.title}</h2>
					</div>
					<button type="button" className="dz-xbtn" onClick={onClose} aria-label="Close tour">✕</button>
				</div>

				<div className="dz-tour-dots" role="tablist" aria-label="Tour stops">
					{SOLUTIONS.map((s, k) => (<button type="button" key={s.key} role="tab" aria-selected={k === i} aria-label={s.short} className={k === i ? "dz-on" : ""} onClick={() => setI(k)} />))}
				</div>

				<div className="dz-byte-say">
					<div className="dz-bot dz-bot--static" style={{ "--b": "#ffb84d" }} />
					<div><b>Byte</b><p>{sol.byte}</p></div>
				</div>

				<div className="dz-follow">
					<div className="dz-follow-h">Follow one job: <b>{type.label.toLowerCase()}</b>, "{job.text}"</div>
					<div className="dz-route">
						<div className="dz-route-line" />
						{nodes.map((n, k) => (
							<div key={k} className={"dz-node" + (Math.round(pos) === k ? " dz-here" : "") + (k < pos ? " dz-passed" : "") + (n === i ? " dz-focus" : "")} style={{ left: (k / (nodes.length - 1)) * 100 + "%" }}>
								<span className="dz-node-dot" />
								<span className="dz-node-name">{nameOf(n)}</span>
							</div>
						))}
						<div className={"dz-token" + (blocked ? " dz-token--bad" : "")} style={{ left: (pos / (nodes.length - 1)) * 100 + "%", background: type.color === "#ffffff" ? "#6b4cff" : type.color }} />
					</div>
					<div className="dz-status" aria-live="polite">
						<span className="dz-dot" style={{ display: "inline-block" }} />
						{blocked ? "Blocked at the gate: it tries to override the rules or pull out private data." : delivered ? "Delivered in " + (sim.stats.latencySum / Math.max(1, sim.stats.latencyCount)).toFixed(1) + " seconds." : status}
						{pct != null && <span className="dz-pbar"><b style={{ width: pct + "%" }} /></span>}
					</div>
				</div>

				<div className="dz-gets" style={{ marginTop: 18 }}>
					<span className="dz-mono" style={{ fontSize: 12, color: "var(--ink2)", letterSpacing: ".06em", textTransform: "uppercase" }}>What you get</span>
					{sol.gets.map((g) => <span key={g} className="dz-g">{g}</span>)}
				</div>

				<div className="dz-tour-nav">
					<button type="button" className="dz-btn dz-btn--line" disabled={i === 0} onClick={() => setI(i - 1)}>← Back</button>
					<button type="button" className="dz-btn dz-btn--line" onClick={() => setRun((n) => n + 1)}>Replay</button>
					<button type="button" className="dz-btn dz-btn--line" onClick={() => onOpenSolution(sol)}>Questions and details</button>
					{i < 7 ? <button type="button" className="dz-btn dz-btn--hot" onClick={() => setI(i + 1)}>Next →</button> : <Link className="dz-btn dz-btn--hot" to="/contact">Book a discovery call</Link>}
				</div>
			</div>
		</div>
	);
};

export default Tour;
