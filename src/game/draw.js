import { W, H, CASTLE_X, CASTLE_HP, UNITS, DURATION } from "./engine";

// Draws one frame of a battle. `colors` are the two team colours.
const SKIN = ["#8d5524", "#c68642", "#e0ac69", "#f1c27d", "#5b3a29"];
const HAT = { knight: "#c9c9d8", archer: "#3b7d4a", wizard: "#7a4cff", baker: "#fff2cc" };
let UNIT_SCALE = 1.7;
const GLYPH = { knight: "⚔️", archer: "🏹", wizard: "🧙", baker: "🥖" };

const person = (ctx, u, color, t) => {
	const dir = u.team === 0 ? 1 : -1;
	const swing = u.moving ? Math.sin(u.phase) * 3 : 0;
	const lunge = u.atk > 0 ? dir * 3 : 0;
	ctx.save();
	ctx.translate(u.x, u.y);
	ctx.scale(UNIT_SCALE, UNIT_SCALE);

	if (u.hp <= 0) {
		const a = Math.max(0, 1 - u.dead / 1.2);
		ctx.globalAlpha = a;
		ctx.fillStyle = "#c9c4d6";
		ctx.strokeStyle = "#17122b";
		ctx.lineWidth = 1;
		ctx.beginPath();
		ctx.moveTo(-3.5, 0);
		ctx.lineTo(-3.5, -7);
		ctx.arc(0, -7, 3.5, Math.PI, 0);
		ctx.lineTo(3.5, 0);
		ctx.closePath();
		ctx.fill();
		ctx.stroke();
		ctx.restore();
		return;
	}

	ctx.fillStyle = "rgba(23,18,43,0.22)";
	ctx.beginPath();
	ctx.ellipse(0, 0, 5, 2, 0, 0, Math.PI * 2);
	ctx.fill();
	if (u.hit > 0) ctx.translate((Math.random() - 0.5) * 1.6, 0);
	ctx.lineCap = "round";
	ctx.strokeStyle = "#2b2350";
	ctx.lineWidth = 1.8;
	ctx.beginPath();
	ctx.moveTo(lunge, -7);
	ctx.lineTo(lunge - 2 - swing, 0);
	ctx.moveTo(lunge, -7);
	ctx.lineTo(lunge + 2 + swing, 0);
	ctx.stroke();
	ctx.strokeStyle = color;
	ctx.lineWidth = 4.6;
	ctx.beginPath();
	ctx.moveTo(lunge, -7);
	ctx.lineTo(lunge, -12.5);
	ctx.stroke();
	ctx.strokeStyle = "#2b2350";
	ctx.lineWidth = 1.4;
	ctx.beginPath();
	ctx.moveTo(lunge, -11.5);
	if (u.kind === "knight") {
		ctx.lineTo(lunge + dir * 5, -13);
		ctx.lineTo(lunge + dir * 10, -19 + (u.atk > 0 ? 4 : 0));
	} else if (u.kind === "archer") {
		ctx.lineTo(lunge + dir * 6, -12);
		ctx.moveTo(lunge + dir * 6, -17);
		ctx.quadraticCurveTo(lunge + dir * 10, -12, lunge + dir * 6, -7);
	} else if (u.kind === "wizard") {
		ctx.lineTo(lunge + dir * 5, -13);
		ctx.lineTo(lunge + dir * 7, -22);
	} else {
		ctx.lineTo(lunge + dir * 4, -9);
	}
	ctx.stroke();
	const skin = SKIN[u.id % SKIN.length];
	ctx.fillStyle = skin;
	ctx.strokeStyle = "#17122b";
	ctx.lineWidth = 1;
	ctx.beginPath();
	ctx.arc(lunge, -16.2, 3.6, 0, Math.PI * 2);
	ctx.fill();
	ctx.stroke();
	ctx.fillStyle = HAT[u.kind];
	ctx.beginPath();
	ctx.rect(lunge - 3.8, -21.3, 7.6, 2.4);
	ctx.fill();
	ctx.stroke();
	ctx.restore();

	if (u.hp < u.maxhp) {
		const bw = 16;
		ctx.fillStyle = "rgba(23,18,43,0.75)";
		ctx.fillRect(u.x - bw / 2, u.y - 27 * UNIT_SCALE, bw, 3);
		ctx.fillStyle = u.hp / u.maxhp > 0.4 ? "#3fe0b5" : "#ff5c7a";
		ctx.fillRect(u.x - bw / 2, u.y - 27 * UNIT_SCALE, bw * (u.hp / u.maxhp), 3);
	}
};

const castle = (ctx, team, s, color) => {
	const x = CASTLE_X[team];
	const hit = s.castleHit[team] > 0;
	ctx.save();
	ctx.translate(x + (hit ? (Math.random() - 0.5) * 3 : 0), 0);
	ctx.fillStyle = "rgba(23,18,43,0.2)";
	ctx.beginPath();
	ctx.ellipse(0, 262, 40, 9, 0, 0, Math.PI * 2);
	ctx.fill();
	ctx.font = "92px system-ui, 'Apple Color Emoji', 'Segoe UI Emoji', sans-serif";
	ctx.textAlign = "center";
	ctx.fillStyle = "#000000";
	ctx.fillText("🏰", 0, 262);
	// banner in the team colour
	ctx.fillStyle = color;
	ctx.strokeStyle = "#17122b";
	ctx.lineWidth = 2;
	ctx.beginPath();
	ctx.moveTo(-3, 182);
	ctx.lineTo(-3, 152);
	ctx.lineTo(22, 162);
	ctx.lineTo(-3, 172);
	ctx.fill();
	ctx.stroke();
	ctx.restore();
	const bw = 80;
	const left = x - bw / 2;
	ctx.fillStyle = "rgba(23,18,43,0.75)";
	ctx.fillRect(left, 136, bw, 8);
	ctx.fillStyle = color;
	ctx.fillRect(left, 136, bw * Math.max(0, s.hp[team] / CASTLE_HP), 8);
	ctx.strokeStyle = "#17122b";
	ctx.lineWidth = 1.5;
	ctx.strokeRect(left, 136, bw, 8);
};

export const drawBattle = (ctx, s, colors, dpr, cssWidth) => {
	UNIT_SCALE = cssWidth < 520 ? 2.3 : 1.7; // bigger troops on phones
	const k = (cssWidth * dpr) / W;
	ctx.setTransform(k, 0, 0, k, 0, 0);
	ctx.clearRect(0, 0, W, H);

	// sky and ground
	const sky = ctx.createLinearGradient(0, 0, 0, 190);
	sky.addColorStop(0, "#bfe3ff");
	sky.addColorStop(1, "#eaf7ff");
	ctx.fillStyle = sky;
	ctx.fillRect(0, 0, W, 190);
	ctx.fillStyle = "#fff6c9";
	ctx.beginPath();
	ctx.arc(W / 2, 42, 22, 0, Math.PI * 2);
	ctx.fill();
	const grass = ctx.createLinearGradient(0, 190, 0, H);
	grass.addColorStop(0, "#9be3a6");
	grass.addColorStop(1, "#5fc57a");
	ctx.fillStyle = grass;
	ctx.fillRect(0, 190, W, H - 190);
	ctx.fillStyle = "rgba(214,178,120,0.55)";
	ctx.beginPath();
	ctx.ellipse(W / 2, 262, W * 0.44, 34, 0, 0, Math.PI * 2);
	ctx.fill();

	castle(ctx, 0, s, colors[0]);
	castle(ctx, 1, s, colors[1]);

	const list = [...s.units].sort((a, b) => a.y - b.y);
	list.forEach((u) => person(ctx, u, colors[u.team], s.t));

	s.fx.forEach((f) => {
		const a = 1 - f.t / f.life;
		ctx.save();
		ctx.globalAlpha = Math.max(0, a);
		if (f.type === "shot") {
			ctx.strokeStyle = f.kind === "wizard" ? "#b9a3ff" : "#ffffff";
			ctx.lineWidth = f.kind === "wizard" ? 3 : 2;
			ctx.beginPath();
			ctx.moveTo(f.x, f.y);
			ctx.lineTo(f.x2, f.y2);
			ctx.stroke();
		} else if (f.type === "boom") {
			ctx.strokeStyle = "#b9a3ff";
			ctx.fillStyle = "rgba(185,163,255,0.25)";
			ctx.lineWidth = 2;
			ctx.beginPath();
			ctx.arc(f.x, f.y, f.r * (1 - a * 0.4), 0, Math.PI * 2);
			ctx.fill();
			ctx.stroke();
		} else if (f.type === "horn") {
			ctx.strokeStyle = colors[f.team];
			ctx.lineWidth = 4;
			ctx.beginPath();
			ctx.arc(CASTLE_X[f.team], 200, 20 + (1 - a) * 420, 0, Math.PI * 2);
			ctx.stroke();
		}
		ctx.restore();
	});

	if (s.t < s.hornUntil[0] || s.t < s.hornUntil[1]) {
		ctx.save();
		ctx.font = "700 14px system-ui, sans-serif";
		ctx.textAlign = "center";
		ctx.fillStyle = "rgba(23,18,43,0.7)";
		ctx.fillText("📯", W / 2, 24);
		ctx.restore();
	}
	return { time: Math.max(0, Math.ceil(DURATION - s.t)), units: UNITS, glyph: GLYPH };
};

export { GLYPH };
