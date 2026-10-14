import React, { useEffect, useRef, useState } from "react";

import { Link } from "react-router-dom";
import { useI18n } from "../i18n";
import { burst } from "./reactions";
import Avatar from "./Avatar";

const norm = (text) =>
	text
		.toLowerCase()
		.normalize("NFD")
		.replace(/[̀-ͯ]/g, "");

const reduced = () =>
	window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// The portrait plus a small "ask me" panel. Pick a question (or type one)
// and Edwin answers while his mouth moves. Answers are written, not generated.
const AboutSide = () => {
	const { ui } = useI18n();
	const ask = ui.ask;
	const [answer, setAnswer] = useState(null); // { text, shown, cta, emoji }
	const [talking, setTalking] = useState(false);
	const [value, setValue] = useState("");
	const timer = useRef(null);
	const panel = useRef(null);
	const nextItem = useRef(0);

	useEffect(() => () => clearInterval(timer.current), []);

	// If the language changes mid-answer, start clean.
	useEffect(() => {
		clearInterval(timer.current);
		setAnswer(null);
		setTalking(false);
	}, [ask]);

	const say = (item, fallback) => {
		clearInterval(timer.current);
		const text = fallback ? ask.fallback : item.a;
		const cta = fallback ? true : !!item.cta;
		const emoji = fallback ? "🤔" : item.emoji;
		if (reduced()) {
			setAnswer({ text, shown: text.length, cta, emoji });
			setTalking(false);
			return;
		}
		let n = 0;
		setAnswer({ text, shown: 0, cta, emoji });
		setTalking(true);
		timer.current = setInterval(() => {
			n += 2;
			if (n >= text.length) {
				clearInterval(timer.current);
				setTalking(false);
				n = text.length;
			}
			setAnswer({ text, shown: n, cta, emoji });
		}, 22);
		if (panel.current) {
			const box = panel.current.getBoundingClientRect();
			burst(box.left + box.width / 2, box.top + 8, [emoji, "✨"], 5);
		}
	};

	const submit = (event) => {
		event.preventDefault();
		const q = norm(value).trim();
		if (!q) return;
		let best = null;
		let score = 0;
		ask.items.forEach((item) => {
			const s = item.keys.reduce((sum, key) => sum + (q.includes(norm(key)) ? 1 : 0), 0);
			if (s > score) {
				score = s;
				best = item;
			}
		});
		say(best, !best);
		setValue("");
	};

	return (
		<div className="about__side">
			<Avatar
				talking={talking}
				onAsk={() => {
					const item = ask.items[nextItem.current % ask.items.length];
					nextItem.current += 1;
					say(item, false);
				}}
			/>
			<div className="ask" ref={panel}>
				<h3 className="ask__title">{ask.title}</h3>
				<div className="ask__chips">
					{ask.items.map((item) => (
						<button
							type="button"
							key={item.q}
							className="ask__chip"
							onClick={() => say(item, false)}
						>
							{item.q}
						</button>
					))}
				</div>
				<div className="ask__answer" role="status" aria-live="polite">
					{answer ? (
						<React.Fragment>
							<span className="ask__emoji" aria-hidden="true">
								{answer.emoji}
							</span>
							<span>{answer.text.slice(0, answer.shown)}</span>
							{answer.cta && answer.shown >= answer.text.length && (
								<Link className="ask__cta" to="/#contact">
									{ask.cta}
								</Link>
							)}
						</React.Fragment>
					) : (
						<span className="ask__idle">{ask.idle}</span>
					)}
				</div>
				<form className="ask__form" onSubmit={submit}>
					<input
						type="text"
						value={value}
						onChange={(event) => setValue(event.target.value)}
						placeholder={ask.placeholder}
						aria-label={ask.placeholder}
						maxLength={80}
					/>
					<button type="submit">{ask.send}</button>
				</form>
			</div>
		</div>
	);
};

export default AboutSide;
