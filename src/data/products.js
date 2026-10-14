// Products shown on /products and /products/<slug>.
//
// status: "live" | "beta" | "building"
// url:    the live product link. Leave "" if there isn't one yet; the page
//         then offers "Get notified" instead of "Open product".
// Optional fields (shown only when filled in): audience, highlights, screenshot
// (a path under /public, for example "/products/beezyapply.png").
//
// Each product stands on its own. Do not link products to each other.

const PRODUCTS = [
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
