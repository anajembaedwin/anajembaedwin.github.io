// All homepage and contact copy lives here. Edit text freely; layout reads
// from this file. Fields set to null are simply not shown.

export const SITE = {
	name: "Edwin Anajemba",
	role: "Product Team Lead",
	company: "JointEarn",

	hero: {
		headline: "Product team lead.",
		lead: "I lead teams that ship products, from payments and APIs to Web3, and I build my own on the side.",
	},

	// Lines in the hero's API-response panel: [key, value]
	response: [
		["role", "Product Team Lead"],
		["company", "JointEarn"],
		["experience", "5+ years"],
		["open_to", "freelance"],
	],

	proof: [
		{
			name: "Palimart",
			text: "Owned the e-commerce backend for three years.",
		},
		{
			name: "CloseCarbon",
			text: "Smart contracts tied into a Web2 backend.",
		},
		{
			name: "JointEarn",
			text: "Leading the product team since October 2026.",
		},
	],

	services: {
		title: "What I can do for you",
		lede: "Pick one, or combine them. Open a service to see what's included.",
		items: [
			{
				title: "Lead a product build",
				text: "I run the work end to end: scope, roadmap, delivery, and the team doing it.",
				included: [
					"Product scope and roadmap",
					"Sprint planning and weekly demos",
					"Hands-on technical direction",
					"Handover and documentation",
				],
			},
			{
				title: "APIs and backends",
				text: "TypeScript/NestJS and Python/FastAPI services on PostgreSQL, Redis, and AWS.",
				included: [
					"REST API design and build",
					"Database schema and migrations",
					"Docker and CI/CD with GitHub Actions",
					"Deployment to AWS",
				],
			},
			{
				title: "Payments and e-commerce",
				text: "Checkout, wallets, and order flows for products that handle real money.",
				included: [
					"Payment provider integration",
					"Order and inventory flows",
					"Webhooks and retry handling",
				],
			},
			{
				title: "Web3 and AI features",
				text: "Solidity contracts on Polygon, and Claude-powered features inside your product.",
				included: [
					"Smart contract development",
					"Contract integration with your Web2 backend",
					"LLM features built on the Claude API",
				],
			},
		],
	},

	process: {
		title: "How we work together",
		steps: [
			{ title: "Scope", text: "We agree the goal and what done means." },
			{ title: "Build", text: "Weekly demos, so there are no surprises." },
			{ title: "Ship", text: "Deploy, monitor, and hand over." },
			{ title: "Support", text: "Fixes and the next iteration." },
		],
	},

	work: {
		title: "Selected work",
		items: [
			{
				name: "Palimart",
				tag: "C2C and B2C e-commerce",
				role: "Backend owner for three years",
				outcome: null,
			},
			{
				name: "CloseCarbon",
				tag: "Carbon emissions tracking",
				role: "Built the smart contracts and integrated them with the backend and APIs",
				outcome: null,
			},
			{
				name: "JointEarn",
				tag: "Product team",
				role: "Product Team Lead since October 2026",
				outcome: null,
			},
		],
	},

	diagram: {
		title: "How I build",
		lede: "Every project starts as a diagram like this one.",
	},

	leadership: {
		title: "How I lead",
		text: "My background is backend engineering, so I scope products with the technical reality in mind. Now I lead the product and the people building it.",
		principles: [
			"Start from the user's problem, not the feature list.",
			"Ship small and show progress every week.",
			"Write decisions down so the team never waits on me.",
		],
	},

	about: {
		title: "About me",
		text: [
			"I'm a product team lead and engineer with 5+ years of experience building payments, e-commerce, and Web3 systems.",
			"I'm based in Lagos and work with teams anywhere. Outside my job I run BeezyLabs Technology Solutions, where I build and ship my own software products.",
		],
		skills: [
			{
				group: "Backend",
				items: ["TypeScript and NestJS", "Python and FastAPI"],
			},
			{ group: "Data", items: ["PostgreSQL", "Redis"] },
			{
				group: "Cloud",
				items: [
					"AWS: App Runner, ECR, S3, RDS, SES",
					"Docker",
					"GitHub Actions",
				],
			},
			{
				group: "Web3",
				items: ["Solidity on Polygon", "Hyperledger"],
			},
			{ group: "AI", items: ["Claude API integration"] },
		],
	},

	// Set to { quote, name, role } to show a testimonial; null hides it.
	testimonial: null,

	contact: {
		title: "Have something to build?",
		lede: "Tell me what it is, your timeline, and your budget range.",
		collabTypes: [
			"Freelance build",
			"Product lead for hire",
			"Smart contracts and Web3",
			"Mentoring",
			"Something else",
		],
		// Set to [{ channel: "Email", time: "within 2 business days" }, ...]
		// to show how fast you reply; null hides it.
		responseTimes: null,
	},
};

export default SITE;
