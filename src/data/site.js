// All homepage and contact copy lives here. Edit text freely; layout reads
// from this file. Fields set to null are simply not shown.

export const SITE = {
	name: "Edwin Anajemba",
	role: "Product Team Lead",
	company: "JointEarn",

	hero: {
		headline: "Product team lead.",
		lead: "I lead a team of developers shipping products, from payments and APIs to Web3, and I build my own on the side.",
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
			text: "Built the e-commerce backend, 2021 to 2024.",
		},
		{
			name: "CloseCarbon",
			text: "Hyperledger contracts tied into a Python backend.",
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
		title: "Experience",
		items: [
			{
				name: "JointEarn",
				tag: "Digital entertainment, social engagement, and e-commerce platform. 2025 to now.",
				role: "Backend engineer, then full stack, now Product Team Lead. I oversee the developers, track progress, and make sure deliverables ship. I still own delivery of the React frontend and the Node.js/TypeScript backend.",
				outcome: "The backend is the system of record for user activity, engagement, and transactions.",
			},
			{
				name: "Maxxed Technical Systems",
				tag: "Enterprise SaaS platform. 2024 to 2025.",
				role: "Built backend services and data access layers in Node.js and Python on PostgreSQL.",
				outcome: "Cut response times by about 25% by optimizing SQL queries and reporting views.",
			},
			{
				name: "CloseCarbon (Netzence)",
				tag: "Carbon emissions verification platform. 2024 to 2025, contract.",
				role: "Built smart contracts on Hyperledger and integrated them with a Python (FastAPI) backend and APIs that take in data from an embedded tracking device.",
				outcome: "Auditable emissions records for an ESG compliance platform.",
			},
			{
				name: "Cruva (formerly UpTk)",
				tag: "E-commerce marketplace. 2024, contract.",
				role: "Built Vue.js buyer and merchant workflows, and deployed backend services on AWS.",
				outcome: "A marketplace with 2,000+ users and about $10,000 in monthly transactions.",
			},
			{
				name: "Palimart",
				tag: "E-commerce retail platform. 2021 to 2024.",
				role: "Backend engineer, then full stack. Built the catalog, order, and payment systems as the platform grew to multi-vendor, then rebuilt the frontend in Next.js.",
				outcome: "APIs serving web and mobile clients with thousands of daily transactions.",
			},
			{
				name: "GirlLEAD Talent Accelerator",
				tag: "Non-profit, volunteer. 2025 to now.",
				role: "Designed the backend architecture for internal platforms. Wrote the product requirements, engineering guidelines, and infrastructure migration plan, and mentor junior developers.",
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
		text: "My background is backend engineering, so I scope products with the technical reality in mind. At JointEarn I now lead the developers building the product: I review their code, track progress against goals, and keep delivery on schedule.",
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
			"I'm based in Africa and work with teams anywhere. Outside my job I run BeezyLabs Technology Solutions, where I build and ship my own software products.",
		],
		skills: [
			{
				group: "Backend",
				items: [
					"Node.js, TypeScript, and NestJS",
					"Python and FastAPI",
					"Java and Spring Boot",
				],
			},
			{ group: "Frontend", items: ["React", "Next.js", "Vue.js"] },
			{ group: "Data", items: ["PostgreSQL", "MongoDB", "MySQL", "Redis"] },
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
			{
				group: "AI",
				items: [
					"Claude API integration",
					"AI-assisted development with Cursor, Claude Code, and GitHub Copilot, with code review and tests on everything it writes",
				],
			},
		],
		education: {
			degree: "BSc Mathematics, Federal University Oye-Ekiti, Nigeria (2013 to 2017)",
			certs: [
				"Python 3 Programming Specialization, University of Michigan",
				"Java Programming and Software Engineering Fundamentals, Duke University",
				"Blockchain, University at Buffalo",
			],
		},
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
