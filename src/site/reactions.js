// Little cartoon emoji pops. Any element with data-react="🚀,🔥" bursts
// them when clicked. Skipped for visitors who prefer reduced motion.

const DEFAULT = ["✨", "🚀", "🔥", "💜", "⚡"];

const reduced = () =>
	window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let layer = null;

const getLayer = () => {
	if (layer && document.body.contains(layer)) return layer;
	layer = document.createElement("div");
	layer.className = "burst-layer";
	layer.setAttribute("aria-hidden", "true");
	document.body.appendChild(layer);
	return layer;
};

export const burst = (x, y, emojis, count = 7) => {
	if (reduced()) return;
	const list = emojis && emojis.length ? emojis : DEFAULT;
	const host = getLayer();
	for (let i = 0; i < count; i += 1) {
		const el = document.createElement("span");
		el.className = "burst";
		el.textContent = list[Math.floor(Math.random() * list.length)];
		el.style.left = `${x}px`;
		el.style.top = `${y}px`;
		el.style.setProperty("--dx", `${Math.round(Math.random() * 150 - 75)}px`);
		el.style.setProperty("--rot", `${Math.round(Math.random() * 80 - 40)}deg`);
		el.style.animationDelay = `${Math.round(Math.random() * 120)}ms`;
		el.addEventListener("animationend", () => el.remove());
		host.appendChild(el);
	}
};

export const installReactions = () => {
	const onClick = (event) => {
		const target = event.target.closest && event.target.closest("[data-react]");
		if (!target) return;
		let { clientX: x, clientY: y } = event;
		if (!x && !y) {
			const box = target.getBoundingClientRect();
			x = box.left + box.width / 2;
			y = box.top + box.height / 2;
		}
		const raw = target.getAttribute("data-react");
		burst(x, y, raw ? raw.split(",") : null);
	};
	document.addEventListener("click", onClick);
	return () => document.removeEventListener("click", onClick);
};
