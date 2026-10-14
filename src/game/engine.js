// Tiny Wars battle engine. Pure logic, no DOM, so it can be tested in Node and
// later run on a server for live battles.
//
// Two castles face each other. Each side spends gold on troops that march,
// fight, and try to break the other castle. Team 0 is the player, team 1 the
// opponent.

export const W = 800;
export const H = 440;
export const CASTLE_X = [46, 754];
export const CASTLE_HP = 120;
export const DURATION = 180;
export const MAX_GOLD = 300;
export const GOLD_RATE = 8;
export const UNIT_CAP = 40;
export const LANE_TOP = 170;
export const LANE_BOTTOM = 340;
const AGGRO = 120;
const CASTLE_REACH = 26;

export const KINDS = ["knight", "archer", "wizard", "baker"];

export const UNITS = {
	knight: { cost: 50, hp: 12, dmg: 2.2, rate: 0.8, range: 14, speed: 34, cd: 1.2 },
	archer: { cost: 60, hp: 6, dmg: 1.7, rate: 1, range: 92, speed: 30, cd: 1.4 },
	wizard: { cost: 90, hp: 6, dmg: 2.6, rate: 1.7, range: 74, speed: 26, cd: 2.4, splash: 30 },
	baker: { cost: 70, hp: 7, dmg: 0.7, rate: 1.2, range: 12, speed: 28, cd: 2, heal: 1.7, aura: 58 },
};

export const DIFFICULTY = {
	easy: { income: 0.75, think: 3.4 },
	normal: { income: 1, think: 2.6 },
	hard: { income: 1.15, think: 2.0 },
};

// small seeded generator so a battle can be replayed
const makeRng = (seed) => {
	let s = (seed >>> 0) || 1;
	return () => {
		s = (s + 0x6d2b79f5) >>> 0;
		let t = s;
		t = Math.imul(t ^ (t >>> 15), t | 1);
		t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
	};
};

export const createBattle = ({ difficulty = "normal", seed = Date.now() } = {}) => ({
	t: 0,
	units: [],
	fx: [],
	nextId: 1,
	gold: [100, 100],
	hp: [CASTLE_HP, CASTLE_HP],
	castleHit: [0, 0],
	castleCool: [0.6, 0.9],
	spawnCd: [{}, {}],
	hornUntil: [0, 0],
	hornReady: [0, 0],
	kills: [0, 0],
	income: [1, (DIFFICULTY[difficulty] || DIFFICULTY.normal).income],
	think: (DIFFICULTY[difficulty] || DIFFICULTY.normal).think,
	aiTimer: 2,
	over: null, // { winner: 0 | 1 | -1, reason }
	rng: makeRng(seed),
});

const alive = (u) => u.hp > 0;
const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);

export const canSpawn = (s, team, kind) =>
	!s.over &&
	s.gold[team] >= UNITS[kind].cost &&
	(s.spawnCd[team][kind] || 0) <= 0 &&
	s.units.filter((u) => u.team === team && alive(u)).length < UNIT_CAP;

export const spawn = (s, team, kind) => {
	if (!canSpawn(s, team, kind)) return false;
	const def = UNITS[kind];
	s.gold[team] -= def.cost;
	s.spawnCd[team][kind] = def.cd;
	s.units.push({
		id: s.nextId++,
		team,
		kind,
		x: CASTLE_X[team] + (team === 0 ? 20 : -20),
		y: LANE_TOP + s.rng() * (LANE_BOTTOM - LANE_TOP),
		hp: def.hp,
		maxhp: def.hp,
		cool: 0.3 + s.rng() * 0.4,
		hit: 0,
		age: 0,
		phase: s.rng() * 6,
		moving: false,
		atk: 0,
		dead: 0,
	});
	return true;
};

export const hornReady = (s, team) => !s.over && s.t >= s.hornReady[team];

export const blowHorn = (s, team) => {
	if (!hornReady(s, team)) return false;
	s.hornUntil[team] = s.t + 6;
	s.hornReady[team] = s.t + 28;
	s.fx.push({ type: "horn", team, t: 0, life: 0.9 });
	return true;
};

const damage = (s, from, target, amount) => {
	if (!alive(target)) return;
	target.hp -= amount;
	target.hit = 0.2;
	if (target.hp <= 0) {
		target.hp = 0;
		target.dead = 0;
		s.kills[from.team] += 1;
	}
};

const nearestEnemy = (s, u, radius) => {
	let best = null;
	let bd = radius;
	for (let i = 0; i < s.units.length; i += 1) {
		const e = s.units[i];
		if (e.team === u.team || !alive(e)) continue;
		const d = dist(u, e);
		if (d < bd) {
			bd = d;
			best = e;
		}
	}
	return best;
};

const attack = (s, u, def, target) => {
	const boost = s.t < s.hornUntil[u.team] ? 1.4 : 1;
	const amount = def.dmg * boost;
	u.atk = 0.18;
	if (def.range > 20) {
		s.fx.push({ type: "shot", x: u.x, y: u.y - 12, x2: target.x, y2: target.y - 10, t: 0, life: 0.16, team: u.team, kind: u.kind });
	}
	damage(s, u, target, amount);
	if (def.splash) {
		s.fx.push({ type: "boom", x: target.x, y: target.y - 6, t: 0, life: 0.35, r: def.splash });
		for (let i = 0; i < s.units.length; i += 1) {
			const e = s.units[i];
			if (e !== target && e.team !== u.team && alive(e) && dist(e, target) < def.splash) {
				damage(s, u, e, amount * 0.6);
			}
		}
	}
};

const hitCastle = (s, u, def) => {
	const enemy = 1 - u.team;
	const boost = s.t < s.hornUntil[u.team] ? 1.4 : 1;
	u.atk = 0.18;
	s.hp[enemy] = Math.max(0, s.hp[enemy] - def.dmg * boost * 0.9);
	s.castleHit[enemy] = 0.2;
	if (def.range > 20) {
		s.fx.push({ type: "shot", x: u.x, y: u.y - 12, x2: CASTLE_X[enemy], y2: 210, t: 0, life: 0.16, team: u.team, kind: u.kind });
	}
};

// The opponent. Also used in tests to play the other side.
export const aiAct = (s, team) => {
	const foes = s.units.filter((u) => u.team !== team && alive(u));
	const mine = s.units.filter((u) => u.team === team && alive(u));
	const count = (list, kind) => list.filter((u) => u.kind === kind).length;
	let want;
	if (foes.length >= 5 && s.rng() < 0.55) want = "wizard";
	else if (count(foes, "archer") > count(foes, "knight") && s.rng() < 0.7) want = "knight";
	else if (count(foes, "knight") >= 2 && s.rng() < 0.65) want = "archer";
	else if (mine.length >= 4 && count(mine, "baker") === 0 && s.rng() < 0.6) want = "baker";
	else want = KINDS[Math.floor(s.rng() * KINDS.length)];
	if (!canSpawn(s, team, want)) {
		const cheap = KINDS.filter((k) => canSpawn(s, team, k));
		if (!cheap.length) return;
		// wait a little to afford something better, but not forever
		if (s.gold[team] < 120 && s.rng() < 0.5) return;
		want = cheap[Math.floor(s.rng() * cheap.length)];
	}
	spawn(s, team, want);
	if (mine.length >= 5 && foes.length >= 3 && hornReady(s, team) && s.rng() < 0.5) blowHorn(s, team);
};

export const step = (s, dt) => {
	if (s.over) {
		s.fx.forEach((f) => {
			f.t += dt;
		});
		s.fx = s.fx.filter((f) => f.t < f.life);
		return;
	}
	s.t += dt;

	for (let team = 0; team < 2; team += 1) {
		s.gold[team] = Math.min(MAX_GOLD, s.gold[team] + GOLD_RATE * s.income[team] * dt);
		Object.keys(s.spawnCd[team]).forEach((k) => {
			s.spawnCd[team][k] = Math.max(0, s.spawnCd[team][k] - dt);
		});
		s.castleHit[team] = Math.max(0, s.castleHit[team] - dt);
	}

	s.aiTimer -= dt;
	if (s.aiTimer <= 0) {
		s.aiTimer = s.think * (0.7 + s.rng() * 0.6);
		aiAct(s, 1);
	}

	const units = s.units;
	for (let i = 0; i < units.length; i += 1) {
		const u = units[i];
		u.age += dt;
		u.hit = Math.max(0, u.hit - dt);
		u.atk = Math.max(0, u.atk - dt);
		if (!alive(u)) {
			u.dead += dt;
			continue;
		}
		const def = UNITS[u.kind];
		const boost = s.t < s.hornUntil[u.team] ? 1.35 : 1;
		const dir = u.team === 0 ? 1 : -1;
		const enemyCastle = CASTLE_X[1 - u.team];
		u.cool -= dt;
		u.moving = false;

		if (def.heal) {
			for (let j = 0; j < units.length; j += 1) {
				const a = units[j];
				if (a.team === u.team && alive(a) && a !== u && a.hp < a.maxhp && dist(a, u) < def.aura) {
					a.hp = Math.min(a.maxhp, a.hp + def.heal * dt);
				}
			}
		}

		const foe = nearestEnemy(s, u, AGGRO);
		if (foe && def.heal === undefined) {
			const d = dist(u, foe);
			if (d <= def.range) {
				if (u.cool <= 0) {
					u.cool = def.rate;
					attack(s, u, def, foe);
				}
			} else {
				const dx = foe.x - u.x;
				const dy = foe.y - u.y;
				const len = Math.hypot(dx, dy) || 1;
				u.x += (dx / len) * def.speed * boost * dt;
				u.y += (dy / len) * def.speed * boost * dt;
				u.moving = true;
			}
			continue;
		}

		const toCastle = Math.abs(enemyCastle - u.x);
		if (def.heal === undefined && toCastle <= def.range + CASTLE_REACH) {
			if (u.cool <= 0) {
				u.cool = def.rate;
				hitCastle(s, u, def);
			}
			continue;
		}
		if (def.heal !== undefined && foe && dist(u, foe) < 36) {
			// bakers shove back only when cornered
			if (u.cool <= 0) {
				u.cool = def.rate;
				attack(s, u, def, foe);
			}
		}
		// march, bakers hang a little behind the front line
		let stop = false;
		if (def.heal !== undefined) {
			let front = null;
			for (let j = 0; j < units.length; j += 1) {
				const a = units[j];
				if (a.team === u.team && alive(a) && a.kind !== "baker") {
					if (front === null || (u.team === 0 ? a.x > front : a.x < front)) front = a.x;
				}
			}
			if (front !== null && Math.abs(front - u.x) < 22 && (u.team === 0 ? front > u.x : front < u.x)) stop = true;
			if (front === null && toCastle < 140) stop = true;
		}
		if (!stop) {
			u.x += dir * def.speed * boost * dt;
			u.moving = true;
		}
		u.phase += dt * def.speed * 0.4;
	}

	// keep troops from stacking and inside the lane
	for (let i = 0; i < units.length; i += 1) {
		const a = units[i];
		if (!alive(a)) continue;
		for (let j = i + 1; j < units.length; j += 1) {
			const b = units[j];
			if (!alive(b) || a.team !== b.team) continue;
			const dx = b.x - a.x;
			const dy = b.y - a.y;
			const d = Math.hypot(dx, dy);
			if (d < 9) {
				const push = (9 - d) * 0.5;
				const ux = d ? dx / d : 0;
				const uy = d ? dy / d : 1;
				a.x -= ux * push * 0.3;
				a.y -= uy * push;
				b.x += ux * push * 0.3;
				b.y += uy * push;
			}
		}
		a.y = Math.max(LANE_TOP - 20, Math.min(LANE_BOTTOM + 20, a.y));
		a.x = Math.max(10, Math.min(W - 10, a.x));
	}

	// castles defend themselves
	for (let team = 0; team < 2; team += 1) {
		s.castleCool[team] -= dt;
		if (s.castleCool[team] <= 0 && s.hp[team] > 0) {
			const probe = { x: CASTLE_X[team], y: 230, team };
			const target = nearestEnemy(s, probe, 96);
			if (target) {
				s.castleCool[team] = 1.2;
				damage(s, probe, target, 1.3);
				s.fx.push({ type: "shot", x: CASTLE_X[team], y: 190, x2: target.x, y2: target.y - 10, t: 0, life: 0.16, team, kind: "archer" });
			} else {
				s.castleCool[team] = 0.3;
			}
		}
	}

	s.units = units.filter((u) => alive(u) || u.dead < 1.2);
	s.fx.forEach((f) => {
		f.t += dt;
	});
	s.fx = s.fx.filter((f) => f.t < f.life);

	if (s.hp[0] <= 0 || s.hp[1] <= 0) {
		const winner = s.hp[1] <= 0 && s.hp[0] <= 0 ? -1 : s.hp[1] <= 0 ? 0 : 1;
		s.over = { winner, reason: "castle" };
	} else if (s.t >= DURATION) {
		const diff = s.hp[0] - s.hp[1];
		s.over = { winner: Math.abs(diff) < 1 ? -1 : diff > 0 ? 0 : 1, reason: "time" };
	}
};

// Glory for the player (team 0). The server enforces the same ceiling.
export const MAX_GLORY = 90;
export const scoreBattle = (s) => {
	if (!s.over) return null;
	const win = s.over.winner === 0;
	const draw = s.over.winner === -1;
	const hpBonus = Math.round(20 * Math.max(0, s.hp[0]) / CASTLE_HP);
	const killBonus = Math.min(20, s.kills[0]);
	const glory = Math.min(MAX_GLORY, 10 + (win ? 40 : draw ? 15 : 0) + hpBonus + killBonus);
	return {
		win,
		draw,
		glory,
		kills: s.kills[0],
		castlePct: Math.round((100 * Math.max(0, s.hp[0])) / CASTLE_HP),
		seconds: Math.round(s.t),
	};
};
