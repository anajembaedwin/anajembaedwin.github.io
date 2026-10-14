import React, { useMemo } from "react";

const GLYPHS = ["</>", "{ }", "⚡", "☁️", "🚀", "✦", "$ _", "0x", "( )", "✨"];

// Decorative glyphs drifting behind the hero. Positions and timings are
// random on every page load.
const Floaters = () => {
	const items = useMemo(
		() =>
			[...GLYPHS]
				.sort(() => Math.random() - 0.5)
				.slice(0, 8)
				.map((glyph, i) => ({
					glyph,
					key: `${glyph}-${i}`,
					left: 50 + Math.random() * 47,
					top: 6 + Math.random() * 80,
					size: 0.9 + Math.random() * 1.1,
					dur: 7 + Math.random() * 8,
					delay: -Math.random() * 8,
					rot: Math.round(Math.random() * 50 - 25),
				})),
		[]
	);

	return (
		<div className="floaters" aria-hidden="true">
			{items.map((item) => (
				<span
					key={item.key}
					className="floater"
					style={{
						left: `${item.left}%`,
						top: `${item.top}%`,
						fontSize: `${item.size}rem`,
						"--dur": `${item.dur}s`,
						"--delay": `${item.delay}s`,
						"--rot": `${item.rot}deg`,
					}}
				>
					{item.glyph}
				</span>
			))}
		</div>
	);
};

export default Floaters;
