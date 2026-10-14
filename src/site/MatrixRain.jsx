import React, { useEffect, useRef } from "react";

// Falling green code. Draws on its own canvas and cleans up after itself.
const GLYPHS =
	"ｦｱｳｴｵｶｷｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜ0123456789:.=*+-<>¦|".split("");

const MatrixRain = ({ color = "#1aff6a" }) => {
	const ref = useRef(null);

	useEffect(() => {
		const canvas = ref.current;
		const ctx = canvas.getContext("2d");
		const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		const size = window.innerWidth < 600 ? 14 : 17;
		let dpr = 1;
		let w = 0;
		let h = 0;
		let drops = [];
		let raf = null;
		let last = 0;

		const resize = () => {
			dpr = Math.min(1.5, window.devicePixelRatio || 1);
			w = window.innerWidth;
			h = window.innerHeight;
			canvas.width = Math.round(w * dpr);
			canvas.height = Math.round(h * dpr);
			const cols = Math.ceil(w / size);
			drops = Array.from({ length: cols }, (_, i) => drops[i] ?? -Math.random() * (h / size));
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
			ctx.fillStyle = "#000";
			ctx.fillRect(0, 0, w, h);
		};

		const tick = () => {
			ctx.fillStyle = "rgba(0,0,0,0.07)";
			ctx.fillRect(0, 0, w, h);
			ctx.font = `${size}px "IBM Plex Mono", ui-monospace, monospace`;
			for (let i = 0; i < drops.length; i += 1) {
				const ch = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
				const x = i * size;
				const y = drops[i] * size;
				// bright head, coloured tail
				ctx.fillStyle = "#eafff0";
				ctx.fillText(ch, x, y);
				ctx.fillStyle = color;
				ctx.fillText(GLYPHS[Math.floor(Math.random() * GLYPHS.length)], x, y - size);
				if (y > h && Math.random() > 0.975) drops[i] = 0;
				drops[i] += 0.6 + (i % 7) * 0.08;
			}
		};

		resize();
		window.addEventListener("resize", resize);

		if (reduced) {
			// no motion: paint one still frame
			for (let n = 0; n < 60; n += 1) tick();
		} else {
			const loop = (now) => {
				raf = requestAnimationFrame(loop);
				if (document.hidden || now - last < 40) return;
				last = now;
				tick();
			};
			raf = requestAnimationFrame(loop);
		}
		return () => {
			cancelAnimationFrame(raf);
			window.removeEventListener("resize", resize);
		};
	}, [color]);

	return <canvas ref={ref} className="matrix-rain" aria-hidden="true" />;
};

export default MatrixRain;
