import React, { useState } from "react";

import { useI18n } from "../i18n";

const REACTIONS = ["👏", "🔥", "🚀"];

const Card = ({ item }) => {
	const { ui } = useI18n();
	const [counts, setCounts] = useState({});
	const add = (emoji) =>
		setCounts((prev) => ({ ...prev, [emoji]: (prev[emoji] || 0) + 1 }));

	return (
		<figure className="testi">
			<blockquote>
				<p>{item.quote}</p>
			</blockquote>
			<figcaption>
				<strong>{item.name}</strong>
				<span>{item.role}</span>
			</figcaption>
			<div className="testi__react" role="group" aria-label={ui.reactTo}>
				{REACTIONS.map((emoji) => (
					<button
						type="button"
						key={emoji}
						data-react={emoji}
						onClick={() => add(emoji)}
					>
						<span aria-hidden="true">{emoji}</span>
						{counts[emoji] ? <span>{counts[emoji]}</span> : null}
						<span className="sr-only">
							{ui.react} {emoji}
						</span>
					</button>
				))}
			</div>
		</figure>
	);
};

const Testimonials = ({ items }) => {
	const { ui } = useI18n();
	if (!items || !items.length) return null;
	return (
		<section className="section section--wash" id="kind-words">
			<div className="wrap" data-reveal>
				<h2 className="section-title">{ui.kindWords}</h2>
				<div className="testi-grid">
					{items.map((item) => (
						<Card item={item} key={item.name} />
					))}
				</div>
			</div>
		</section>
	);
};

export default Testimonials;
