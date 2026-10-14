import React, { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useI18n } from "../i18n";

// Pip, a small guide who lives in the corner. Pip watches which part of the
// page you are on and offers a tip now and then, can walk you through the
// site, and can be dragged around or sent away. Tips are rate limited and
// stop if they keep getting ignored.

const store = {
	get: (k) => {
		try {
			return window.localStorage.getItem(k);
		} catch (error) {
			return null;
		}
	},
	set: (k, v) => {
		try {
			window.localStorage.setItem(k, v);
		} catch (error) {
			// ignore
		}
	},
};

const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const MAX_TIPS = 8;
const GAP_MS = 25000;

export const Pip = ({ mood, look, talking }) => (
	<svg
		className={`pip pip--${mood}${talking ? " is-talking" : ""}`}
		viewBox="0 0 110 140"
		aria-hidden="true"
	>
		<defs>
			<linearGradient id="pip-cloak" x1="0" y1="0" x2="1" y2="1">
				<stop offset="0" stopColor="#3fe0b5" />
				<stop offset="1" stopColor="#4d8cff" />
			</linearGradient>
		</defs>
		<ellipse cx="55" cy="130" rx="26" ry="5" fill="rgba(23,18,43,0.22)" />
		{/* boots */}
		<path d="M40 122 h12 v7 h-14 z M58 122 h12 v7 h-10 z" fill="#2b2350" stroke="#17122b" strokeWidth="2.4" strokeLinejoin="round" />
		{/* cloak */}
		<path
			d="M55 58 C36 58 28 82 24 122 Q40 128 55 122 Q70 128 86 122 C82 82 74 58 55 58 Z"
			fill="url(#pip-cloak)"
			stroke="#17122b"
			strokeWidth="3"
			strokeLinejoin="round"
		/>
		<path d="M55 84 V120" stroke="#17122b" strokeWidth="2" opacity=".25" />
		{/* waving arm */}
		<g className="pip__wave">
			<path d="M76 70 Q92 66 96 52" fill="none" stroke="#17122b" strokeWidth="9" strokeLinecap="round" />
			<path d="M76 70 Q92 66 96 52" fill="none" stroke="url(#pip-cloak)" strokeWidth="5" strokeLinecap="round" />
			<circle cx="96" cy="50" r="5" fill="#e0ac69" stroke="#17122b" strokeWidth="2" />
		</g>
		{/* lantern arm */}
		<g className="pip__lantern">
			<path d="M34 72 Q22 80 20 94" fill="none" stroke="#17122b" strokeWidth="9" strokeLinecap="round" />
			<path d="M34 72 Q22 80 20 94" fill="none" stroke="url(#pip-cloak)" strokeWidth="5" strokeLinecap="round" />
			<circle cx="20" cy="96" r="5" fill="#e0ac69" stroke="#17122b" strokeWidth="2" />
			<path d="M20 98 v6" stroke="#17122b" strokeWidth="2" />
			<rect x="11" y="104" width="18" height="18" rx="4" fill="#ffd27a" stroke="#17122b" strokeWidth="2.4" />
			<rect className="pip__glow" x="14" y="107" width="12" height="12" rx="3" fill="#fff6c9" />
			<path d="M13 104 h14" stroke="#17122b" strokeWidth="3" strokeLinecap="round" />
		</g>
		{/* hood and head */}
		<path d="M55 12 C30 12 26 40 30 56 C40 64 70 64 80 56 C84 40 80 12 55 12 Z" fill="url(#pip-cloak)" stroke="#17122b" strokeWidth="3" strokeLinejoin="round" />
		<ellipse cx="55" cy="42" rx="19" ry="18" fill="#e0ac69" stroke="#17122b" strokeWidth="2.6" />
		<path d="M55 6 l3 7 h-6 z" fill="#ffd27a" stroke="#17122b" strokeWidth="2" strokeLinejoin="round" />
		{/* eyes */}
		<g className="pip__eyes">
			<circle cx="47" cy="42" r="5.6" fill="#fff" stroke="#17122b" strokeWidth="1.8" />
			<circle cx="63" cy="42" r="5.6" fill="#fff" stroke="#17122b" strokeWidth="1.8" />
			<g style={{ transform: `translate(${look.x}px, ${look.y}px)` }} className="pip__pupils">
				<circle cx="47" cy="42" r="2.6" fill="#17122b" />
				<circle cx="63" cy="42" r="2.6" fill="#17122b" />
			</g>
			<g className="pip__lids">
				<path d="M41 42 h12 M57 42 h12" stroke="#17122b" strokeWidth="2.4" strokeLinecap="round" />
			</g>
		</g>
		<circle cx="40" cy="50" r="3" fill="#ff5c7a" opacity=".55" />
		<circle cx="70" cy="50" r="3" fill="#ff5c7a" opacity=".55" />
		<g className="pip__mouth">
			<path d="M50 52 Q55 57 60 52 Q55 55 50 52 Z" fill="#7a2f3a" stroke="#17122b" strokeWidth="1.8" strokeLinejoin="round" />
		</g>
		{mood === "sleep" && (
			<text className="pip__zzz" x="76" y="20" fontSize="16" fontWeight="700" fill="#4a30d4">
				z
			</text>
		)}
	</svg>
);

const Guide = () => {
	const { ui } = useI18n();
	const G = ui.guide;
	const { pathname } = useLocation();
	const navigate = useNavigate();

	const [on, setOn] = useState(() => store.get("guide") !== "off");
	const [bubble, setBubble] = useState(null); // { text, actions[] , key }
	const [mood, setMood] = useState("idle");
	const [look, setLook] = useState({ x: 0, y: 0 });
	const [pos, setPos] = useState({ x: 0, y: 0 });
	const [side, setSide] = useState("left"); // which way the bubble opens
	const [busy, setBusy] = useState(false); // someone is in the matrix/battle
	const rootRef = useRef(null);
	const state = useRef({
		tips: 0,
		last: 0,
		ignored: 0,
		fired: new Set(),
		tipsOn: store.get("guide-tips") !== "0",
		hideTimer: null,
		tour: -1,
		lastMove: Date.now(),
		drag: null,
	});

	const quiet = pathname.endsWith("/play");

	// ---------- speaking ----------
	const canSpeak = useCallback(() => {
		const s = state.current;
		if (!on || quiet || document.hidden) return false;
		if (document.querySelector(".matrix-stage, .battle")) return false;
		if (document.body.classList.contains("is-dragging")) return false;
		const tag = document.activeElement && document.activeElement.tagName;
		if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return false;
		return s.tipsOn && s.tips < MAX_TIPS && Date.now() - s.last > GAP_MS;
	}, [on, quiet]);

	const hide = useCallback((ignored) => {
		clearTimeout(state.current.hideTimer);
		setBubble((b) => {
			if (b && ignored && b.tip) {
				state.current.ignored += 1;
				if (state.current.ignored >= 3) state.current.tipsOn = false;
			}
			return null;
		});
		setMood((m) => (m === "talk" ? "idle" : m));
	}, []);

	const show = useCallback(
		(b, ms = 14000) => {
			clearTimeout(state.current.hideTimer);
			setBubble(b);
			setMood("talk");
			state.current.hideTimer = setTimeout(() => hide(true), ms);
		},
		[hide]
	);

	const tip = useCallback(
		(key, actions = []) => {
			const s = state.current;
			if (s.fired.has(key) || store.get("guide-seen") !== "1" || !canSpeak() || !G.tips[key]) return;
			s.fired.add(key);
			s.tips += 1;
			s.last = Date.now();
			show(
				{
					key,
					tip: true,
					text: G.tips[key],
					actions: [...actions, { label: G.notNow, fn: () => hide(false) }],
				},
				13000
			);
		},
		[G, canSpeak, show, hide]
	);

	const goTo = useCallback(
		(id) => {
			const run = () => {
				const el = document.getElementById(id);
				if (el) el.scrollIntoView({ behavior: reduced() ? "auto" : "smooth", block: "start" });
			};
			if (window.location.pathname === "/" || pathname === "/") run();
			else {
				navigate("/");
				setTimeout(run, 450);
			}
		},
		[navigate, pathname]
	);

	// ---------- tour ----------
	const tourStep = useCallback(
		(i) => {
			const steps = G.tour;
			state.current.tour = i;
			if (i >= steps.length) {
				state.current.tour = -1;
				show({ text: G.tourDone, actions: [{ label: G.thanks, fn: () => hide(false) }] }, 7000);
				return;
			}
			goTo(steps[i].id);
			show(
				{
					text: steps[i].text,
					actions: [
						{ label: i === steps.length - 1 ? G.finish : G.next, fn: () => tourStep(i + 1) },
						{ label: G.stop, fn: () => hide(false) },
					],
				},
				30000
			);
		},
		[G, goTo, show, hide]
	);

	const menu = () =>
		show(
			{
				text: G.menu.title,
				actions: [
					{ label: G.menu.tour, fn: () => tourStep(0) },
					{ label: G.menu.work, fn: () => { hide(false); goTo("work"); } },
					{ label: G.menu.contact, fn: () => { hide(false); navigate("/contact"); } },
					{ label: G.menu.game, fn: () => { hide(false); navigate("/games/tiny-wars/play"); } },
					{
						label: state.current.tipsOn ? G.tipsOff : G.tipsOn,
						fn: () => {
							state.current.tipsOn = !state.current.tipsOn;
							store.set("guide-tips", state.current.tipsOn ? "1" : "0");
							state.current.ignored = 0;
							hide(false);
						},
					},
					{ label: G.hide, fn: () => setAway() },
				],
			},
			30000
		);

	const setAway = () => {
		hide(false);
		setOn(false);
		store.set("guide", "off");
	};

	const bringBack = useCallback(() => {
		setOn(true);
		store.set("guide", "on");
		setTimeout(() => show({ text: G.back, actions: [] }, 3500), 300);
	}, [G, show]);

	// terminal command: guide on | off
	useEffect(() => {
		const onSet = (e) => {
			if (e.detail === "off") setAway();
			else bringBack();
		};
		window.addEventListener("guide:set", onSet);
		return () => window.removeEventListener("guide:set", onSet);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [bringBack]);

	// ---------- when to speak ----------
	// first visit: say hello
	useEffect(() => {
		if (!on || store.get("guide-seen") === "1") return undefined;
		const t = setTimeout(() => {
			if (!canSpeak()) return;
			store.set("guide-seen", "1");
			state.current.last = Date.now();
			show(
				{
					text: G.intro,
					actions: [
						{ label: G.menu.tour, fn: () => tourStep(0) },
						{ label: G.no, fn: () => hide(false) },
					],
				},
				16000
			);
		}, 7000);
		return () => clearTimeout(t);
	}, [on, G, canSpeak, show, hide, tourStep]);

	// page-level tips, a few seconds after arriving
	useEffect(() => {
		if (!on) return undefined;
		const map = {
			"/products": ["products", []],
			"/projects": ["projects", []],
			"/games": ["games", [{ label: G.play, fn: () => navigate("/games/tiny-wars/play") }]],
			"/games/tiny-wars": ["village", []],
		};
		const entry = map[pathname.replace(/\/$/, "")];
		if (!entry) return undefined;
		const t = setTimeout(() => tip(entry[0], entry[1]), 4500);
		return () => clearTimeout(t);
	}, [pathname, on, G, tip, navigate]);

	// sections of the home page, once you've stayed on one a while
	useEffect(() => {
		if (!on || pathname !== "/") return undefined;
		const timers = {};
		const actions = {
			services: [{ label: G.go, fn: () => { hide(false); goTo("contact"); } }],
			about: [],
			contact: [],
			work: [],
		};
		const io = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					const id = entry.target.id;
					if (entry.isIntersecting && entry.intersectionRatio > 0.45) {
						timers[id] = setTimeout(() => tip(id, actions[id] || []), 4500);
					} else {
						clearTimeout(timers[id]);
					}
				});
			},
			{ threshold: [0, 0.45, 0.8] }
		);
		["services", "work", "about", "contact"].forEach((id) => {
			const el = document.getElementById(id);
			if (el) io.observe(el);
		});
		const term = document.querySelector(".term");
		let termTimer = null;
		const tio = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) termTimer = setTimeout(() => tip("terminal"), 6000);
				else clearTimeout(termTimer);
			});
		}, { threshold: 0.6 });
		if (term) tio.observe(term);
		return () => {
			io.disconnect();
			tio.disconnect();
			Object.values(timers).forEach(clearTimeout);
			clearTimeout(termTimer);
		};
	}, [on, pathname, G, tip, goTo, hide]);

	// the contact form
	useEffect(() => {
		if (!on) return undefined;
		let t = null;
		const onFocus = (e) => {
			if (e.target.closest && e.target.closest("form") && e.target.closest(".contact__card")) {
				clearTimeout(t);
				state.current.last = 0;
				t = setTimeout(() => {
					const s = state.current;
					if (s.fired.has("form") || !G.tips.form || !s.tipsOn) return;
					s.fired.add("form");
					s.tips += 1;
					s.last = Date.now();
					setMood("talk");
					show({ tip: true, text: G.tips.form, actions: [{ label: G.thanks, fn: () => hide(false) }] }, 9000);
				}, 1200);
			}
		};
		document.addEventListener("focusin", onFocus);
		return () => {
			document.removeEventListener("focusin", onFocus);
			clearTimeout(t);
		};
	}, [on, G, show, hide]);

	// ---------- life: eyes, idle moves, sleep ----------
	useEffect(() => {
		if (!on) return undefined;
		let frame = null;
		const onMove = (e) => {
			state.current.lastMove = Date.now();
			setMood((m) => (m === "sleep" ? "idle" : m));
			if (reduced() || frame || !rootRef.current) return;
			frame = requestAnimationFrame(() => {
				frame = null;
				if (!rootRef.current) return;
				const r = rootRef.current.getBoundingClientRect();
				const vx = e.clientX - (r.left + r.width / 2);
				const vy = e.clientY - (r.top + r.height * 0.3);
				const d = Math.hypot(vx, vy) || 1;
				const k = Math.min(1, d / 240);
				setLook({ x: (vx / d) * 2.4 * k, y: (vy / d) * 1.8 * k });
			});
		};
		const wake = () => {
			state.current.lastMove = Date.now();
			setMood((m) => (m === "sleep" ? "idle" : m));
		};
		window.addEventListener("pointermove", onMove, { passive: true });
		window.addEventListener("keydown", wake);
		window.addEventListener("scroll", wake, { passive: true });

		const idle = setInterval(() => {
			const s = state.current;
			if (Date.now() - s.lastMove > 70000) {
				setMood((m) => (m === "idle" ? "sleep" : m));
				return;
			}
			if (reduced()) return;
			setMood((m) => {
				if (m !== "idle") return m;
				return ["wave", "lantern", "look", "wave"][Math.floor(Math.random() * 4)];
			});
			setTimeout(() => setMood((m) => (["wave", "lantern", "look"].includes(m) ? "idle" : m)), 1700);
		}, 9000);
		return () => {
			window.removeEventListener("pointermove", onMove);
			window.removeEventListener("keydown", wake);
			window.removeEventListener("scroll", wake);
			clearInterval(idle);
			if (frame) cancelAnimationFrame(frame);
		};
	}, [on]);

	// step aside when the Matrix or a battle takes over
	useEffect(() => {
		const check = setInterval(() => {
			setBusy(!!document.querySelector(".matrix-stage, .battle"));
		}, 700);
		return () => clearInterval(check);
	}, []);

	// ---------- dragging ----------
	const onDown = (e) => {
		if (e.button > 0) return;
		const s = state.current;
		s.drag = { x: e.clientX, y: e.clientY, bx: pos.x, by: pos.y, moved: false, id: e.pointerId };
		try {
			e.currentTarget.setPointerCapture(e.pointerId);
		} catch (error) {
			// ignore
		}
	};
	const onMoveDrag = (e) => {
		const d = state.current.drag;
		if (!d || d.id !== e.pointerId) return;
		const dx = e.clientX - d.x;
		const dy = e.clientY - d.y;
		if (!d.moved && Math.hypot(dx, dy) < 5) return;
		d.moved = true;
		setPos({ x: d.bx + dx, y: d.by + dy });
		setMood("drag");
	};
	const onUp = (e) => {
		const d = state.current.drag;
		state.current.drag = null;
		if (!d) return;
		if (!d.moved) {
			if (bubble) hide(false);
			else menu();
			return;
		}
		// keep Pip fully on screen, and open the bubble toward the middle
		const r = rootRef.current.getBoundingClientRect();
		let { x, y } = pos;
		if (r.left < 4) x += 4 - r.left;
		if (r.right > window.innerWidth - 4) x -= r.right - (window.innerWidth - 4);
		if (r.top < 70) y += 70 - r.top;
		if (r.bottom > window.innerHeight - 4) y -= r.bottom - (window.innerHeight - 4);
		setPos({ x, y });
		setSide(r.left + r.width / 2 < window.innerWidth / 2 ? "right" : "left");
		setMood("idle");
	};
	const onKeyDown = (e) => {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			if (bubble) hide(false);
			else menu();
		} else if (e.key === "Escape") hide(false);
	};

	if (quiet || busy) return null;

	if (!on) {
		return (
			<button type="button" className="pip-return" data-guide onClick={bringBack} title={G.show} aria-label={G.show}>
				<span aria-hidden="true">💡</span>
			</button>
		);
	}

	return (
		<div
			ref={rootRef}
			className={`pip-wrap pip-wrap--${side}`}
			data-guide
			style={{ translate: `${pos.x}px ${pos.y}px` }}
		>
			{bubble && (
				<div className="pip-bubble" role="status" aria-live="polite">
					<button type="button" className="pip-bubble__close" onClick={() => hide(false)} aria-label={G.close}>
						×
					</button>
					<p>{bubble.text}</p>
					{bubble.actions.length > 0 && (
						<div className="pip-bubble__actions">
							{bubble.actions.map((a) => (
								<button type="button" key={a.label} onClick={a.fn}>
									{a.label}
								</button>
							))}
						</div>
					)}
				</div>
			)}
			<button
				type="button"
				className="pip-body"
				aria-label={G.open}
				onPointerDown={onDown}
				onPointerMove={onMoveDrag}
				onPointerUp={onUp}
				onPointerCancel={() => {
					state.current.drag = null;
				}}
				onKeyDown={onKeyDown}
			>
				<Pip mood={mood} look={look} talking={!!bubble} />
			</button>
		</div>
	);
};

export default Guide;
