// All homepage and contact copy lives here. Edit text freely; layout reads
// from this file. Fields set to null are simply not shown.

export const SITE = {
	name: "Edwin Anajemba",
	role: "Product Team Lead",
	company: "JointEarn",

	hero: {
		headline: "Software product engineer.",
		lead: "I lead the product team at JointEarn and build the web platforms and cloud infrastructure behind products, from payments to Web3.",
	},

	// Lines in the hero's API-response panel: [key, value]
	response: [
		["role", "Product Team Lead"],
		["company", "JointEarn"],
		["focus", "web + infrastructure"],
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
				text: "I take a product from scope to production: the architecture, the team, delivery, and the infrastructure it runs on.",
				included: [
					"Product scope and roadmap",
					"Architecture and technical direction",
					"Sprint planning and weekly demos",
					"Handover and documentation",
				],
			},
			{
				title: "Web platforms and APIs",
				text: "React and Next.js frontends with Node.js/TypeScript and Python backends on PostgreSQL.",
				included: [
					"Web apps in React and Next.js",
					"REST API design and build",
					"Database schema and migrations",
					"Third-party integrations and webhooks",
				],
			},
			{
				title: "Cloud and infrastructure",
				text: "AWS, Docker, and CI/CD pipelines that make releases routine and production observable.",
				included: [
					"AWS deployments: App Runner, ECR, S3, RDS, SES",
					"Docker and GitHub Actions pipelines",
					"Monitoring for latency and reliability",
					"Environment setup and migration plans",
				],
			},
			{
				title: "Payments, Web3, and AI",
				text: "Checkout and payment flows, Solidity contracts on Polygon, and Claude-powered features.",
				included: [
					"Payment provider integration and webhook retries",
					"Smart contracts integrated with your Web2 backend",
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
				link: { url: "https://www.jointearn.com", label: "jointearn.com" },
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
				link: { url: "https://netzence.com/closecarbon/", label: "netzence.com/closecarbon" },
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
				name: "Eyemark",
				tag: "Nigeria's federal project-tracking platform. Client project, live.",
				role: "Worked on the platform's web app, which lets citizens follow government projects and report progress.",
				outcome: null,
				link: { url: "https://www.eyemark.ng", label: "eyemark.ng" },
			},
			{
				name: "GirlLEAD Talent Accelerator",
				tag: "Non-profit, volunteer. 2025 to now. Live.",
				role: "Designed the backend architecture for internal platforms. Wrote the product requirements, engineering guidelines, and infrastructure migration plan, and mentor junior developers.",
				outcome: null,
				link: { url: "https://thegirlleadproject.org", label: "thegirlleadproject.org" },
			},
		],
	},

	diagram: {
		title: "How I build",
		lede: "Every project starts as a diagram like this one.",
	},

	leadership: {
		title: "How I lead",
		text: "I lead engineering at JointEarn: architecture, code review, delivery, and the production platform the team ships on. I came up through backend work, so I make product and infrastructure decisions together: what we build, how it is deployed, and how it stays up.",
		principles: [
			"Own the architecture, and write the decisions down.",
			"Ship in small steps that are easy to roll back.",
			"Treat deployment and monitoring as part of the feature.",
		],
	},

	about: {
		title: "About me",
		text: [
			"I'm a product team lead and engineer with 5+ years of experience building web platforms and the cloud infrastructure behind them, across payments, e-commerce, and Web3.",
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

	// Add real quotes as { quote, name, role }. The "Kind words" section only
	// appears when this list has entries.
	testimonials: [],

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
