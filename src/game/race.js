// Deploy Rush: a pseudo-3D arcade racer drawn on one canvas.
// The road is a list of short segments that get projected to the screen
// every frame. No libraries, no assets: cars, trees and signs are drawn in code.

const W = 960;
const H = 540;
const SEG = 200; // length of one road segment
const RUMBLE = 3; // segments per stripe colour
const ROAD = 2000; // half width of the road
const LANES = 3;
const FOV = 100;
const CAM_H = 1000;
const DEPTH = 1 / Math.tan(((FOV / 2) * Math.PI) / 180);
const DRAW = 170; // how many segments ahead are drawn
const FOG = 5;
const STEP = 1 / 60;
const MAX = SEG / STEP; // top speed, one segment per step
const ACCEL = MAX / 5;
const BRAKE = -MAX;
const DECEL = -MAX / 5;
const OFF_DECEL = -MAX / 2;
const OFF_LIMIT = MAX / 4;
const CENTRI = 0.22;
const NITRO_CAP = 1.3;
const CAR_W = 640;
const PLAYER_Z = CAM_H * DEPTH;
const LAPS = 3;
const RIVALS = 5;
const LEVELS = {
	easy: { pace: 0.93, traffic: 34, label: "easy" },
	normal: { pace: 1, traffic: 46, label: "normal" },
	hard: { pace: 1.045, traffic: 60, label: "hard" },
};
const PW = CAR_W / ROAD; // car width in road units

const COLORS = {
	sky: ["#120c35", "#4b2fb0", "#ff6f91", "#ffc371"],
	fog: "#7a5bd8",
	light: { road: "#6d6878", grass: "#22a579", rumble: "#ff5c7a", lane: "#f5f0ff" },
	dark: { road: "#656071", grass: "#1d9770", rumble: "#fff4f6" },
	start: { road: "#ffffff", grass: "#22a579", rumble: "#111111" },
	far: { road: "#69646f", grass: "#209f75", rumble: "#ff9db0" },
};

const clamp = (v, a, b) => Math.max(a, Math.min(v, b));
const lerp = (a, b, p) => a + (b - a) * p;
const easeIn = (a, b, p) => a + (b - a) * p * p;
const easeOut = (a, b, p) => a + (b - a) * (1 - (1 - p) * (1 - p));
const rand = (a, b) => a + Math.random() * (b - a);
const pick = (list) => list[Math.floor(Math.random() * list.length)];

const overlap = (x1, w1, x2, w2, k = 1) => {
	const h1 = (w1 / 2) * k;
	const h2 = (w2 / 2) * k;
	return !(x1 + h1 < x2 - h2 || x1 - h1 > x2 + h2);
};

const CAR_COLORS = ["#c9ccd6", "#8d97b5", "#b9a58b", "#9fb8a8", "#a58fb5", "#cfd4dc", "#7f8aa3"];
const SIGNS = ["</>", "DEPLOY", "LGTM", "MERGE", "SHIP IT", "404", "git push", "CI PASS", "v2.0"];

// ----------------------------------------------------------------- track

const buildTrack = () => {
	const segments = [];
	const add = (curve) => {
		const n = segments.length;
		segments.push({
			index: n,
			p1: { world: { z: n * SEG }, camera: {}, screen: {} },
			p2: { world: { z: (n + 1) * SEG }, camera: {}, screen: {} },
			curve,
			cars: [],
			sprites: [],
			kind: n < 4 ? "start" : Math.floor(n / RUMBLE) % 2 ? "dark" : "light",
			fog: 1,
			looped: false,
			visible: false,
		});
	};
	const road = (enter, hold, leave, curve) => {
		for (let i = 0; i < enter; i++) add(easeIn(0, curve, i / enter));
		for (let i = 0; i < hold; i++) add(curve);
		for (let i = 0; i < leave; i++) add(easeOut(curve, 0, i / leave));
	};
	const s = (n) => {
		for (let i = 0; i < n; i++) add(0);
	};

	s(90);
	road(60, 80, 60, 3);
	s(60);
	road(50, 60, 50, -3);
	s(90);
	road(40, 70, 40, 5);
	s(50);
	road(60, 100, 60, -4);
	s(110);
	road(40, 40, 40, 3);
	road(40, 40, 40, -3);
	road(40, 40, 40, 4);
	road(40, 40, 40, -4);
	s(80);
	road(80, 110, 80, 4);
	s(60);
	road(60, 70, 60, -5);
	s(110);
	return segments;
};

const decorate = (segments) => {
	const n = segments.length;
	for (let i = 8; i < n; i += 6) {
		const seg = segments[i];
		if (Math.random() < 0.85) seg.sprites.push({ type: "tree", offset: -rand(1.35, 2.4), w: 0.7 });
		if (Math.random() < 0.85) seg.sprites.push({ type: "tree", offset: rand(1.35, 2.4), w: 0.7 });
	}
	for (let i = 60; i < n; i += 130) {
		const side = Math.random() < 0.5 ? -1 : 1;
		segments[i % n].sprites.push({ type: "sign", offset: side * 1.7, w: 1.3, text: pick(SIGNS) });
	}
	for (let i = 90; i < n - 20; i += 105) {
		segments[i].sprites.push({ type: "bolt", offset: pick([-0.66, 0, 0.66]), w: 0.4, lap: -1 });
	}
};

// ------------------------------------------------------------------ draw

const poly = (ctx, x1, y1, x2, y2, x3, y3, x4, y4, color) => {
	ctx.fillStyle = color;
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.lineTo(x3, y3);
	ctx.lineTo(x4, y4);
	ctx.closePath();
	ctx.fill();
};

const rrect = (ctx, x, y, w, h, r) => {
	ctx.beginPath();
	if (ctx.roundRect) ctx.roundRect(x, y, w, h, r);
	else ctx.rect(x, y, w, h);
};

const shade = (hex, amt) => {
	const n = parseInt(hex.slice(1), 16);
	const r = clamp(((n >> 16) & 255) + amt, 0, 255);
	const g = clamp(((n >> 8) & 255) + amt, 0, 255);
	const b = clamp((n & 255) + amt, 0, 255);
	return `rgb(${r},${g},${b})`;
};

// A car seen from behind. (cx, base) is the bottom centre, w the width.
const drawCar = (ctx, cx, base, w, color, o = {}) => {
	const h = w * (o.van ? 0.72 : 0.56);
	ctx.save();
	if (o.tilt) {
		ctx.translate(cx, base);
		ctx.rotate(o.tilt);
		ctx.translate(-cx, -base);
	}
	ctx.fillStyle = "rgba(0,0,0,.34)";
	ctx.beginPath();
	ctx.ellipse(cx, base, w * 0.56, w * 0.06, 0, 0, Math.PI * 2);
	ctx.fill();

	// wheels
	ctx.fillStyle = "#14101c";
	rrect(ctx, cx - w * 0.5, base - h * 0.42, w * 0.17, h * 0.42, w * 0.03);
	ctx.fill();
	rrect(ctx, cx + w * 0.33, base - h * 0.42, w * 0.17, h * 0.42, w * 0.03);
	ctx.fill();

	// body
	ctx.fillStyle = color;
	rrect(ctx, cx - w * 0.47, base - h * 0.66, w * 0.94, h * 0.5, w * 0.06);
	ctx.fill();
	ctx.fillStyle = shade(color, -38);
	rrect(ctx, cx - w * 0.47, base - h * 0.28, w * 0.94, h * 0.14, w * 0.04);
	ctx.fill();

	// cabin
	ctx.fillStyle = shade(color, -22);
	ctx.beginPath();
	ctx.moveTo(cx - w * 0.36, base - h * 0.64);
	ctx.lineTo(cx - w * 0.27, base - h);
	ctx.lineTo(cx + w * 0.27, base - h);
	ctx.lineTo(cx + w * 0.36, base - h * 0.64);
	ctx.closePath();
	ctx.fill();
	ctx.fillStyle = "#141b34";
	ctx.beginPath();
	ctx.moveTo(cx - w * 0.31, base - h * 0.68);
	ctx.lineTo(cx - w * 0.235, base - h * 0.94);
	ctx.lineTo(cx + w * 0.235, base - h * 0.94);
	ctx.lineTo(cx + w * 0.31, base - h * 0.68);
	ctx.closePath();
	ctx.fill();
	ctx.fillStyle = "rgba(255,255,255,.18)";
	ctx.beginPath();
	ctx.moveTo(cx - w * 0.28, base - h * 0.7);
	ctx.lineTo(cx - w * 0.22, base - h * 0.92);
	ctx.lineTo(cx - w * 0.1, base - h * 0.92);
	ctx.lineTo(cx - w * 0.16, base - h * 0.7);
	ctx.closePath();
	ctx.fill();

	if (o.van) {
		// boxy rear with door lines
		ctx.fillStyle = shade(color, 12);
		rrect(ctx, cx - w * 0.43, base - h * 0.98, w * 0.86, h * 0.42, w * 0.05);
		ctx.fill();
		ctx.strokeStyle = "rgba(0,0,0,.25)";
		ctx.lineWidth = Math.max(1, w * 0.012);
		ctx.beginPath();
		ctx.moveTo(cx, base - h * 0.98);
		ctx.lineTo(cx, base - h * 0.56);
		ctx.stroke();
	}
	if (o.racer) {
		ctx.fillStyle = "rgba(255,255,255,.85)";
		ctx.fillRect(cx - w * 0.05, base - h * 0.66, w * 0.1, h * 0.5);
		ctx.fillRect(cx - w * 0.05, base - h, w * 0.1, h * 0.34);
		// rear wing
		ctx.fillStyle = shade(color, -55);
		ctx.fillRect(cx - w * 0.42, base - h * 1.08, w * 0.84, h * 0.09);
		ctx.fillRect(cx - w * 0.3, base - h * 1.0, w * 0.05, h * 0.1);
		ctx.fillRect(cx + w * 0.25, base - h * 1.0, w * 0.05, h * 0.1);
	}

	// tail lights
	const lit = o.brake ? "#ff2a3f" : "#d6283c";
	if (o.brake) {
		ctx.fillStyle = "rgba(255,42,63,.35)";
		rrect(ctx, cx - w * 0.5, base - h * 0.6, w * 0.26, h * 0.26, w * 0.04);
		ctx.fill();
		rrect(ctx, cx + w * 0.24, base - h * 0.6, w * 0.26, h * 0.26, w * 0.04);
		ctx.fill();
	}
	ctx.fillStyle = lit;
	rrect(ctx, cx - w * 0.44, base - h * 0.56, w * 0.2, h * 0.14, w * 0.03);
	ctx.fill();
	rrect(ctx, cx + w * 0.24, base - h * 0.56, w * 0.2, h * 0.14, w * 0.03);
	ctx.fill();
	// plate
	ctx.fillStyle = "#f4efe6";
	rrect(ctx, cx - w * 0.1, base - h * 0.4, w * 0.2, h * 0.1, w * 0.02);
	ctx.fill();

	if (o.flame) {
		const f = h * (0.3 + Math.random() * 0.18);
		[-0.3, 0.3].forEach((sx) => {
			const fx = cx + w * sx;
			const fy = base - h * 0.1;
			const glow = ctx.createRadialGradient(fx, fy, 0, fx, fy, w * 0.14);
			glow.addColorStop(0, "rgba(255,236,140,.9)");
			glow.addColorStop(1, "rgba(255,120,80,0)");
			ctx.fillStyle = glow;
			ctx.fillRect(fx - w * 0.14, fy - w * 0.14, w * 0.28, w * 0.28);
			const g = ctx.createLinearGradient(0, fy, 0, fy + f);
			g.addColorStop(0, "#fff7b0");
			g.addColorStop(0.5, "#ffb84d");
			g.addColorStop(1, "rgba(255,92,122,0)");
			ctx.fillStyle = g;
			ctx.beginPath();
			ctx.moveTo(fx - w * 0.05, fy);
			ctx.lineTo(fx + w * 0.05, fy);
			ctx.lineTo(fx, fy + f);
			ctx.closePath();
			ctx.fill();
		});
	}
	ctx.restore();
};

const drawTree = (ctx, x, y, w) => {
	ctx.fillStyle = "#4a2f2a";
	ctx.fillRect(x - w * 0.04, y - w * 0.25, w * 0.08, w * 0.25);
	[
		["#0e6a49", 0.62, 0.25, 0.55],
		["#12805a", 0.5, 0.5, 0.78],
		["#16a06f", 0.36, 0.78, 1],
	].forEach(([c, half, from, to]) => {
		ctx.fillStyle = c;
		ctx.beginPath();
		ctx.moveTo(x - w * half * 0.5, y - w * from * 0.6);
		ctx.lineTo(x + w * half * 0.5, y - w * from * 0.6);
		ctx.lineTo(x, y - w * to * 1.05);
		ctx.closePath();
		ctx.fill();
	});
};

const drawSign = (ctx, x, y, w, text) => {
	ctx.fillStyle = "#2a2152";
	ctx.fillRect(x - w * 0.34, y - w * 0.62, w * 0.04, w * 0.62);
	ctx.fillRect(x + w * 0.3, y - w * 0.62, w * 0.04, w * 0.62);
	rrect(ctx, x - w * 0.5, y - w * 0.98, w, w * 0.42, w * 0.05);
	ctx.fillStyle = "#17112f";
	ctx.fill();
	ctx.lineWidth = Math.max(1, w * 0.02);
	ctx.strokeStyle = "#3fe0b5";
	ctx.stroke();
	ctx.fillStyle = "#3fe0b5";
	ctx.font = `700 ${Math.max(6, w * 0.17)}px ui-monospace, Menlo, Consolas, monospace`;
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.fillText(text, x, y - w * 0.77);
};

const drawBolt = (ctx, x, y, w, t) => {
	const bob = Math.sin(t * 5) * w * 0.05;
	const cy = y - w * 0.6 + bob;
	const g = ctx.createRadialGradient(x, cy, 0, x, cy, w * 0.7);
	g.addColorStop(0, "rgba(255,220,100,.55)");
	g.addColorStop(1, "rgba(255,220,100,0)");
	ctx.fillStyle = g;
	ctx.fillRect(x - w * 0.7, cy - w * 0.7, w * 1.4, w * 1.4);
	ctx.fillStyle = "#ffd84d";
	ctx.strokeStyle = "#17112f";
	ctx.lineWidth = Math.max(1, w * 0.04);
	ctx.beginPath();
	ctx.moveTo(x + w * 0.08, cy - w * 0.42);
	ctx.lineTo(x - w * 0.26, cy + w * 0.06);
	ctx.lineTo(x - w * 0.02, cy + w * 0.06);
	ctx.lineTo(x - w * 0.1, cy + w * 0.42);
	ctx.lineTo(x + w * 0.26, cy - w * 0.1);
	ctx.lineTo(x + w * 0.02, cy - w * 0.1);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();
};

// ---------------------------------------------------------------- engine

export const createRace = (canvas, labels, hooks = {}) => {
	const mq = (q) => !!(window.matchMedia && window.matchMedia(q).matches);
	const coarse = mq("(pointer: coarse)");
	const calm = mq("(prefers-reduced-motion: reduce)");
	const dpr = Math.min(coarse ? 1.5 : 2, window.devicePixelRatio || 1);
	canvas.width = W * dpr;
	canvas.height = H * dpr;
	const ctx = canvas.getContext("2d");
	ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

	const segments = buildTrack();
	decorate(segments);
	const N = segments.length;
	const TL = N * SEG;
	const stars = Array.from({ length: 50 }, () => [Math.random() * W, Math.random() * (H / 2 - 40), Math.random() * 1.6 + 0.4]);

	// A loop-shaped map of the circuit, drawn in the corner. It follows the curves
	// loosely rather than being a survey of the road.
	const mapPts = (() => {
		const pts = [];
		let wig = 0;
		let x = 0;
		let y = 0;
		for (let i = 0; i < N; i++) {
			wig += segments[i].curve * 0.0016;
			const hd = (Math.PI * 2 * i) / N + wig;
			x += Math.cos(hd);
			y += Math.sin(hd);
			pts.push([x, y]);
		}
		const dx = x;
		const dy = y;
		const out = pts.map(([px, py], i) => [px - (dx * (i + 1)) / N, py - (dy * (i + 1)) / N]);
		const xs = out.map((q) => q[0]);
		const ys = out.map((q) => q[1]);
		const minX = Math.min(...xs);
		const minY = Math.min(...ys);
		const sc = Math.min(110 / (Math.max(...xs) - minX || 1), 66 / (Math.max(...ys) - minY || 1));
		const ox = (110 - (Math.max(...xs) - minX) * sc) / 2;
		const oy = (66 - (Math.max(...ys) - minY) * sc) / 2;
		return out.map(([px, py]) => [ox + (px - minX) * sc, oy + (py - minY) * sc]);
	})();

	const findSeg = (z) => segments[Math.floor((((z % TL) + TL) % TL) / SEG)];

	let st;
	let cars = [];
	let raf = 0;
	let last = 0;
	let acc = 0;
	let alive = true;
	let audio = null;
	let muted = false;
	let paused = false;
	let level = "normal";
	let drawN = coarse ? 130 : DRAW;
	let slow = 0;
	let prevNow = 0;
	let padStart = false;
	const pad = { left: false, right: false, brake: false, nitro: false };
	const ctl = (name) => keys[name] || pad[name];
	const keys = { left: false, right: false, brake: false, nitro: false };

	const clearCars = () => segments.forEach((s) => (s.cars = []));

	const reset = () => {
		clearCars();
		segments.forEach((s) =>
			s.sprites.forEach((sp) => {
				if (sp.type === "bolt") sp.lap = -1;
			}),
		);
		st = {
			phase: "ready",
			position: 0,
			dist: 0,
			x: 0,
			speed: 0,
			nitro: 1,
			nitroOn: false,
			shake: 0,
			bumpCool: 0,
			ghost: 0,
			push: 0,
			time: 0,
			count: 0,
			goFlash: 0,
			lap: 1,
			lapStart: 0,
			lapTimes: [],
			skyOff: 0,
			toast: "",
			toastT: 0,
			finishTime: 0,
			place: 0,
			doneT: 0,
			braking: false,
			clock: 0,
		};
		cars = [];
		const lanes = [-0.5, 0.5, -0.5, 0.5, 0];
		const cfg = LEVELS[level] || LEVELS.normal;
		const paces = [0.97, 0.95, 0.93, 0.91, 0.89].map((v) => v * cfg.pace);
		for (let i = 0; i < RIVALS; i++) {
			const z = PLAYER_Z + 380 * (i + 1);
			cars.push({
				rival: true,
				z: z % TL,
				dist: z,
				offset: lanes[i],
				lane: lanes[i],
				speed: 0,
				pace: paces[i],
				w: PW,
				color: ["#ff5c7a", "#4d8cff", "#ffb84d", "#3fe0b5", "#a78bfa"][i],
				finish: 0,
				block: 0,
				percent: 0,
				braking: false,
			});
		}
		for (let i = 0; i < cfg.traffic; i++) {
			const z = rand(3200, TL - 400);
			cars.push({
				rival: false,
				z,
				dist: z,
				offset: pick([-0.66, 0, 0.66]),
				lane: 0,
				speed: MAX * rand(0.22, 0.4),
				w: PW,
				color: pick(CAR_COLORS),
				van: Math.random() < 0.5,
				finish: 0,
				block: 0,
				percent: 0,
				braking: false,
			});
		}
		cars.forEach((c) => findSeg(c.z).cars.push(c));
	};

	// ------------------------------------------------------------ audio

	const startAudio = () => {
		if (audio || muted) return;
		try {
			const AC = window.AudioContext || window.webkitAudioContext;
			if (!AC) return;
			const ac = new AC();
			const osc = ac.createOscillator();
			const osc2 = ac.createOscillator();
			const filter = ac.createBiquadFilter();
			const gain = ac.createGain();
			osc.type = "sawtooth";
			osc2.type = "square";
			filter.type = "lowpass";
			filter.frequency.value = 520;
			gain.gain.value = 0;
			osc.connect(filter);
			osc2.connect(filter);
			filter.connect(gain);
			gain.connect(ac.destination);
			osc.start();
			osc2.start();
			audio = { ac, osc, osc2, filter, gain };
		} catch (error) {
			audio = null;
		}
	};

	const beep = (freq, ms, vol = 0.08) => {
		if (!audio || muted) return;
		try {
			const o = audio.ac.createOscillator();
			const g = audio.ac.createGain();
			o.type = "square";
			o.frequency.value = freq;
			g.gain.value = vol;
			o.connect(g);
			g.connect(audio.ac.destination);
			o.start();
			g.gain.exponentialRampToValueAtTime(0.0001, audio.ac.currentTime + ms / 1000);
			o.stop(audio.ac.currentTime + ms / 1000 + 0.02);
		} catch (error) {
			// ignore
		}
	};

	const engine = () => {
		if (!audio) return;
		const running = st.phase === "racing" || st.phase === "finished";
		const sp = st.speed / MAX;
		const f = 52 + sp * 150 + (st.nitroOn ? 28 : 0);
		audio.osc.frequency.setTargetAtTime(f, audio.ac.currentTime, 0.05);
		audio.osc2.frequency.setTargetAtTime(f * 0.5, audio.ac.currentTime, 0.05);
		audio.filter.frequency.setTargetAtTime(380 + sp * 900, audio.ac.currentTime, 0.08);
		audio.gain.gain.setTargetAtTime(muted || paused || !running ? 0 : 0.05 + sp * 0.04, audio.ac.currentTime, 0.1);
	};

	// ----------------------------------------------------------- update

	const toast = (text) => {
		st.toast = text;
		st.toastT = 1.2;
	};

	const offsetFor = (car, carSeg, playerSeg) => {
		car.block = 0;
		for (let i = 1; i < 18; i++) {
			const seg = segments[(carSeg.index + i) % N];
			if (seg === playerSeg && car.speed > st.speed && overlap(st.x, PW, car.offset, car.w, 1.2)) {
				const dir = st.x > 0.5 ? -1 : st.x < -0.5 ? 1 : car.offset > st.x ? 1 : -1;
				if (i < 4) car.block = st.speed;
				return (dir / i) * ((car.speed - st.speed) / MAX);
			}
			for (let k = 0; k < seg.cars.length; k++) {
				const o = seg.cars[k];
				if (o !== car && car.speed > o.speed && overlap(car.offset, car.w, o.offset, o.w, 1.2)) {
					const dir = o.offset > 0.5 ? -1 : o.offset < -0.5 ? 1 : car.offset > o.offset ? 1 : -1;
					if (i < 4) car.block = o.speed;
					return (dir / i) * ((car.speed - o.speed) / MAX);
				}
			}
		}
		return 0;
	};

	const update = (dt) => {
		st.clock += dt;
		st.shake = Math.max(0, st.shake - dt * 1.6);
		st.bumpCool = Math.max(0, st.bumpCool - dt);
		st.ghost = Math.max(0, st.ghost - dt);
		st.toastT = Math.max(0, st.toastT - dt);
		st.goFlash = Math.max(0, st.goFlash - dt);

		if (st.phase === "ready") return;

		if (st.phase === "countdown") {
			const before = Math.ceil(st.count);
			st.count -= dt;
			const after = Math.ceil(st.count);
			if (after !== before && after > 0) beep(440, 140);
			if (st.count <= 0) {
				st.phase = "racing";
				st.goFlash = 0.9;
				beep(880, 420, 0.1);
			}
			return;
		}

		const racing = st.phase === "racing";
		const playerSeg = findSeg(st.position + PLAYER_Z);
		const sp = st.speed / MAX;
		const dx = dt * 2 * sp;

		if (racing) {
			st.time += dt;
			if (ctl("left")) st.x -= dx;
			if (ctl("right")) st.x += dx;
			st.x -= dx * sp * playerSeg.curve * CENTRI;
			st.nitroOn = ctl("nitro") && st.nitro > 0.02 && !ctl("brake");
		} else {
			st.nitroOn = false;
			st.x = lerp(st.x, 0, Math.min(1, dt * 1.4));
		}

		const cap = st.nitroOn ? MAX * NITRO_CAP : MAX;
		const moved = dt * st.speed;
		st.position = (st.position + moved) % TL;
		st.dist += moved;

		st.braking = false;
		if (racing && ctl("brake")) {
			st.speed += BRAKE * dt;
			st.braking = true;
		} else if (racing) {
			if (st.speed < cap) st.speed += (st.nitroOn ? ACCEL * 1.9 : ACCEL) * dt;
			else st.speed = Math.max(cap, st.speed + DECEL * dt);
		} else {
			st.speed = Math.max(0, st.speed + BRAKE * 0.18 * dt);
		}

		if (st.nitroOn) st.nitro = Math.max(0, st.nitro - 0.4 * dt);
		else st.nitro = Math.min(1, st.nitro + 0.07 * dt);

		st.x += st.push * dt;
		st.push *= Math.max(0, 1 - 4.5 * dt);
		if ((st.x < -1 || st.x > 1) && st.speed > OFF_LIMIT) st.speed += OFF_DECEL * dt;
		st.x = clamp(st.x, -2.2, 2.2);
		st.speed = clamp(st.speed, 0, MAX * NITRO_CAP);

		// scenery and pickups in the player's segment
		playerSeg.sprites.forEach((sp2) => {
			if (!overlap(st.x, PW, sp2.offset, sp2.w, 0.9)) return;
			if (sp2.type === "bolt") {
				if (sp2.lap !== st.lap) {
					sp2.lap = st.lap;
					st.nitro = Math.min(1, st.nitro + 0.45);
					toast(labels.bolt);
					beep(1040, 120);
				}
			} else if (st.ghost <= 0 && st.speed > MAX * 0.2) {
				st.speed = MAX * 0.2;
				st.shake = 0.8;
				st.ghost = 0.6;
				st.push = st.x > 0 ? -2.2 : 2.2;
				beep(110, 160, 0.12);
			}
		});

		// other cars: look at the segments just behind, at and just ahead of the player
		if (st.ghost <= 0 && racing) {
			const pz = st.position + PLAYER_Z;
			let hit = null;
			let hitDz = 0;
			for (let k = -1; k <= 1 && !hit; k++) {
				const seg = segments[(playerSeg.index + k + N) % N];
				for (let i = 0; i < seg.cars.length; i++) {
					const c = seg.cars[i];
					const dz = ((((c.z - pz) % TL) + TL * 1.5) % TL) - TL / 2;
					if (Math.abs(dz) < 330 && overlap(st.x, PW, c.offset, c.w, 0.85)) {
						hit = c;
						hitDz = dz;
						break;
					}
				}
			}
			if (hit) {
				const dir = st.x > hit.offset ? 1 : st.x < hit.offset ? -1 : st.x > 0 ? -1 : 1;
				if (hitDz > -150 && st.speed > hit.speed) st.speed = Math.max(0, hit.speed * 0.8);
				st.push = dir * 2.6;
				st.shake = Math.max(st.shake, 0.6);
				st.ghost = 0.7;
				beep(90, 150, 0.12);
			}
		}

		const pdist = st.dist + PLAYER_Z;
		const lapNow = Math.min(LAPS, Math.floor(pdist / TL) + 1);
		if (racing && lapNow > st.lap) {
			st.lapTimes.push(st.time - st.lapStart);
			st.lapStart = st.time;
			st.lap = lapNow;
			toast(st.lap === LAPS ? labels.finalLap : `${labels.lap} ${st.lap}/${LAPS}`);
			beep(660, 200);
		}

		st.skyOff += playerSeg.curve * sp * dt * 60 * 0.9;

		// cars
		cars.forEach((car) => {
			const oldSeg = findSeg(car.z);
			car.offset += offsetFor(car, oldSeg, playerSeg);
			if (car.rival) {
				car.offset += (car.lane - car.offset) * 0.012;
				const gap = car.dist - pdist;
				let pace = car.pace;
				if (gap > 9000) pace *= 0.88;
				else if (gap > 4000) pace *= 0.95;
				else if (gap < -14000) pace *= 1.14;
				else if (gap < -5000) pace *= 1.06;
				const curveSlow = 1 - Math.min(Math.abs(oldSeg.curve), 6) * 0.03;
				let target = MAX * pace * curveSlow;
				if (car.block) target = Math.min(target, car.block);
				car.speed += clamp(target - car.speed, -MAX * 0.6 * dt, ACCEL * dt);
				car.braking = target < car.speed - 40;
				if (!car.finish && car.dist >= LAPS * TL) car.finish = st.time || 1;
			}
			car.offset = clamp(car.offset, -0.88, 0.88);
			const mv = dt * car.speed;
			car.z = (car.z + mv) % TL;
			car.dist += mv;
			car.percent = (car.z % SEG) / SEG;
			const newSeg = findSeg(car.z);
			if (newSeg !== oldSeg) {
				const i = oldSeg.cars.indexOf(car);
				if (i >= 0) oldSeg.cars.splice(i, 1);
				newSeg.cars.push(car);
			}
		});

		if (racing && pdist >= LAPS * TL) {
			st.lapTimes.push(st.time - st.lapStart);
			st.finishTime = st.time;
			st.place = 1 + cars.filter((c) => c.rival && c.finish && c.finish <= st.time).length;
			st.phase = "finished";
			st.doneT = 1.6;
			beep(988, 500, 0.1);
		}
		if (st.phase === "finished" && st.doneT > 0) {
			st.doneT -= dt;
			if (st.doneT <= 0 && hooks.onFinish) {
				hooks.onFinish({
					place: st.place,
					total: RIVALS + 1,
					level,
					time: st.finishTime,
					bestLap: Math.min(...st.lapTimes),
				});
			}
		}
	};

	// ----------------------------------------------------------- render

	const project = (p, camX, camY, camZ) => {
		p.camera.x = (p.world.x || 0) - camX;
		p.camera.y = (p.world.y || 0) - camY;
		p.camera.z = (p.world.z || 0) - camZ;
		p.screen.scale = DEPTH / p.camera.z;
		p.screen.x = Math.round(W / 2 + (p.screen.scale * p.camera.x * W) / 2);
		p.screen.y = Math.round(H / 2 - (p.screen.scale * p.camera.y * H) / 2);
		p.screen.w = Math.round((p.screen.scale * ROAD * W) / 2);
	};

	const drawSky = () => {
		const g = ctx.createLinearGradient(0, 0, 0, H / 2 + 24);
		g.addColorStop(0, COLORS.sky[0]);
		g.addColorStop(0.5, COLORS.sky[1]);
		g.addColorStop(0.82, COLORS.sky[2]);
		g.addColorStop(1, COLORS.sky[3]);
		ctx.fillStyle = g;
		ctx.fillRect(0, 0, W, H);

		ctx.fillStyle = "rgba(255,255,255,.7)";
		stars.forEach(([x, y, r]) => {
			const sx = (((x - st.skyOff * 0.08) % W) + W) % W;
			ctx.fillRect(sx, y, r, r);
		});

		const sunX = (((W * 0.7 - st.skyOff * 0.12) % (W + 240)) + (W + 240)) % (W + 240) - 120;
		const sg = ctx.createLinearGradient(0, H / 2 - 110, 0, H / 2 - 10);
		sg.addColorStop(0, "#fff0a8");
		sg.addColorStop(1, "#ff6f91");
		ctx.fillStyle = sg;
		ctx.beginPath();
		ctx.arc(sunX, H / 2 - 18, 74, 0, Math.PI * 2);
		ctx.fill();

		const ridge = (off, amp, base, color) => {
			ctx.fillStyle = color;
			ctx.beginPath();
			ctx.moveTo(0, H / 2 + 20);
			for (let x = 0; x <= W; x += 10) {
				const t = x + off;
				const y = H / 2 + 14 - base - amp * (0.55 + 0.45 * Math.sin(t * 0.011)) - amp * 0.4 * Math.sin(t * 0.027 + 1.3);
				ctx.lineTo(x, y);
			}
			ctx.lineTo(W, H / 2 + 20);
			ctx.closePath();
			ctx.fill();
		};
		ridge(st.skyOff * 0.35, 34, 10, "#3b2a8c");
		ridge(st.skyOff * 0.7 + 300, 26, 0, "#2a1d6b");
	};

	const drawSegment = (seg) => {
		const { p1, p2 } = seg;
		const c = COLORS[seg.drawKind || seg.kind];
		const x1 = p1.screen.x;
		const y1 = p1.screen.y + 1; // 1px overlap hides hairline seams
		const w1 = p1.screen.w;
		const x2 = p2.screen.x;
		const y2 = p2.screen.y;
		const w2 = p2.screen.w;
		const r1 = w1 / Math.max(6, 2 * LANES);
		const r2 = w2 / Math.max(6, 2 * LANES);
		const l1 = w1 / Math.max(32, 8 * LANES);
		const l2 = w2 / Math.max(32, 8 * LANES);

		ctx.fillStyle = c.grass;
		ctx.fillRect(0, y2, W, y1 - y2);
		poly(ctx, x1 - w1 - r1, y1, x1 - w1, y1, x2 - w2, y2, x2 - w2 - r2, y2, c.rumble);
		poly(ctx, x1 + w1 + r1, y1, x1 + w1, y1, x2 + w2, y2, x2 + w2 + r2, y2, c.rumble);
		poly(ctx, x1 - w1, y1, x1 + w1, y1, x2 + w2, y2, x2 - w2, y2, c.road);
		if (seg.drawKind === "light" || (!seg.drawKind && seg.kind === "light")) {
			const lw1 = (w1 * 2) / LANES;
			const lw2 = (w2 * 2) / LANES;
			let lx1 = x1 - w1 + lw1;
			let lx2 = x2 - w2 + lw2;
			for (let lane = 1; lane < LANES; lane++, lx1 += lw1, lx2 += lw2) {
				poly(ctx, lx1 - l1 / 2, y1, lx1 + l1 / 2, y1, lx2 + l2 / 2, y2, lx2 - l2 / 2, y2, c.lane);
			}
		}
		if (seg.kind === "start" && seg.drawKind === "start") {
			// chequered finish line
			const cells = 10;
			for (let i = 0; i < cells; i++) {
				if ((i + seg.index) % 2) continue;
				const a1 = x1 - w1 + (w1 * 2 * i) / cells;
				const b1 = x1 - w1 + (w1 * 2 * (i + 1)) / cells;
				const a2 = x2 - w2 + (w2 * 2 * i) / cells;
				const b2 = x2 - w2 + (w2 * 2 * (i + 1)) / cells;
				poly(ctx, a1, y1, b1, y1, b2, y2, a2, y2, "#111111");
			}
		}
		if (seg.fog < 1) {
			ctx.globalAlpha = 1 - seg.fog;
			ctx.fillStyle = COLORS.fog;
			ctx.fillRect(0, y2, W, y1 - y2);
			ctx.globalAlpha = 1;
		}
	};

	const hud = () => {
		const pdist = st.dist + PLAYER_Z;
		const rank = st.phase === "finished" ? st.place : 1 + cars.filter((c) => c.rival && c.dist > pdist).length;
		const font = (px, weight = 800) => `${weight} ${px}px system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`;
		const tag = (x, y, w, h) => {
			ctx.fillStyle = "rgba(18,12,53,.62)";
			rrect(ctx, x, y, w, h, 12);
			ctx.fill();
		};
		ctx.textBaseline = "alphabetic";
		ctx.textAlign = "left";

		tag(14, 14, 150, 62);
		ctx.fillStyle = "#c9bcff";
		ctx.font = font(12, 700);
		ctx.fillText(labels.pos, 28, 34);
		ctx.fillStyle = "#fff";
		ctx.font = font(34);
		ctx.fillText(String(rank), 28, 66);
		const rw = ctx.measureText(String(rank)).width;
		ctx.font = font(16, 700);
		ctx.fillStyle = "#c9bcff";
		ctx.fillText(`/ ${RIVALS + 1}`, 28 + rw + 6, 66);

		tag(174, 14, 120, 62);
		ctx.fillStyle = "#c9bcff";
		ctx.font = font(12, 700);
		ctx.fillText(labels.lap, 188, 34);
		ctx.fillStyle = "#fff";
		ctx.font = font(30);
		ctx.fillText(`${Math.min(st.lap, LAPS)}/${LAPS}`, 188, 66);

		const t = st.phase === "finished" ? st.finishTime : st.time;
		const m = Math.floor(t / 60);
		const s = (t % 60).toFixed(1).padStart(4, "0");
		tag(W - 154, 14, 140, 46);
		ctx.fillStyle = "#fff";
		ctx.font = font(26);
		ctx.textAlign = "right";
		ctx.fillText(`${m}:${s}`, W - 28, 47);

		// speed
		tag(14, H - 78, 120, 62);
		ctx.textAlign = "left";
		ctx.fillStyle = "#c9bcff";
		ctx.font = font(12, 700);
		ctx.fillText(labels.kmh, 28, H - 58);
		ctx.fillStyle = "#fff";
		ctx.font = font(34);
		ctx.fillText(String(Math.round((st.speed / MAX) * 240)), 28, H - 26);

		// nitro
		tag(W - 224, H - 56, 210, 42);
		ctx.fillStyle = "#c9bcff";
		ctx.font = font(11, 700);
		ctx.textAlign = "left";
		ctx.fillText(labels.nitro, W - 210, H - 36);
		ctx.fillStyle = "rgba(255,255,255,.18)";
		rrect(ctx, W - 210, H - 30, 182, 10, 5);
		ctx.fill();
		const g = ctx.createLinearGradient(W - 210, 0, W - 28, 0);
		g.addColorStop(0, "#ffb84d");
		g.addColorStop(1, "#ff5c7a");
		ctx.fillStyle = g;
		if (st.nitro > 0.01) {
			rrect(ctx, W - 210, H - 30, 182 * st.nitro, 10, 5);
			ctx.fill();
		}

		// minimap
		const mx = W - 138;
		const my = 70;
		tag(mx - 8, my - 6, 128, 80);
		ctx.strokeStyle = "rgba(255,255,255,.55)";
		ctx.lineWidth = 4;
		ctx.lineJoin = "round";
		ctx.beginPath();
		for (let i = 0; i < mapPts.length; i += 4) {
			const q = mapPts[i];
			if (i === 0) ctx.moveTo(mx + q[0], my + q[1]);
			else ctx.lineTo(mx + q[0], my + q[1]);
		}
		ctx.closePath();
		ctx.stroke();
		const dot = (z, color, r) => {
			const q = mapPts[Math.floor((((z % TL) + TL) % TL) / SEG) % N];
			ctx.fillStyle = color;
			ctx.beginPath();
			ctx.arc(mx + q[0], my + q[1], r, 0, Math.PI * 2);
			ctx.fill();
		};
		cars.forEach((c) => c.rival && dot(c.z, c.color, 3.4));
		dot(st.position + PLAYER_Z, "#ffffff", 5.2);
		dot(st.position + PLAYER_Z, "#ffd84d", 3.4);

		// off-road warning
		if (Math.abs(st.x) > 1.02 && st.speed > OFF_LIMIT * 0.6 && st.phase === "racing") {
			const pulse = 0.22 + 0.1 * Math.sin(st.clock * 14);
			const eg = ctx.createLinearGradient(0, 0, W, 0);
			eg.addColorStop(0, `rgba(255,60,80,${pulse})`);
			eg.addColorStop(0.2, "rgba(255,60,80,0)");
			eg.addColorStop(0.8, "rgba(255,60,80,0)");
			eg.addColorStop(1, `rgba(255,60,80,${pulse})`);
			ctx.fillStyle = eg;
			ctx.fillRect(0, 0, W, H);
		}

		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		if (st.phase === "countdown") {
			const n = Math.ceil(st.count);
			const frac = st.count - Math.floor(st.count);
			ctx.fillStyle = "#fff";
			ctx.font = font(150 + frac * 50);
			ctx.globalAlpha = 0.35 + frac * 0.65;
			ctx.fillText(String(Math.max(1, n)), W / 2, H / 2 - 40);
			ctx.globalAlpha = 1;
		}
		if (st.goFlash > 0) {
			ctx.globalAlpha = Math.min(1, st.goFlash * 2);
			ctx.fillStyle = "#3fe0b5";
			ctx.font = font(130);
			ctx.fillText(labels.go, W / 2, H / 2 - 40);
			ctx.globalAlpha = 1;
		}
		if (st.toastT > 0) {
			ctx.globalAlpha = Math.min(1, st.toastT * 2);
			ctx.fillStyle = "#ffd84d";
			ctx.font = font(30);
			ctx.fillText(st.toast, W / 2, 110);
			ctx.globalAlpha = 1;
		}
		if (Math.abs(st.x) > 1.02 && st.speed > OFF_LIMIT * 0.6 && st.phase === "racing") {
			ctx.fillStyle = "#ff8a9a";
			ctx.font = font(22);
			ctx.fillText(labels.off, W / 2, 160);
		}
		if (st.phase === "finished") {
			ctx.fillStyle = "#fff";
			ctx.font = font(84);
			ctx.fillText(labels.finish, W / 2, H / 2 - 30);
		}
	};

	const render = () => {
		ctx.save();
		if (st.shake > 0) {
			const k = calm ? 0.2 : 1;
			ctx.translate((Math.random() - 0.5) * st.shake * 12 * k, (Math.random() - 0.5) * st.shake * 10 * k);
		}
		drawSky();

		const base = findSeg(st.position);
		const basePct = (st.position % SEG) / SEG;
		let x = 0;
		let dx = -(base.curve * basePct);
		let maxY = H;
		segments.forEach((s) => (s.visible = false));
		const curLap = st.lap;
		const clock = st.clock;

		for (let n = 0; n < drawN; n++) {
			const seg = segments[(base.index + n) % N];
			seg.looped = seg.index < base.index;
			seg.drawKind = seg.kind === "start" ? "start" : n > drawN * 0.36 ? "far" : seg.kind;
			seg.fog = 1 / Math.exp(((n / drawN) * (n / drawN)) * FOG);
			const camZ = st.position - (seg.looped ? TL : 0);
			project(seg.p1, st.x * ROAD - x, CAM_H, camZ);
			project(seg.p2, st.x * ROAD - x - dx, CAM_H, camZ);
			x += dx;
			dx += seg.curve;
			if (seg.p1.camera.z <= DEPTH || seg.p2.screen.y >= maxY) continue;
			seg.visible = true;
			drawSegment(seg);
			maxY = seg.p1.screen.y;
		}

		for (let n = drawN - 1; n >= 0; n--) {
			const seg = segments[(base.index + n) % N];
			if (!seg.visible) continue;
			const alpha = clamp(seg.fog * 2.4, 0, 1);
			ctx.globalAlpha = alpha;
			seg.sprites.forEach((s) => {
				const sc = seg.p1.screen.scale;
				const sx = seg.p1.screen.x + (sc * s.offset * ROAD * W) / 2;
				const sy = seg.p1.screen.y;
				const w = (sc * s.w * ROAD * W) / 2;
				if (s.type === "tree") drawTree(ctx, sx, sy, w * 1.0);
				else if (s.type === "sign") drawSign(ctx, sx, sy, w * 0.8, s.text);
				else if (s.type === "bolt" && s.lap !== curLap) drawBolt(ctx, sx, sy, w * 0.75, clock);
			});
			seg.cars.forEach((car) => {
				const sc = lerp(seg.p1.screen.scale, seg.p2.screen.scale, car.percent);
				const cx = lerp(seg.p1.screen.x, seg.p2.screen.x, car.percent) + (sc * car.offset * ROAD * W) / 2;
				const cy = lerp(seg.p1.screen.y, seg.p2.screen.y, car.percent);
				drawCar(ctx, cx, cy, (sc * CAR_W * W) / 2, car.color, { brake: car.braking, van: car.van, racer: car.rival });
			});
			ctx.globalAlpha = 1;
		}

		// player car
		const sp = st.speed / MAX;
		const steer = (ctl("right") ? 1 : 0) - (ctl("left") ? 1 : 0);
		const bob = st.phase === "racing" || st.phase === "finished" ? Math.sin(st.clock * 38) * sp * 2.2 : 0;
		const pw = ((DEPTH / PLAYER_Z) * CAR_W * W) / 2;
		st.tilt = lerp(st.tilt || 0, steer * 0.028 * (0.4 + sp), 0.18);
		const blink = st.ghost > 0 && Math.floor(st.clock * 16) % 3 === 0;
		if (!blink) drawCar(ctx, W / 2, H - 30 + bob, pw, "#ffd84d", { brake: st.braking, flame: st.nitroOn, tilt: st.tilt });

		if (st.nitroOn) {
			ctx.strokeStyle = "rgba(255,255,255,.28)";
			ctx.lineWidth = 2;
			for (let i = 0; i < 14; i++) {
				const a = Math.random() * Math.PI * 2;
				const r1 = 150 + Math.random() * 130;
				const r2 = r1 + 40 + Math.random() * 70;
				ctx.beginPath();
				ctx.moveTo(W / 2 + Math.cos(a) * r1 * 1.5, H / 2 + Math.sin(a) * r1 * 0.8);
				ctx.lineTo(W / 2 + Math.cos(a) * r2 * 1.5, H / 2 + Math.sin(a) * r2 * 0.8);
				ctx.stroke();
			}
		}

		hud();
		ctx.restore();
	};

	// ------------------------------------------------------------- loop

	const readPad = () => {
		pad.left = pad.right = pad.brake = pad.nitro = false;
		let g = null;
		try {
			const list = navigator.getGamepads ? navigator.getGamepads() : [];
			for (let i = 0; i < list.length; i++) if (list[i]) g = list[i];
		} catch (error) {
			g = null;
		}
		if (!g) return;
		const ax = g.axes[0] || 0;
		const b = (i) => !!(g.buttons[i] && g.buttons[i].pressed);
		pad.left = ax < -0.3 || b(14);
		pad.right = ax > 0.3 || b(15);
		pad.brake = b(6) || b(1) || b(13);
		pad.nitro = b(7) || b(0) || b(12);
		const start = b(9);
		if (start && !padStart) api.toggle();
		padStart = start;
	};

	const frame = (now) => {
		if (!alive) return;
		raf = requestAnimationFrame(frame);
		const dt = Math.min(0.1, (now - last) / 1000);
		const ft = now - (prevNow || now);
		prevNow = now;
		last = now;
		readPad();
		if (paused) {
			acc = 0;
			engine();
			render();
			return;
		}
		// on slow devices, draw fewer segments rather than stutter
		if (ft > 26) slow++;
		else slow = Math.max(0, slow - 1);
		if (slow > 45 && drawN > 80) {
			drawN -= 15;
			slow = 0;
		}
		acc += dt;
		let guard = 0;
		while (acc >= STEP && guard < 6) {
			update(STEP);
			acc -= STEP;
			guard++;
		}
		if (guard >= 6) acc = 0;
		engine();
		render();
	};

	const onHidden = () => {
		if (document.hidden && (st.phase === "racing" || st.phase === "countdown")) api.pause();
	};
	document.addEventListener("visibilitychange", onHidden);

	reset();
	last = performance.now();
	raf = requestAnimationFrame(frame);

	const api = {
		start(opts = {}) {
			if (opts.level && LEVELS[opts.level]) level = opts.level;
			paused = false;
			if (hooks.onPause) hooks.onPause(false);
			startAudio();
			if (audio && audio.ac.state === "suspended") audio.ac.resume();
			reset();
			st.phase = "countdown";
			st.count = 3.4;
			if (hooks.onStart) hooks.onStart(level);
		},
		pause() {
			if (paused || (st.phase !== "racing" && st.phase !== "countdown")) return;
			paused = true;
			Object.keys(keys).forEach((k) => (keys[k] = false));
			if (hooks.onPause) hooks.onPause(true);
		},
		resume() {
			if (!paused) return;
			paused = false;
			last = performance.now();
			if (hooks.onPause) hooks.onPause(false);
		},
		toggle() {
			if (paused) api.resume();
			else api.pause();
		},
		isPaused: () => paused,
		setLevel(l) {
			if (LEVELS[l]) level = l;
		},
		input(name, value) {
			if (name in keys) keys[name] = !!value;
		},
		setMuted(m) {
			muted = !!m;
			if (muted && audio) audio.gain.gain.value = 0;
			if (!muted) startAudio();
		},
		phase: () => st.phase,
		debug: () => ({ st, cars, segments, TL, MAX, N }),
		destroy() {
			alive = false;
			document.removeEventListener("visibilitychange", onHidden);
			cancelAnimationFrame(raf);
			if (audio) {
				try {
					audio.osc.stop();
					audio.osc2.stop();
					audio.ac.close();
				} catch (error) {
					// ignore
				}
			}
		},
	};

	return api;
};

export const RACE = { LAPS, TOTAL: RIVALS + 1 };
