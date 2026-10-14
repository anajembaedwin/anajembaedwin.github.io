import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";

import INFO from "../data/user";
import { useI18n, LANGS } from "../i18n";
import MatrixRain from "./MatrixRain";

// The hero panel is a small working terminal. It starts by printing the
// "GET /edwin" response, then accepts commands. Everything is a written
// answer from the site's own data; nothing is sent anywhere.

const FILES = ["about.md", "skills.md", "experience.md", "products.md", "contact.md"];
const HIDDEN = ".matrix";
const RAIN = {
	green: "#1aff6a",
	red: "#ff3b4e",
	blue: "#4da3ff",
	violet: "#b28cff",
	amber: "#ffb84d",
};
// anything that wakes the Matrix
const CHEATS = /^(matrix|neo|red pill|wake up,? neo\.*|follow the white rabbit\.?|the matrix has you\.?)$/;
const COMMANDS = [
	"help",
	"whoami",
	"about",
	"skills",
	"experience",
	"products",
	"projects",
	"contact",
	"links",
	"ls",
	"cat",
	"open",
	"lang",
	"curl",
	"guide",
	"clear",
];
const SECTIONS = {
	services: "services",
	work: "work",
	about: "about",
	contact: "contact",
};

const line = (t, extra = {}) => ({ t, ...extra });

const ResponsePanel = ({ lines }) => {
	const { ui, site, products, setLang } = useI18n();
	const T = ui.term;
	const navigate = useNavigate();
	const rows = site.response || lines;

	const [log, setLog] = useState([]); // { cmd, out: [{t, href?, to?}] }
	const [value, setValue] = useState("");
	const [cursor, setCursor] = useState(-1);
	const history = useRef([]);
	const box = useRef(null);
	const input = useRef(null);
	const rootRef = useRef(null);
	const [matrix, setMatrix] = useState("off"); // off | waking | on
	const [rain, setRain] = useState("green");
	const [holdHeight, setHoldHeight] = useState(0);
	const wakeTimer = useRef(null);

	const json = useMemo(
		() => [
			line("{"),
			...rows.map(([k, v], i) =>
				line(`  "${k}": "${v}"${i < rows.length - 1 ? "," : ""}`)
			),
			line("}"),
		],
		[rows]
	);

	// Keep the newest output in view, inside the panel only.
	useEffect(() => {
		if (box.current) box.current.scrollTop = box.current.scrollHeight;
	}, [log]);

	// A language switch changes the wording; start the session fresh.
	useEffect(() => setLog([]), [ui]);

	const about = () => site.about.text.map((p) => line(p));
	const skills = () =>
		site.about.skills.map((s) => line(`${s.group}: ${s.items.join(", ")}`));
	const experience = () =>
		site.work.items.map((w) => line(`${w.name}: ${w.tag}`));
	const productList = () =>
		products.length
			? products.map((p) =>
					line(`${p.name} [${ui.status[p.status] || p.status}]: ${p.pitch}`, {
						to: `/products/${p.slug}`,
					})
			  )
			: [line(T.none)];
	const contact = () => [
		line(INFO.main.email, { href: `mailto:${INFO.main.email}` }),
		line(T.form, { to: "/contact" }),
	];
	const links = () => [
		line("github    " + INFO.socials.github, { href: INFO.socials.github }),
		line("linkedin  " + INFO.socials.linkedin, { href: INFO.socials.linkedin }),
		line("email     " + INFO.main.email, { href: `mailto:${INFO.main.email}` }),
	];

	const wake = () => {
		setHoldHeight(rootRef.current ? rootRef.current.offsetHeight : 0);
		setMatrix("waking");
		clearTimeout(wakeTimer.current);
		wakeTimer.current = setTimeout(() => {
			setMatrix("on");
			setLog((prev) => [...prev, { cmd: null, out: [line(T.matrix.inside)] }]);
		}, 2400);
	};

	const sleep = () => {
		clearTimeout(wakeTimer.current);
		setMatrix("off");
	};

	const run = (raw) => {
		const text = raw.trim();
		if (!text) return [];
		const [name, ...args] = text.split(/\s+/);
		const cmd = name.toLowerCase();
		const arg = args.join(" ").toLowerCase();

		if (CHEATS.test(text.toLowerCase())) {
			if (matrix !== "off") return [line(T.matrix.already)];
			wake();
			return [line(T.matrix.wake), line(T.matrix.follow), line(T.matrix.rabbit)];
		}
		if (matrix === "on" && (text.toLowerCase() === "blue pill" || cmd === "exit" || cmd === "quit")) {
			sleep();
			return [line(T.matrix.out)];
		}
		if (cmd === "blue" && arg === "pill") return [line(T.matrix.out)];
		if (cmd === "theme" && matrix === "on") {
			if (RAIN[arg]) {
				setRain(arg);
				return [line(T.matrix.themeSet.replace("{c}", arg))];
			}
			return [line(T.matrix.themeUsage.replace("{c}", Object.keys(RAIN).join(", ")))];
		}

		switch (cmd) {
			case "help":
				return [
					line(T.helpTitle),
					...Object.entries(T.cmds).map(([k, d]) =>
						line(`  ${k.padEnd(11)}${d}`)
					),
				];
			case "whoami":
				return [
					line(`${site.name}, ${site.role} @ ${site.company}`),
					...rows.slice(2).map(([k, v]) => line(`${k}: ${v}`)),
				];
			case "about":
				return about();
			case "skills":
			case "stack":
				return skills();
			case "experience":
			case "work":
				return experience();
			case "products":
				return productList();
			case "projects":
				return [line(T.projects, { to: "/projects" })];
			case "contact":
			case "email":
			case "hire":
				return contact();
			case "links":
			case "github":
			case "linkedin":
				return links();
			case "ls":
				return [line((args.includes("-a") || args.includes("-la") ? [".", "..", HIDDEN, ...FILES] : FILES).join("  "))];
			case "cat": {
				if (!arg) return [line(T.catUsage)];
				if (arg === HIDDEN) return [line(T.matrix.hint)];
				const f = arg.replace(/\.md$/, "");
				if (f === "about") return about();
				if (f === "skills") return skills();
				if (f === "experience") return experience();
				if (f === "products") return productList();
				if (f === "contact") return contact();
				return [line(T.noFile.replace("{f}", args.join(" ")))];
			}
			case "open": {
				if (!arg) return [line(T.openUsage)];
				if (arg === "products" || arg === "projects" || arg === "contact" || arg === "about") {
					if (arg === "contact" && document.getElementById("contact")) {
						document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
					} else {
						navigate(`/${arg}`);
					}
					return [line(T.opening.replace("{x}", arg))];
				}
				if (SECTIONS[arg] && arg !== "about") {
					const el = document.getElementById(SECTIONS[arg]);
					if (el) el.scrollIntoView({ behavior: "smooth" });
					return [line(T.opening.replace("{x}", arg))];
				}
				return [line(T.openUsage)];
			}
			case "lang": {
				const hit = LANGS.find(
					(l) => l.code === arg || l.label.toLowerCase() === arg
				);
				if (!hit) {
					return [line(T.langUsage.replace("{l}", LANGS.map((l) => l.code).join(", ")))];
				}
				setTimeout(() => setLang(hit.code), 0);
				return [line(T.langSet.replace("{l}", hit.name))];
			}
			case "curl":
				return json;
			case "guide": {
				const want = arg === "off" ? "off" : "on";
				window.dispatchEvent(new CustomEvent("guide:set", { detail: want }));
				return [line(want === "off" ? T.guideOff : T.guideOn)];
			}
			case "date":
				return [line(new Date().toString())];
			case "echo":
				return [line(text.slice(5))];
			case "pwd":
				return [line("/home/edwin")];
			case "sudo":
				return [line(T.sudo)];
			case "rm":
				return [line(T.rm)];
			case "exit":
			case "quit":
				return [line(T.exit, { to: "/contact" })];
			default:
				return [line(T.notFound.replace("{cmd}", name))];
		}
	};

	const submit = (event) => {
		event.preventDefault();
		const raw = value;
		setValue("");
		setCursor(-1);
		if (!raw.trim()) return;
		history.current.unshift(raw);
		if (raw.trim().toLowerCase() === "clear") {
			setLog([]);
			return;
		}
		setLog((prev) => [...prev.slice(-40), { cmd: raw, out: run(raw) }]);
	};

	const onKeyDown = (event) => {
		const h = history.current;
		if (event.key === "ArrowUp") {
			event.preventDefault();
			const next = Math.min(cursor + 1, h.length - 1);
			if (next >= 0 && h[next] !== undefined) {
				setCursor(next);
				setValue(h[next]);
			}
		} else if (event.key === "ArrowDown") {
			event.preventDefault();
			const next = cursor - 1;
			setCursor(next);
			setValue(next >= 0 ? h[next] : "");
		} else if (event.key === "Tab") {
			event.preventDefault();
			const parts = value.split(/\s+/);
			if (parts.length === 1 && parts[0]) {
				const hit = COMMANDS.find((c) => c.startsWith(parts[0].toLowerCase()));
				if (hit) setValue(hit + " ");
			} else if (parts[0] === "cat" && parts[1] !== undefined) {
				const hit = FILES.find((f) => f.startsWith(parts[1].toLowerCase()));
				if (hit) setValue(`cat ${hit}`);
			}
		} else if (event.key === "l" && event.ctrlKey) {
			event.preventDefault();
			setLog([]);
		}
	};

	const render = (l, i) => {
		if (l.href) {
			return (
				<a key={i} className="term__out term__link" href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
					{l.t}
				</a>
			);
		}
		if (l.to) {
			return (
				<a
					key={i}
					className="term__out term__link"
					href={l.to}
					onClick={(event) => {
						event.preventDefault();
						navigate(l.to);
					}}
				>
					{l.t}
				</a>
			);
		}
		return (
			<div key={i} className="term__out">
				{l.t}
			</div>
		);
	};

	const termEl = (
		<div
			ref={rootRef}
			className={`term${matrix === "waking" ? " term--waking" : ""}${matrix === "on" ? " term--matrix" : ""}`}
			style={matrix === "on" ? { "--mx": RAIN[rain] } : undefined}
			role="group"
			aria-label={ui.respLabel}
			onClick={(event) => {
				if (window.getSelection().toString()) return;
				if (!event.target.closest("a")) {
					input.current && input.current.focus({ preventScroll: true });
				}
			}}
		>
			<div className="term__bar" aria-hidden="true">
				<span className="term__dots">
					<i />
					<i />
					<i />
				</span>
				<span className="term__title">{T.title}</span>
			</div>
			<div className="term__body" ref={box} role="log" aria-live="polite">
				<div className="term__line term__line--cmd" style={{ "--i": 0 }}>
					<span className="term__prompt">$</span> curl /edwin
				</div>
				<div className="term__line" style={{ "--i": 1 }}>
					<span className="resp__dot" aria-hidden="true" />
					200 OK
				</div>
				{json.map((l, i) => (
					<div className="term__line term__out" style={{ "--i": i + 2 }} key={i}>
						{l.t}
					</div>
				))}
				<div className="term__line term__hint" style={{ "--i": json.length + 2 }}>
					{T.hint}
				</div>
				{log.map((entry, i) => (
					<div className="term__entry" key={i}>
						{entry.cmd !== null && (
							<div className="term__line--cmd">
								<span className="term__prompt">$</span> {entry.cmd}
							</div>
						)}
						{entry.out.map(render)}
					</div>
				))}
				<form className="term__form" onSubmit={submit}>
					<label className="sr-only" htmlFor="term-input">
						{T.label}
					</label>
					<span className="term__prompt" aria-hidden="true">
						$
					</span>
					<input
						id="term-input"
						ref={input}
						type="text"
						value={value}
						onChange={(event) => setValue(event.target.value)}
						onKeyDown={onKeyDown}
						placeholder={T.placeholder}
						autoComplete="off"
						autoCapitalize="off"
						autoCorrect="off"
						spellCheck={false}
						maxLength={80}
						enterKeyHint="send"
					/>
				</form>
			</div>
		</div>
	);

	// Inside the Matrix the terminal moves to the middle of a full-screen
	// layer, so the whole page is the backdrop. It lives in a portal so the
	// hero's clipping can't touch it.
	useEffect(() => {
		if (matrix !== "on") return undefined;
		const prev = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		const onKey = (event) => {
			if (event.key === "Escape") {
				setMatrix("off");
				setLog((l) => [...l, { cmd: null, out: [line(T.matrix.out)] }]);
			}
		};
		window.addEventListener("keydown", onKey);
		const focus = setTimeout(() => input.current && input.current.focus({ preventScroll: true }), 60);
		return () => {
			document.body.style.overflow = prev;
			window.removeEventListener("keydown", onKey);
			clearTimeout(focus);
		};
	}, [matrix, T]);

	useEffect(() => {
		if (box.current) box.current.scrollTop = box.current.scrollHeight;
	}, [matrix]);

	useEffect(() => () => clearTimeout(wakeTimer.current), []);

	if (matrix === "on") {
		return (
			<React.Fragment>
				<div className="term-hold" style={{ minHeight: holdHeight }} />
				{createPortal(
					<div className="matrix-stage" style={{ "--mx": RAIN[rain] }}>
						<MatrixRain color={RAIN[rain]} />
						{termEl}
						<button
							type="button"
							className="matrix-exit"
							onClick={() => {
								sleep();
								setLog((l) => [...l, { cmd: null, out: [line(T.matrix.out)] }]);
							}}
						>
							{T.matrix.exitLabel}
						</button>
					</div>,
					document.body
				)}
			</React.Fragment>
		);
	}
	return termEl;
};

export default ResponsePanel;
