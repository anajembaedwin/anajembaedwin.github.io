// English UI strings. The page copy itself lives in src/data/site.js.
// Placeholders like {name} are filled in by the components.
const en = {
	label: "EN",
	name: "English",
	ui: {
		langLabel: "Language",
		skip: "Skip to content",
		nav: {
			label: "Main",
			services: "Services",
			work: "Work",
			products: "Products",
			about: "About",
			contact: "Contact",
		},
		footerSub:
			"Product team lead. Web and infrastructure engineer, based in Africa.",
		footerLinks: { github: "GitHub", linkedin: "LinkedIn", email: "Email" },
		hire: "Hire me",
		seeProducts: "See my products",
		proofLabel: "Where I've worked",
		marquee: "Technologies I work with",
		respLabel: "Profile summary",
		step: "Step",
		whatIDid: "What I did",
		outcome: "Outcome",
		codeSamples: "Code samples are on {projects} and {github}.",
		projectsLink: "the projects page",
		productsTitle: "Products I build",
		allProducts: "All products",
		viewProduct: "View {name}",
		education: "Education.",
		certifications: "Certifications.",
		contactAlt: "Prefer to write directly? {email} or {linkedin}.",
		kindWords: "Kind words",
		reactTo: "React to this",
		react: "react",
		avatarLabel: "Edwin's cartoon portrait. Press to hear him say something.",
		avatarTitle:
			"Cartoon portrait of Edwin Anajemba: short hair, full beard, black-framed glasses and a patterned shirt.",
		quips: [
			"It works on my machine.",
			"Have you tried turning it off and on again?",
			"Ship it.",
			"I read the logs so you don't have to.",
			"Always have a rollback plan.",
			"Let's build something.",
			"Production is just staging with users.",
		],
		diagramTitle:
			"A client calls an API. The API uses a queue and a Postgres database, and both connect to Polygon.",
		status: { live: "Live", beta: "Beta", building: "Building" },
		form: {
			name: "Name",
			email: "Email",
			emailPlaceholder: "name@company.com",
			type: "What do you need?",
			message: "Message",
			messagePlaceholder:
				"What you're building, your timeline, and your budget range",
			errName: "Enter your name.",
			errEmail: "Enter your email address.",
			errEmailInvalid: "Enter a valid email address, like name@company.com.",
			errMessage: "Tell me a little about what you need.",
			send: "Send message",
			sending: "Sending…",
			sentTitle: "Message sent",
			sentBody: "Thanks, {name}. I'll reply to {email}.",
			mailtoNote:
				"Your email app should open with the message filled in. If it didn't, email {email}.",
			failed: "That didn't send. Email me at {email} instead.",
			subject: "{type}: message from {name}",
		},
		productsPage: {
			title: "Products I build",
			lead: "Each product stands on its own. Open one to see what it does, who it's for, and where it is today.",
			empty: "Products will appear here as they launch. {link} to hear first.",
			getInTouch: "Get in touch",
			metaDesc:
				"Software products built by Edwin Anajemba, with their status and links.",
		},
		productDetail: {
			openProduct: "Open product",
			getNotified: "Get notified",
			askQuestion: "Ask a question",
			whoFor: "Who it's for",
			whatItDoes: "What it does",
			screenshot: "{name} screenshot",
		},
		projectsPage: {
			tab: "Code",
			title: "Code on GitHub",
			lead: "Open-source projects: booking platforms, e-commerce backends, and tools.",
			viewCode: "View code",
			metaDesc:
				"Open-source projects by Edwin Anajemba: booking platforms, e-commerce backends, and productivity tools.",
		},
		contactPage: {
			tab: "Contact",
			metaDesc:
				"Get in touch with Edwin Anajemba about freelance projects, product leadership, or collaborations.",
			aboutProduct: "About {name}",
			productLead: "Leave your details and I'll let you know how it's going.",
			alt: "You can also write directly: {email}",
			productMessage: "I'd like to hear about {name}.",
		},
		notFound: {
			tab: "Page not found",
			title: "Page not found",
			lead: "That page doesn't exist or has moved.",
			back: "Back to home",
		},
	},
};

export default en;
