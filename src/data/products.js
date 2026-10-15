// Products shown on /products and /products/<slug>.
//
// status: "live" | "beta" | "building"
// url:    the live product link. Leave "" if there isn't one yet; the page
//         then offers "Get notified" instead of "Open product".
// Optional fields (shown only when filled in): audience, highlights, screenshot
// (a path under /public, for example "/products/beezyapply.png").
//
// Each product stands on its own. Do not link products to each other.

import STORE_URL from "./store";

const PRODUCTS = [
	{
		slug: "beezylabs-store",
		name: "BeezyLabs Store",
		status: "beta",
		pitch: "A small store for the software, integrations, templates and scripts I build.",
		audience: "Developers and small teams who want working code they can drop in",
		url: STORE_URL,
		highlights: [
			"Instant downloads with a licence key for each purchase",
			"Checkout by card, naira or USDC",
			"No passwords: sign in with a one-time email link",
		],
		screenshot: "",
	},
	{
		slug: "beezyapply",
		name: "BeezyApply",
		status: "building",
		pitch: "AI-powered CV optimization for Nigerian job seekers.",
		audience: "Job seekers in Nigeria",
		url: "",
		highlights: [],
		screenshot: "",
	},
];

export const STATUS_LABEL = {
	live: "Live",
	beta: "Beta",
	building: "Building",
};

export default PRODUCTS;
