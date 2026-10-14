// Runs after `react-scripts build` (npm "postbuild"). GitHub Pages only has
// one real page, so shared links to /about, /products and so on would all show
// the homepage preview, or none at all. This writes a copy of index.html for
// every route with that page's own title, description and share tags. The copy
// loads the same app, so the site behaves exactly the same once it opens.
// It never fails the build: on any problem it just leaves the build as it was.

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const BUILD = path.join(ROOT, "build");
const SITE = "https://anajembaedwin.github.io";

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

const products = [];
try {
	const src = fs.readFileSync(path.join(ROOT, "src/data/products.js"), "utf8");
	const re = /slug:\s*"([^"]+)"[\s\S]*?name:\s*"([^"]+)"[\s\S]*?pitch:\s*"([^"]+)"/g;
	let m;
	while ((m = re.exec(src))) products.push({ slug: m[1], name: m[2], pitch: m[3] });
} catch (error) {
	// products are optional
}

const NAME = "Edwin Anajemba";
const pages = [
	["about", "About", "Product engineer and team lead with 5+ years building web platforms and the cloud infrastructure behind them."],
	["products", "Products", "Products built and in progress. Each one stands on its own."],
	["games", "Games", "Online games by Edwin Anajemba. Tiny Wars and Daily Bug Hunt are playable, with more on the way."],
	["games/tiny-wars", "Tiny Wars village", "The Tiny Wars village: meet the tiny people and the characters of the game."],
	["games/tiny-wars/play", "Play Tiny Wars", "A three-minute castle battle. Pick a side and fight in the weekly war."],
	["games/daily-bug-hunt/play", "Daily Bug Hunt", "One developer puzzle a day, the same for everyone. Find the bug with Pip's lantern."],
	["projects", "Projects", "Open source projects: booking platforms, e-commerce backends and tools."],
	["contact", "Contact", "Get in touch about freelance projects, product leadership or collaborations."],
	...products.map((p) => [`products/${p.slug}`, p.name, p.pitch]),
];

const setMeta = (html, attr, key, value) => {
	const re = new RegExp(`(<meta\\s+${attr}="${key}"\\s+content=")[^"]*(")`);
	return re.test(html) ? html.replace(re, `$1${esc(value)}$2`) : html;
};

try {
	const base = fs.readFileSync(path.join(BUILD, "index.html"), "utf8");
	let made = 0;
	pages.forEach(([route, title, desc]) => {
		const url = `${SITE}/${route}`;
		const full = `${title} | ${NAME}`;
		let html = base;
		html = html.replace(/<title>[^<]*<\/title>/, `<title>${esc(full)}</title>`);
		html = html.replace(/(<link\s+rel="canonical"\s+href=")[^"]*(")/, `$1${url}$2`);
		html = setMeta(html, "name", "description", desc);
		html = setMeta(html, "property", "og:title", full);
		html = setMeta(html, "property", "og:description", desc);
		html = setMeta(html, "property", "og:url", url);
		html = setMeta(html, "name", "twitter:title", full);
		html = setMeta(html, "name", "twitter:description", desc);
		const dir = path.join(BUILD, route);
		fs.mkdirSync(dir, { recursive: true });
		fs.writeFileSync(path.join(dir, "index.html"), html);
		made += 1;
	});
	console.log(`prerender: wrote ${made} page(s)`);
} catch (error) {
	console.warn("prerender skipped:", error.message);
}
