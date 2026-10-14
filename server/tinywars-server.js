// Tiny Wars weekly-war server. No dependencies: plain Node (18+).
//
//   GET  /health
//   GET  /api/war      this week's totals per side, top commanders, time left
//   POST /api/result   a finished battle: { id, name, side, win, glory, seconds, castlePct, kills }
//
// Battles are played in the browser for now, so results are checked for
// plausibility (ceilings, minimum length, rate limits) rather than trusted.
// When live battles arrive, the match itself will run on the server.
//
// Env: PORT (8080), ALLOWED_ORIGINS (comma list), DATA_FILE (./data.json),
//      TRUST_PROXY=1 when behind a load balancer (reads X-Forwarded-For).

const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = Number(process.env.PORT) || 8080;
const DATA_FILE = process.env.DATA_FILE || path.join(__dirname, "data.json");
const TRUST_PROXY = process.env.TRUST_PROXY === "1";
const ORIGINS = (
	process.env.ALLOWED_ORIGINS ||
	"https://anajembaedwin.github.io,http://localhost:3000,http://localhost:5057"
)
	.split(",")
	.map((s) => s.trim())
	.filter(Boolean);

const SIDES = ["red", "blue", "green"];
const MAX_BODY = 2048;
const MIN_GAP_MS = 20000; // per player, between results
const IP_LIMIT = 40; // results per IP per hour

// ---- week handling (UTC, weeks start Monday) ----
const weekKey = (d = new Date()) => {
	const t = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
	const day = t.getUTCDay() || 7;
	t.setUTCDate(t.getUTCDate() + 4 - day);
	const yearStart = new Date(Date.UTC(t.getUTCFullYear(), 0, 1));
	const week = Math.ceil(((t - yearStart) / 86400000 + 1) / 7);
	return `${t.getUTCFullYear()}-W${String(week).padStart(2, "0")}`;
};
const weekEnd = (d = new Date()) => {
	const t = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
	const day = t.getUTCDay() || 7;
	t.setUTCDate(t.getUTCDate() + (8 - day));
	return t.toISOString();
};

// ---- storage ----
const fresh = () => ({
	week: weekKey(),
	totals: { red: 0, blue: 0, green: 0 },
	players: {},
	history: [],
});
let db = fresh();
try {
	db = { ...fresh(), ...JSON.parse(fs.readFileSync(DATA_FILE, "utf8")) };
} catch (error) {
	// first run
}

let saveTimer = null;
const save = () => {
	if (saveTimer) return;
	saveTimer = setTimeout(() => {
		saveTimer = null;
		const tmp = `${DATA_FILE}.tmp`;
		try {
			fs.writeFileSync(tmp, JSON.stringify(db));
			fs.renameSync(tmp, DATA_FILE);
		} catch (error) {
			console.error("save failed:", error.message);
		}
	}, 2000);
};

// The war resets every Monday. The winner is kept in history.
const rollWeek = () => {
	const now = weekKey();
	if (db.week === now) return;
	const entries = Object.entries(db.totals).sort((a, b) => b[1] - a[1]);
	db.history = [{ week: db.week, winner: entries[0][1] > 0 ? entries[0][0] : null, totals: db.totals }, ...db.history].slice(0, 12);
	db.week = now;
	db.totals = { red: 0, blue: 0, green: 0 };
	db.players = {};
	save();
};

// ---- helpers ----
const hits = new Map(); // ip -> [timestamps]
const overLimit = (ip) => {
	const now = Date.now();
	const list = (hits.get(ip) || []).filter((t) => now - t < 3600000);
	list.push(now);
	hits.set(ip, list);
	return list.length > IP_LIMIT;
};
setInterval(() => {
	const now = Date.now();
	for (const [ip, list] of hits) {
		const keep = list.filter((t) => now - t < 3600000);
		if (keep.length) hits.set(ip, keep);
		else hits.delete(ip);
	}
}, 600000).unref();

const clientIp = (req) => {
	if (TRUST_PROXY) {
		const f = req.headers["x-forwarded-for"];
		if (f) return String(f).split(",")[0].trim();
	}
	return req.socket.remoteAddress || "unknown";
};

const cleanName = (raw) =>
	String(raw || "")
		.normalize("NFKC")
		.replace(/[^\p{L}\p{N} _.\-]/gu, "")
		.replace(/\s+/g, " ")
		.trim()
		.slice(0, 16);

const send = (res, status, body, origin) => {
	const headers = {
		"Content-Type": "application/json; charset=utf-8",
		"Cache-Control": "no-store",
		"X-Content-Type-Options": "nosniff",
	};
	if (origin) {
		headers["Access-Control-Allow-Origin"] = origin;
		headers.Vary = "Origin";
	}
	res.writeHead(status, headers);
	res.end(JSON.stringify(body));
};

const readBody = (req) =>
	new Promise((resolve, reject) => {
		let size = 0;
		const chunks = [];
		req.on("data", (c) => {
			size += c.length;
			if (size > MAX_BODY) {
				reject(new Error("too large"));
				req.destroy();
				return;
			}
			chunks.push(c);
		});
		req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
		req.on("error", reject);
	});

const warView = () => {
	rollWeek();
	const top = Object.values(db.players)
		.sort((a, b) => b.glory - a.glory)
		.slice(0, 10)
		.map((p) => ({ name: p.name, side: p.side, glory: p.glory }));
	return {
		week: db.week,
		endsAt: weekEnd(),
		totals: db.totals,
		players: Object.keys(db.players).length,
		top,
		lastWinner: db.history[0] ? db.history[0].winner : null,
	};
};

const maxGlory = (win, castlePct, kills) =>
	10 + (win ? 40 : 15) + Math.round((20 * castlePct) / 100) + Math.min(20, kills);

const handleResult = (body, ip) => {
	let d;
	try {
		d = JSON.parse(body);
	} catch (error) {
		return [400, { error: "bad json" }];
	}
	const id = String(d.id || "");
	const name = cleanName(d.name);
	const { side } = d;
	const glory = Number(d.glory);
	const seconds = Number(d.seconds);
	const castlePct = Number(d.castlePct);
	const kills = Number(d.kills);
	const win = d.win === true;
	const draw = d.draw === true;
	if (!/^[A-Za-z0-9-]{8,64}$/.test(id)) return [400, { error: "bad id" }];
	if (name.length < 2) return [400, { error: "bad name" }];
	if (!SIDES.includes(side)) return [400, { error: "bad side" }];
	if (![glory, seconds, castlePct, kills].every(Number.isFinite)) return [400, { error: "bad numbers" }];
	if (glory < 0 || glory > 90 || !Number.isInteger(glory)) return [400, { error: "bad glory" }];
	if (seconds < 20 || seconds > 200) return [400, { error: "bad duration" }];
	if (castlePct < 0 || castlePct > 100 || kills < 0 || kills > 80) return [400, { error: "bad stats" }];
	const ceiling = draw ? 10 + 15 + Math.round((20 * castlePct) / 100) + Math.min(20, kills) : maxGlory(win, castlePct, kills);
	if (glory > ceiling) return [400, { error: "glory too high" }];
	if (overLimit(ip)) return [429, { error: "slow down" }];

	rollWeek();
	const now = Date.now();
	const p = db.players[id] || { name, side, glory: 0, battles: 0, wins: 0, last: 0 };
	if (now - p.last < MIN_GAP_MS) return [429, { error: "too soon" }];
	if (p.battles > 0 && p.side !== side) {
		// switching sides mid-week isn't allowed, so nobody can flood the leader
		return [409, { error: "side locked this week", side: p.side }];
	}
	p.name = name;
	p.side = side;
	p.glory += glory;
	p.battles += 1;
	p.wins += win ? 1 : 0;
	p.last = now;
	db.players[id] = p;
	db.totals[side] += glory;
	save();
	return [200, { ok: true, you: { glory: p.glory, battles: p.battles, wins: p.wins }, totals: db.totals }];
};

const server = http.createServer(async (req, res) => {
	const origin = ORIGINS.includes(req.headers.origin) ? req.headers.origin : null;
	const url = (req.url || "/").split("?")[0];

	if (req.method === "OPTIONS") {
		const headers = {
			"Access-Control-Allow-Methods": "GET, POST, OPTIONS",
			"Access-Control-Allow-Headers": "Content-Type",
			"Access-Control-Max-Age": "86400",
		};
		if (origin) headers["Access-Control-Allow-Origin"] = origin;
		res.writeHead(204, headers);
		res.end();
		return;
	}
	if (url === "/health") return send(res, 200, { ok: true }, origin);
	if (url === "/api/war" && req.method === "GET") return send(res, 200, warView(), origin);
	if (url === "/api/result" && req.method === "POST") {
		if (req.headers.origin && !origin) return send(res, 403, { error: "origin not allowed" });
		try {
			const [status, payload] = handleResult(await readBody(req), clientIp(req));
			return send(res, status, payload, origin);
		} catch (error) {
			return send(res, 413, { error: "bad request" }, origin);
		}
	}
	return send(res, 404, { error: "not found" }, origin);
});

if (require.main === module) {
	server.listen(PORT, () => console.log(`Tiny Wars server on :${PORT} (${db.week})`));
	const stop = () => {
		try {
			fs.writeFileSync(DATA_FILE, JSON.stringify(db));
		} catch (error) {
			// ignore
		}
		process.exit(0);
	};
	process.on("SIGTERM", stop);
	process.on("SIGINT", stop);
}

module.exports = { server, weekKey };
