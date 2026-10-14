import React, { useEffect, useRef, useState } from "react";

import { useI18n } from "../i18n";
import { burst } from "./reactions";
import { SIDES, start } from "./tiny";

const read = () => {
	try {
		return window.localStorage.getItem("tiny");
	} catch (error) {
		return null;
	}
};

// Toggle chip, scoreboard and toasts for the tiny people. The simulation
// itself lives in tiny.js and draws on the canvas rendered here.
const TinyPeople = () => {
	const { ui } = useI18n();
	const T = ui.tiny;
	const tRef = useRef(T);
	tRef.current = T;
	const canvas = useRef(null);
	const [on, setOn] = useState(() => {
		const saved = read();
		if (saved) return saved === "1";
		return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	});
	const [stats, setStats] = useState({ counts: [0, 0, 0], kills: 0, war: false });
	const [toast, setToast] = useState(null);
	const timer = useRef(null);

	const show = (text) => {
		setToast(text);
		clearTimeout(timer.current);
		timer.current = setTimeout(() => setToast(null), 3200);
	};

	useEffect(() => {
		if (!on || !canvas.current) return undefined;
		const fill = (text, map) =>
			Object.keys(map).reduce((s, k) => s.split(`{${k}}`).join(map[k]), text);
		const stop = start(canvas.current, {
			stats: setStats,
			burst,
			lines: () => tRef.current.lines,
			event: (e) => {
				const t = tRef.current;
				const side = t.sides[e.side] || "";
				const role = e.role >= 0 ? t.roles[e.role] : "";
				if (e.type === "joined") show(fill(t.joined, { name: e.name, role }));
				else if (e.type === "war") show(fill(t.war, { a: t.sides[e.a], b: t.sides[e.b] }));
				else if (e.type === "fell") {
					if (e.name) show(fill(t.fellNamed, { name: e.name, role }));
					else if (e.how === "squash") show(fill(t.squashed, { side }));
					else if (e.how === "touch") show(fill(t.fell, { side }));
				}
			},
		});
		let seen = false;
		try {
			seen = window.sessionStorage.getItem("tiny-hint") === "1";
		} catch (error) {
			seen = false;
		}
		let hint = null;
		if (!seen) {
			hint = setTimeout(() => {
				show(tRef.current.hint);
				try {
					window.sessionStorage.setItem("tiny-hint", "1");
				} catch (error) {
					// ignore
				}
			}, 9000);
		}
		return () => {
			stop();
			clearTimeout(hint);
		};
	}, [on]);

	useEffect(() => () => clearTimeout(timer.current), []);

	const flip = () => {
		const next = !on;
		setOn(next);
		try {
			window.localStorage.setItem("tiny", next ? "1" : "0");
		} catch (error) {
			// ignore
		}
	};

	return (
		<React.Fragment>
			{on && <canvas className="tiny-canvas" ref={canvas} aria-hidden="true" />}
			<div className="tiny-hud">
				<button
					type="button"
					className="tiny-chip"
					aria-pressed={on}
					onClick={flip}
					title={T.label}
				>
					<span aria-hidden="true">🧍</span>
					<span className="tiny-chip__label">{T.label}</span>
					{on && (
						<span className="tiny-chip__stats" aria-label={T.scoreLabel}>
							{SIDES.map((side, i) => (
								<span key={side.id} className="tiny-chip__count">
									<i style={{ background: side.color }} />
									{stats.counts[i]}
								</span>
							))}
							<span className="tiny-chip__count" title={T.fallen}>
								🪦 {stats.kills}
							</span>
						</span>
					)}
				</button>
			</div>
			{toast && (
				<div className="tiny-toast" role="status">
					{toast}
				</div>
			)}
		</React.Fragment>
	);
};

export default TinyPeople;
