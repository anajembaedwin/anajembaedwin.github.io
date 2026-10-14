// Tiny people. A small simulation drawn on a fixed canvas that sits over the
// page. People live in page coordinates, so they stay put as you scroll.
//
//  - Three sides wander, work, chat, sleep and dance. Every so often a war
//    is declared: two sides march to a spot on screen and fight.
//  - The page's cards, buttons and the terminal are walls. People walk around
//    them. Drag a card onto someone and they are squashed.
//  - Tap a person: they get a name and a job, or they die. Tap someone who
//    already has a character and they say something (and may not survive it).
//
// Nothing here touches the layout and the canvas ignores pointer events.

const BARRIERS =
	".step, .service, .work__row, .proof__item, .product-card, .game-card, .game-feature, .principles li, .testi, .contact__card, .avatar, .repo, .btn, .term, .marquee, .diagram-scroll, .ask, .skills, .hero__title, .hero__lead, .section-title, form";

export const SIDES = [
	{ id: "red", color: "#ff4d6d" },
	{ id: "blue", color: "#4d8cff" },
	{ id: "green", color: "#2fd9a4" },
];
const SKINS = ["#8d5524", "#c68642", "#e0ac69", "#f1c27d", "#5b3a29"];
const NAMES = [
	"Ada", "Ife", "Tomi", "Nuru", "Zola", "Kofi", "Mira", "Bayo", "Sade",
	"Tunde", "Amara", "Jide", "Lola", "Kemi", "Dayo", "Ngozi", "Femi", "Eze",
	"Zuri", "Tayo", "Chidi", "Efe", "Kira", "Obi",
];
// glyph, hat colour, extra hp, damage, reach (px), speed
const ROLES = [
	{ hat: "#c9c9d8", hp: 3, dmg: 1.6, range: 12, speed: 1 },
	{ hat: "#7a4cff", hp: 0, dmg: 1.3, range: 62, speed: 0.9 },
	{ hat: "#fff2cc", hp: 0, dmg: 0.8, range: 12, speed: 1 },
	{ hat: "#ffb84d", hp: 1, dmg: 1, range: 12, speed: 1 },
	{ hat: "#d9b44a", hp: 0, dmg: 0.8, range: 12, speed: 1 },
	{ hat: "#ff5c9a", hp: 0, dmg: 0.7, range: 12, speed: 1.15 },
	{ hat: "#2fb36b", hp: 0, dmg: 0.7, range: 12, speed: 1 },
	{ hat: "#3b7d4a", hp: 1, dmg: 1.1, range: 72, speed: 1.05 },
];
const GLYPHS = ["⚔️", "🧙", "🥖", "🛠️", "🌾", "🎻", "💰", "🏹"];
const CHORES = ["🔨", "🌱", "📖", "☕", "🍎"];

const SC = 1.45; // drawing scale
const PAD = 6;
const AGGRO = 130;
const HIT_MOUSE = 22;
const HIT_TOUCH = 32;

const rand = (a, b) => a + Math.random() * (b - a);
const pick = (list) => list[Math.floor(Math.random() * list.length)];
const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);

export const start = (canvas, api) => {
	const ctx = canvas.getContext("2d");
	const small = () => window.matchMedia("(max-width: 820px)").matches;

	const w = {
		people: [],
		rects: [],
		fx: [],
		kills: 0,
		nextId: 1,
		war: null,
		nextWar: 5,
		causes: {},
		nextBirth: 3,
		lastRect: -1,
		lastStats: 0,
		time: 0,
		docW: 0,
		docH: 0,
		names: [...NAMES].sort(() => Math.random() - 0.5),
	};
	canvas.__world = w; // handy for debugging in the console
	let raf = null;
	let last = 0;
	let dpr = 1;

	const target = () => {
		const per = small() ? 170 : 110;
		const max = small() ? 30 : 56;
		return Math.max(10, Math.min(max, Math.round(w.docH / per)));
	};

	// ---- walls ----
	const refreshRects = () => {
		const sx = window.scrollX;
		const sy = window.scrollY;
		const list = [];
		document.querySelectorAll(BARRIERS).forEach((el) => {
			const r = el.getBoundingClientRect();
			if (r.width < 6 || r.height < 6) return;
			list.push({
				l: r.left + sx - PAD,
				t: r.top + sy - PAD,
				r: r.right + sx + PAD,
				b: r.bottom + sy + PAD,
			});
		});
		w.rects = list;
		w.docW = document.documentElement.clientWidth;
		w.docH = document.documentElement.scrollHeight;
		w.lastRect = w.time;
	};

	const inside = (x, y) => {
		for (let i = 0; i < w.rects.length; i += 1) {
			const r = w.rects[i];
			if (x > r.l && x < r.r && y > r.t && y < r.b) return r;
		}
		return null;
	};
	const free = (x, y) =>
		x > 6 && x < w.docW - 6 && y > 20 && y < w.docH - 6 && !inside(x, y);

	const freeSpot = (cx, cy, radius) => {
		for (let i = 0; i < 14; i += 1) {
			const x = radius ? cx + rand(-radius, radius) : rand(10, w.docW - 10);
			const y = radius ? cy + rand(-radius, radius) : rand(40, w.docH - 20);
			if (free(x, y)) return { x, y };
		}
		return null;
	};

	// ---- people ----
	const spawn = (sideIndex, where) => {
		const spot = where || freeSpot(0, 0, 0);
		if (!spot) return null;
		const p = {
			id: w.nextId++,
			x: spot.x,
			y: spot.y,
			side: sideIndex,
			skin: pick(SKINS),
			hp: 3,
			maxhp: 3,
			state: "walk",
			t: 0,
			age: 0,
			phase: Math.random() * 6,
			dir: Math.random() < 0.5 ? 1 : -1,
			goal: null,
			next: null,
			target: null,
			cool: 0,
			hit: 0,
			stuck: 0,
			slide: Math.random() < 0.5 ? 1 : -1,
			bubble: null,
			bubbleUntil: 0,
			name: null,
			role: -1,
			moving: false,
			rally: null,
		};
		w.people.push(p);
		return p;
	};

	const say = (p, text, secs) => {
		p.bubble = text;
		p.bubbleUntil = w.time + secs;
	};

	const addFx = (fx) => w.fx.push({ ...fx, t: 0 });

	const kill = (p, how) => {
		if (p.state === "dead") return;
		p.state = "dead";
		w.causes[how] = (w.causes[how] || 0) + 1;
		p.t = 0;
		p.bubble = null;
		w.kills += 1;
		addFx({ type: "spark", x: p.x, y: p.y - 8, life: 0.5, color: "#ffffff" });
		api.event({ type: "fell", how, side: SIDES[p.side].id, name: p.name, role: p.role });
	};

	const giveCharacter = (p) => {
		p.role = Math.floor(Math.random() * ROLES.length);
		p.name = w.names.length ? w.names.pop() : `${pick(NAMES)}${Math.floor(rand(2, 9))}`;
		p.maxhp = 3 + ROLES[p.role].hp;
		p.hp = p.maxhp;
		say(p, GLYPHS[p.role], 3);
		addFx({ type: "spark", x: p.x, y: p.y - 10, life: 0.7, color: "#ffd27a" });
		api.event({ type: "joined", side: SIDES[p.side].id, name: p.name, role: p.role });
	};

	// Only the two sides named in a war fight each other.
	const atWar = (a, b) =>
		!!w.war &&
		((a.side === w.war.a && b.side === w.war.b) ||
			(a.side === w.war.b && b.side === w.war.a));

	const nearestEnemy = (p, radius) => {
		let best = null;
		let bd = radius;
		for (let i = 0; i < w.people.length; i += 1) {
			const q = w.people[i];
			if (q.side === p.side || q.state === "dead" || !atWar(p, q)) continue;
			const d = dist(p, q);
			if (d < bd) {
				bd = d;
				best = q;
			}
		}
		return best;
	};

	const nearestFriend = (p, radius) => {
		let best = null;
		let bd = radius;
		for (let i = 0; i < w.people.length; i += 1) {
			const q = w.people[i];
			if (q === p || q.side !== p.side || q.state === "dead") continue;
			const d = dist(p, q);
			if (d < bd) {
				bd = d;
				best = q;
			}
		}
		return best;
	};

	// Walk toward a point, sliding along walls. Returns true on arrival.
	const walk = (p, tx, ty, speed, dt) => {
		const dx = tx - p.x;
		const dy = ty - p.y;
		const d = Math.hypot(dx, dy);
		if (d < 3) {
			p.moving = false;
			return true;
		}
		const ux = dx / d;
		const uy = dy / d;
		const step = speed * dt;
		let nx = p.x + ux * step;
		let ny = p.y + uy * step;
		if (!free(nx, ny)) {
			if (free(nx, p.y)) ny = p.y;
			else if (free(p.x, ny)) nx = p.x;
			else {
				// head-on: slide along the wall
				nx = p.x - uy * p.slide * step;
				ny = p.y + ux * p.slide * step;
				if (!free(nx, ny)) {
					nx = p.x;
					ny = p.y;
				}
			}
		}
		const moved = Math.hypot(nx - p.x, ny - p.y);
		p.stuck = moved < step * 0.25 ? p.stuck + dt : 0;
		if (p.stuck > 0.9) p.slide *= -1;
		if (Math.abs(ux) > 0.2) p.dir = ux > 0 ? 1 : -1;
		p.x = nx;
		p.y = ny;
		p.phase += dt * speed * 0.38;
		p.moving = true;
		return false;
	};

	const chooseActivity = (p) => {
		const roll = Math.random();
		if (p.next) {
			const a = p.next;
			p.next = null;
			return a;
		}
		if (roll < 0.28) return "chore";
		if (roll < 0.5) return "chat";
		if (roll < 0.66) return "dance";
		if (roll < 0.8) return "sleep";
		return "rest";
	};

	const newGoal = (p) => {
		const activity = Math.random() < 0.35 ? "chat" : null;
		if (activity) {
			const f = nearestFriend(p, 260);
			if (f) {
				const spot = freeSpot(f.x, f.y, 22);
				if (spot) {
					p.goal = spot;
					p.next = "chat";
					return;
				}
			}
		}
		p.goal = freeSpot(p.x, p.y, 260) || freeSpot(0, 0, 0);
	};

	const dragging = () => document.body.classList.contains("is-dragging");
	const liftedAny = () => !!document.querySelector(".is-lifted");

	const stepPerson = (p, dt) => {
		p.age += dt;
		p.hit = Math.max(0, p.hit - dt);
		if (p.state === "dead") {
			p.t += dt;
			return;
		}
		if (p.bubble && w.time > p.bubbleUntil) p.bubble = null;

		// Moved onto by a card: shoved out, or squashed if it landed on top.
		const wall = inside(p.x, p.y);
		if (wall) {
			const dl = p.x - wall.l;
			const dr = wall.r - p.x;
			const dt2 = p.y - wall.t;
			const db = wall.b - p.y;
			const m = Math.min(dl, dr, dt2, db);
			if (m > PAD + 10 && (dragging() || liftedAny())) {
				kill(p, "squash");
				return;
			}
			if (m === dl) p.x = wall.l - 1;
			else if (m === dr) p.x = wall.r + 1;
			else if (m === dt2) p.y = wall.t - 1;
			else p.y = wall.b + 1;
		}
		p.x = Math.max(6, Math.min(w.docW - 6, p.x));
		p.y = Math.max(20, Math.min(w.docH - 6, p.y));

		const role = p.role >= 0 ? ROLES[p.role] : null;
		const reach = role ? role.range : 12;
		const spd = 26 * (role ? role.speed : 1);

		// Fighting
		if (p.state === "fight") {
			const t = p.target;
			if (!t || t.state === "dead" || !w.war || dist(p, t) > AGGRO * 1.5) {
				if (t && t.state === "dead") {
					say(p, "🎉", 1.6);
				}
				p.target = null;
				p.state = "walk";
				p.goal = null;
			} else {
				const d = dist(p, t);
				if (Math.abs(t.x - p.x) > 2) p.dir = t.x > p.x ? 1 : -1;
				if (d > reach) {
					walk(p, t.x, t.y, spd * 1.35, dt);
				} else {
					p.moving = false;
					p.cool -= dt;
					p.phase += dt * 9;
					if (p.cool <= 0) {
						p.cool = rand(0.7, 1.1);
						if (Math.random() < 0.55) {
							t.hp -= role ? role.dmg : 1;
							t.hit = 0.25;
							addFx({
								type: reach > 20 ? "line" : "spark",
								x: p.x,
								y: p.y - 10,
								x2: t.x,
								y2: t.y - 10,
								life: 0.18,
								color: reach > 20 ? "#b9a3ff" : "#ffffff",
							});
							if (t.hp <= 0) kill(t, "war");
						}
					}
				}
				return;
			}
		} else if (p.state !== "dead") {
			const radius = p.state === "sleep" ? 70 : AGGRO;
			const e = nearestEnemy(p, radius);
			if (e) {
				p.state = "fight";
				p.target = e;
				p.cool = rand(0.1, 0.5);
				say(p, "⚔️", 1.2);
				return;
			}
		}

		// Marching to a war
		if (p.rally && w.war) {
			const arrived = walk(p, p.rally.x, p.rally.y, spd * 1.25, dt);
			if (arrived) p.moving = false;
			return;
		}
		p.rally = null;

		// Everyday life
		if (p.state === "walk") {
			if (!p.goal || p.stuck > 2.5) {
				newGoal(p);
				p.stuck = 0;
			}
			if (p.goal && walk(p, p.goal.x, p.goal.y, spd, dt)) {
				const a = chooseActivity(p);
				p.state = a;
				p.t = rand(2.5, 6);
				p.moving = false;
				if (a === "chore") say(p, pick(CHORES), p.t);
				else if (a === "chat") say(p, "💬", p.t);
				else if (a === "dance") say(p, "🎵", p.t);
				else if (a === "sleep") {
					p.t = rand(6, 11);
					say(p, "💤", p.t);
				}
			}
		} else {
			p.t -= dt;
			p.moving = false;
			if (p.state === "dance" || p.state === "chore") p.phase += dt * 7;
			if (p.t <= 0) {
				p.state = "walk";
				p.goal = null;
			}
		}
	};

	// ---- wars ----
	const declareWar = () => {
		const counts = SIDES.map((s, i) =>
			w.people.filter((p) => p.side === i && p.state !== "dead").length
		);
		const eligible = counts.map((c, i) => (c >= 3 ? i : -1)).filter((i) => i >= 0);
		if (eligible.length < 2) return;
		const a = eligible.splice(Math.floor(Math.random() * eligible.length), 1)[0];
		const b = pick(eligible);
		const cy = window.scrollY + window.innerHeight * rand(0.35, 0.65);
		const spot = freeSpot(w.docW / 2, cy, Math.min(240, w.docW / 2 - 20));
		if (!spot) return;
		w.war = { a, b, until: w.time + 26, spot };
		w.people.forEach((p) => {
			if (p.state === "dead" || (p.side !== a && p.side !== b)) return;
			if (Math.abs(p.y - spot.y) > 1100) return;
			const off = p.side === a ? -46 : 46;
			p.rally = { x: spot.x + off + rand(-24, 24), y: spot.y + rand(-50, 50) };
			if (p.state !== "fight") p.state = "walk";
		});
		api.event({ type: "war", a: SIDES[a].id, b: SIDES[b].id });
	};

	const update = (dt) => {
		w.time += dt;
		if (dragging() || w.time - w.lastRect > 0.15) refreshRects();

		// births keep the population steady
		const alive = w.people.filter((p) => p.state !== "dead").length;
		w.nextBirth -= dt;
		if (w.nextBirth <= 0) {
			w.nextBirth = rand(2, 4);
			if (alive < target()) {
				const counts = SIDES.map(
					(s, i) => w.people.filter((p) => p.side === i && p.state !== "dead").length
				);
				const side = counts.indexOf(Math.min(...counts));
				const p = spawn(side);
				if (p) addFx({ type: "spark", x: p.x, y: p.y - 8, life: 0.4, color: "#ffffff" });
			}
		}

		// wars
		if (w.war && w.time > w.war.until) {
			w.war = null;
			w.people.forEach((p) => {
				p.rally = null;
			});
		}
		w.nextWar -= dt;
		if (w.nextWar <= 0) {
			w.nextWar = rand(22, 34);
			if (!w.war) declareWar();
		}

		w.people.forEach((p) => stepPerson(p, dt));
		w.people = w.people.filter((p) => p.state !== "dead" || p.t < 8);
		w.fx.forEach((f) => {
			f.t += dt;
		});
		w.fx = w.fx.filter((f) => f.t < f.life);

		if (w.time - w.lastStats > 0.5) {
			w.lastStats = w.time;
			api.stats({
				counts: SIDES.map(
					(s, i) => w.people.filter((p) => p.side === i && p.state !== "dead").length
				),
				kills: w.kills,
				war: !!w.war,
			});
		}
	};

	// ---- drawing ----
	const drawPerson = (p) => {
		const x = 0;
		const y = 0;
		const color = SIDES[p.side].color;
		const grow = Math.min(1, p.age * 4);

		if (p.state === "dead") {
			const a = p.t > 6.4 ? Math.max(0, 1 - (p.t - 6.4) / 1.6) : 1;
			ctx.save();
			ctx.globalAlpha = a;
			ctx.fillStyle = "#c9c4d6";
			ctx.strokeStyle = "#17122b";
			ctx.lineWidth = 1.2;
			ctx.beginPath();
			ctx.moveTo(x - 4, y);
			ctx.lineTo(x - 4, y - 8);
			ctx.arc(x, y - 8, 4, Math.PI, 0);
			ctx.lineTo(x + 4, y);
			ctx.closePath();
			ctx.fill();
			ctx.stroke();
			ctx.beginPath();
			ctx.moveTo(x, y - 10);
			ctx.lineTo(x, y - 4);
			ctx.moveTo(x - 2, y - 8);
			ctx.lineTo(x + 2, y - 8);
			ctx.stroke();
			ctx.restore();
			return;
		}

		ctx.save();
		ctx.translate(x, y);
		ctx.scale(grow, grow);
		ctx.shadowColor = "rgba(255,255,255,0.95)";
		ctx.shadowBlur = 2;

		// ground shadow
		ctx.fillStyle = "rgba(23,18,43,0.25)";
		ctx.beginPath();
		ctx.ellipse(0, 0, 5, 2, 0, 0, Math.PI * 2);
		ctx.fill();

		const sleeping = p.state === "sleep";
		if (sleeping) ctx.rotate((-Math.PI / 2) * p.dir);
		if (p.hit > 0) ctx.translate(rand(-1, 1), 0);
		const dance = p.state === "dance" ? Math.sin(p.phase) * 2.5 : 0;
		const swing = p.moving ? Math.sin(p.phase) * 3 : 0;
		const bob = p.state === "chore" ? Math.abs(Math.sin(p.phase)) * 1.5 : 0;

		ctx.strokeStyle = "#2b2350";
		ctx.lineCap = "round";
		ctx.lineWidth = 1.8;
		// legs
		ctx.beginPath();
		ctx.moveTo(dance, -7 - bob);
		ctx.lineTo(dance - 2 - swing, 0);
		ctx.moveTo(dance, -7 - bob);
		ctx.lineTo(dance + 2 + swing, 0);
		ctx.stroke();
		// body
		ctx.strokeStyle = color;
		ctx.lineWidth = 4.6;
		ctx.beginPath();
		ctx.moveTo(dance, -7 - bob);
		ctx.lineTo(dance, -12.5 - bob);
		ctx.stroke();
		// arm and weapon
		const armed = p.state === "fight" || p.rally;
		ctx.strokeStyle = "#2b2350";
		ctx.lineWidth = 1.4;
		ctx.beginPath();
		ctx.moveTo(dance, -11.5 - bob);
		if (armed) {
			const s = p.state === "fight" ? Math.sin(p.phase) * 4 : 0;
			ctx.lineTo(dance + p.dir * 5, -13 - bob + s);
			ctx.lineTo(dance + p.dir * 9, -17 - bob + s);
		} else if (p.state === "dance") {
			ctx.lineTo(dance - 5, -17);
			ctx.moveTo(dance, -11.5);
			ctx.lineTo(dance + 5, -17);
		} else {
			ctx.lineTo(dance + p.dir * 3.5, -8.5 - swing * 0.3 - bob);
		}
		ctx.stroke();
		// head
		ctx.fillStyle = p.skin;
		ctx.strokeStyle = "#17122b";
		ctx.lineWidth = 1;
		ctx.beginPath();
		ctx.arc(dance, -16.2 - bob, 3.6, 0, Math.PI * 2);
		ctx.fill();
		ctx.stroke();
		// hat for characters
		if (p.role >= 0) {
			ctx.fillStyle = ROLES[p.role].hat;
			ctx.beginPath();
			ctx.rect(dance - 3.8, -21.3 - bob, 7.6, 2.4);
			ctx.fill();
			ctx.stroke();
		}
		ctx.restore();

		// bubble, tag, hp
		ctx.save();
		ctx.shadowColor = "rgba(0,0,0,0)";
		if (p.hp < p.maxhp) {
			const bw = 12;
			ctx.fillStyle = "rgba(23,18,43,0.7)";
			ctx.fillRect(x - bw / 2, y - 25, bw, 2.4);
			ctx.fillStyle = "#3fe0b5";
			ctx.fillRect(x - bw / 2, y - 25, bw * Math.max(0, p.hp / p.maxhp), 2.4);
		}
		if (p.bubble) {
			ctx.font = "12px system-ui, sans-serif";
			ctx.textAlign = "center";
			ctx.fillText(p.bubble, x, y - 28 - Math.sin(w.time * 3 + p.id) * 1.5);
		}
		if (p.name) {
			ctx.font = "700 9px system-ui, sans-serif";
			ctx.textAlign = "center";
			const label = `${GLYPHS[p.role]} ${p.name}`;
			ctx.lineWidth = 3;
			ctx.strokeStyle = "rgba(255,255,255,0.92)";
			ctx.strokeText(label, x, y + 11);
			ctx.fillStyle = "#17122b";
			ctx.fillText(label, x, y + 11);
		}
		ctx.restore();
	};

	const draw = () => {
		const sx = window.scrollX;
		const sy = window.scrollY;
		const vw = window.innerWidth;
		const vh = window.innerHeight;
		ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
		ctx.clearRect(0, 0, vw, vh);
		const view = w.people
			.filter((p) => p.y - sy > -40 && p.y - sy < vh + 40 && p.x - sx > -30 && p.x - sx < vw + 30)
			.sort((a, b) => a.y - b.y);
		view.forEach((p) => {
			ctx.save();
			ctx.translate(p.x - sx, p.y - sy);
			ctx.scale(SC, SC);
			drawPerson(p);
			ctx.restore();
		});
		w.fx.forEach((f) => {
			const k = 1 - f.t / f.life;
			ctx.save();
			ctx.globalAlpha = Math.max(0, k);
			ctx.strokeStyle = f.color;
			ctx.fillStyle = f.color;
			if (f.type === "line") {
				ctx.lineWidth = 2;
				ctx.beginPath();
				ctx.moveTo(f.x - sx, f.y - sy);
				ctx.lineTo(f.x2 - sx, f.y2 - sy);
				ctx.stroke();
			} else {
				const r = 3 + (1 - k) * 9;
				ctx.lineWidth = 1.6;
				ctx.beginPath();
				ctx.arc(f.x - sx, f.y - sy, r, 0, Math.PI * 2);
				ctx.stroke();
			}
			ctx.restore();
		});
	};

	const frame = (now) => {
		raf = requestAnimationFrame(frame);
		const dt = Math.min(0.05, (now - last) / 1000 || 0.016);
		last = now;
		if (document.hidden) return;
		update(dt);
		draw();
	};

	// ---- input ----
	const onClick = (event) => {
		const sx = window.scrollX;
		const sy = window.scrollY;
		const px = event.clientX + sx;
		const py = event.clientY + sy;
		const radius = window.matchMedia("(pointer: coarse)").matches ? HIT_TOUCH : HIT_MOUSE;
		let best = null;
		let bd = radius;
		w.people.forEach((p) => {
			if (p.state === "dead") return;
			const d = Math.hypot(p.x - px, p.y - 9 * SC - py);
			if (d < bd) {
				bd = d;
				best = p;
			}
		});
		if (!best) return;
		event.preventDefault();
		event.stopPropagation();
		const cx = best.x - sx;
		const cy = best.y - sy - 10 * SC;
		if (best.role < 0) {
			if (Math.random() < 0.7) giveCharacter(best);
			else kill(best, "touch");
		} else {
			const lines = api.lines();
			say(best, lines.length ? pick(lines) : "…", 3);
			if (Math.random() < 0.18) kill(best, "touch");
		}
		api.burst(cx, cy, best.state === "dead" ? ["💀", "💥"] : ["✨", "⭐"]);
	};

	let hoverFrame = null;
	const onMove = (event) => {
		if (hoverFrame) return;
		hoverFrame = requestAnimationFrame(() => {
			hoverFrame = null;
			const px = event.clientX + window.scrollX;
			const py = event.clientY + window.scrollY;
			const near = w.people.some(
				(p) => p.state !== "dead" && Math.hypot(p.x - px, p.y - 9 * SC - py) < HIT_MOUSE
			);
			document.documentElement.classList.toggle("tiny-hover", near);
		});
	};

	const resize = () => {
		dpr = Math.min(2, window.devicePixelRatio || 1);
		canvas.width = Math.round(window.innerWidth * dpr);
		canvas.height = Math.round(window.innerHeight * dpr);
		canvas.style.width = `${window.innerWidth}px`;
		canvas.style.height = `${window.innerHeight}px`;
		refreshRects();
	};

	resize();
	window.addEventListener("resize", resize);
	document.addEventListener("click", onClick, true);
	window.addEventListener("pointermove", onMove, { passive: true });

	// first residents
	refreshRects();
	const n = Math.min(target(), small() ? 18 : 30);
	for (let i = 0; i < n; i += 1) spawn(i % SIDES.length);
	raf = requestAnimationFrame(frame);

	return () => {
		cancelAnimationFrame(raf);
		if (hoverFrame) cancelAnimationFrame(hoverFrame);
		window.removeEventListener("resize", resize);
		document.removeEventListener("click", onClick, true);
		window.removeEventListener("pointermove", onMove);
		document.documentElement.classList.remove("tiny-hover");
		ctx.setTransform(1, 0, 0, 1, 0, 0);
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	};
};
