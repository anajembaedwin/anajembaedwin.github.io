// Games shown on /games. Text lives in the i18n files under ui.gamesPage.items,
// keyed by slug.
//
// status: "building" | "soon" | "live"
// tag:    key into ui.gamesPage.tags
// tone:   two colours for the card art
// play:   set a route (for example "/play/tiny-wars") once a game can be played

const GAMES = [
	{ slug: "tiny-wars", emoji: "⚔️", status: "beta", tag: "realtime", tone: ["#6b4cff", "#ff5c7a"], play: "/games/tiny-wars/play" },
	{ slug: "daily-bug-hunt", emoji: "🐛", status: "beta", tag: "daily", tone: ["#3fe0b5", "#4d8cff"], play: "/games/daily-bug-hunt/play" },
	{ slug: "deploy-rush", emoji: "🏎️", status: "live", tag: "racing", tone: ["#ff5c7a", "#ffb84d"], play: "/games/deploy-rush/play" },
	{ slug: "code-race", emoji: "⌨️", status: "soon", tag: "realtime", tone: ["#4d8cff", "#6b4cff"], play: "" },
	{ slug: "tiny-kingdom", emoji: "🏰", status: "soon", tag: "solo", tone: ["#ffb84d", "#ff5c7a"], play: "" },
	{ slug: "pixel-canvas", emoji: "🎨", status: "soon", tag: "canvas", tone: ["#ff5c7a", "#ffb84d"], play: "" },
	{ slug: "quiz-night", emoji: "🎤", status: "soon", tag: "live", tone: ["#2fd9a4", "#ffb84d"], play: "" },
];

export default GAMES;
