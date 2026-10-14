// Daily Bug Hunt puzzles. Each has code lines and the index of the buggy one.
// "why" explanations live in the i18n files under ui.bugHunt.why[id].

export const PUZZLES = [
	{ id: "offbyone", lang: "js", bug: 1, lines: ["const items = getItems();", "for (let i = 0; i <= items.length; i++) {", "  process(items[i]);", "}", "return items.length;"] },
	{ id: "assign", lang: "js", bug: 1, lines: ["function canDelete(user) {", '  if (user.role = "admin") {', "    return true;", "  }", "  return false;", "}"] },
	{ id: "reduce", lang: "js", bug: 1, lines: ["function total(prices) {", "  return prices.reduce((a, b) => a + b);", "}", "", "total([]); // the cart is empty"] },
	{ id: "foreach", lang: "js", bug: 1, lines: ["async function saveAll(ids) {", "  ids.forEach(async (id) => { await save(id); });", '  console.log("all saved");', "}"] },
	{ id: "alias", lang: "js", bug: 0, lines: ["const copy = original;", "copy.push(4);", "", "// original should stay [1, 2, 3]", "console.log(original);"] },
	{ id: "default", lang: "py", bug: 0, lines: ["def add(item, bag=[]):", "    bag.append(item)", "    return bag", "", "add(1); add(2)  # second call returns [1, 2]"] },
	{ id: "sql", lang: "js", bug: 1, lines: ["app.get('/user', (req, res) => {", '  const q = "SELECT * FROM users WHERE id = " + req.query.id;', "  db.query(q, (err, rows) => res.json(rows));", "});"] },
	{ id: "var", lang: "js", bug: 0, lines: ["for (var i = 0; i < 3; i++) {", "  setTimeout(() => console.log(i), 0);", "}", "// should print 0, 1, 2"] },
];

export const dayKey = (d = new Date()) => {
	const m = String(d.getMonth() + 1).padStart(2, "0");
	const day = String(d.getDate()).padStart(2, "0");
	return `${d.getFullYear()}-${m}-${day}`;
};

// Same five puzzles for everyone on a given day.
export const todays = (d = new Date()) => {
	const n = Math.floor(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / 86400000);
	const start = (n * 3) % PUZZLES.length;
	return Array.from({ length: 5 }, (_, i) => PUZZLES[(start + i * 3) % PUZZLES.length]);
};
