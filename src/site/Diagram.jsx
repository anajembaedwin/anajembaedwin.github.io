import React, { useEffect, useRef, useState } from "react";

import { useI18n } from "../i18n";

// One request travelling through a product, in four steps. A single clock
// drives the packets, the lit-up boxes and the caption, so they never drift.

const CYCLE = 8000;
const STEP = 2000;

const PACKETS = [
	{ d: "M102 60H170", from: 0, to: 1600 },
	{ d: "M266 60H300V26H340", from: 2000, to: 3600 },
	{ d: "M266 60H300V94H340", from: 2000, to: 3600 },
	{ d: "M436 26H470V60H510", from: 4000, to: 5600 },
	{ d: "M436 94H470V60H510", from: 4000, to: 5600 },
	{ d: "M562 80V136H54V80", from: 6000, to: 7800, back: true },
];

const NODES = [
	{ id: "client", x: 6, y: 40, w: 96, label: "Client", on: [0, 3] },
	{ id: "api", x: 170, y: 40, w: 96, label: "API", on: [0, 1] },
	{ id: "queue", x: 340, y: 6, w: 96, label: "Queue", on: [1, 2] },
	{ id: "db", x: 340, y: 74, w: 96, label: "Postgres", on: [1, 2] },
	{ id: "chain", x: 510, y: 40, w: 104, label: "Polygon", on: [2, 3] },
];

const ease = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

const Diagram = () => {
	const { ui } = useI18n();
	const steps = ui.diagramSteps;
	const [step, setStep] = useState(0);
	const [live, setLive] = useState(false);
	const wrap = useRef(null);
	const paths = useRef([]);
	const dots = useRef([]);
	const lens = useRef([]);

	useEffect(() => {
		const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		if (reduced || !("IntersectionObserver" in window)) return undefined;
		const io = new IntersectionObserver(([e]) => setLive(e.isIntersecting), { threshold: 0.2 });
		if (wrap.current) io.observe(wrap.current);
		return () => io.disconnect();
	}, []);

	useEffect(() => {
		lens.current = paths.current.map((p) => (p ? p.getTotalLength() : 0));
		if (!live) {
			dots.current.forEach((d) => d && d.setAttribute("opacity", "0"));
			return undefined;
		}
		let frame;
		const start = performance.now();
		let last = -1;
		const tick = (now) => {
			const t = (now - start) % CYCLE;
			const s = Math.floor(t / STEP);
			if (s !== last) {
				last = s;
				setStep(s);
			}
			PACKETS.forEach((p, i) => {
				const dot = dots.current[i];
				const path = paths.current[i];
				if (!dot || !path) return;
				if (t < p.from || t > p.to) {
					dot.setAttribute("opacity", "0");
					return;
				}
				const k = ease((t - p.from) / (p.to - p.from));
				const pt = path.getPointAtLength(k * lens.current[i]);
				dot.setAttribute("cx", pt.x.toFixed(1));
				dot.setAttribute("cy", pt.y.toFixed(1));
				dot.setAttribute("opacity", "1");
			});
			frame = requestAnimationFrame(tick);
		};
		frame = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(frame);
	}, [live]);

	return (
		<div className="flow" ref={wrap}>
			<svg className="diagram" viewBox="0 0 620 150" role="img" aria-labelledby="diagram-title">
				<title id="diagram-title">{ui.diagramTitle}</title>
				<g className="diagram__lines">
					{NODES.map((n) => (
						<rect
							key={n.id}
							x={n.x}
							y={n.y}
							width={n.w}
							height="40"
							rx="12"
							className={live && n.on.includes(step) ? "is-on" : ""}
						/>
					))}
					{PACKETS.map((p, i) => (
						<path
							key={i}
							ref={(el) => {
								paths.current[i] = el;
							}}
							d={p.d}
							className={p.back ? "diagram__back" : ""}
						/>
					))}
				</g>
				<g className="diagram__text" textAnchor="middle">
					{NODES.map((n) => (
						<text key={n.id} x={n.x + n.w / 2} y={n.y + 24}>
							{n.label}
						</text>
					))}
				</g>
				<g className="diagram__dots">
					{PACKETS.map((p, i) => (
						<circle
							key={i}
							ref={(el) => {
								dots.current[i] = el;
							}}
							r="5"
							opacity="0"
							className={p.back ? "is-back" : ""}
						/>
					))}
				</g>
			</svg>
			<ol className="flow__steps">
				{steps.map((text, i) => (
					<li key={text} className={live && i === step ? "is-active" : ""}>
						<span>{i + 1}</span>
						{text}
					</li>
				))}
			</ol>
		</div>
	);
};

export default Diagram;
