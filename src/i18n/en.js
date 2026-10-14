// English UI strings. The page copy itself lives in src/data/site.js.
// Placeholders like {name} are filled in by the components.
const en = {
	label: "EN",
	name: "English",
	ui: {
		langLabel: "Language",
		menu: "Menu",
		reset: "Reset the world",
		worldReset: "World reset",
		dragHint: "Psst… try dragging the cards",
		dragHintTouch: "Psst… press and hold a card to move it",
		skip: "Skip to content",
		nav: {
			label: "Main",
			services: "Services",
			work: "Work",
			products: "Products",
			games: "Games",
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
		tiny: {
		 "label": "Tiny people",
		 "scoreLabel": "Tiny people by side, and the fallen",
		 "fallen": "Fallen",
		 "hint": "Tiny people live here. Tap one to give them a character… or end them. Drag a card to block their way.",
		 "joined": "{name} the {role} joined the story.",
		 "fellNamed": "{name} the {role} has fallen. 🪦",
		 "fell": "A tiny {side} person fell. 🪦",
		 "squashed": "A tiny {side} person was squashed by a card. 🪦",
		 "war": "War! {a} against {b} ⚔️",
		 "roles": [
		  "Knight",
		  "Wizard",
		  "Baker",
		  "Builder",
		  "Farmer",
		  "Bard",
		  "Merchant",
		  "Archer"
		 ],
		 "sides": {
		  "red": "red",
		  "blue": "blue",
		  "green": "green"
		 },
		 "lines": [
		  "Not now, I'm busy!",
		  "For the realm!",
		  "Mind the cards!",
		  "Is that a deploy?",
		  "I need a coffee.",
		  "Have you tried turning it off and on again?"
		 ]
		},
		term: {
		 "title": "edwin@portfolio: ~",
		 "hint": "Type help to see what I can do.",
		 "placeholder": "type a command…",
		 "label": "Terminal command",
		 "helpTitle": "Available commands:",
		 "none": "Nothing here yet.",
		 "form": "Open the contact form",
		 "projects": "Open the projects page",
		 "catUsage": "usage: cat <file>  (try ls)",
		 "noFile": "cat: {f}: no such file",
		 "openUsage": "usage: open services | work | about | contact | products | projects",
		 "opening": "opening {x}…",
		 "langUsage": "usage: lang <{l}>",
		 "langSet": "language set to {l}",
		 "sudo": "Nice try. Edwin is not in the sudoers file. This incident will be reported.",
		 "rm": "Permission denied. I like my files.",
		 "exit": "There is no escape, only /contact.",
		 "notFound": "command not found: {cmd}. Type help.",
		 "matrix": {
		  "wake": "Wake up, Neo...",
		  "follow": "The Matrix has you...",
		  "rabbit": "Follow the white rabbit.",
		  "inside": "You're inside. Try: theme red | blue | violet | amber | green. Type exit (or press Esc) to take the blue pill.",
		  "out": "You took the blue pill. The story ends. You wake up and believe whatever you want to believe.",
		  "already": "You're already inside.",
		  "hint": "Wake up, Neo... The Matrix has you. Try: red pill",
		  "themeSet": "Rain set to {c}.",
		  "themeUsage": "usage: theme <{c}>",
		  "exitLabel": "Take the blue pill (Esc)"
		 },
		 "cmds": {
		  "help": "show this list",
		  "whoami": "who I am",
		  "about": "a short bio",
		  "skills": "my stack",
		  "experience": "where I've worked",
		  "products": "what I'm building",
		  "projects": "open source work",
		  "contact": "how to reach me",
		  "links": "GitHub, LinkedIn, email",
		  "ls": "list files",
		  "cat": "read a file, e.g. cat about.md",
		  "open": "jump to a section, e.g. open work",
		  "lang": "switch language, e.g. lang fr",
		  "curl": "print the API response again",
		  "clear": "clear the screen"
		 }
		},
		ask: {
			title: "Ask me anything",
			idle: "Pick a question, or type your own.",
			placeholder: "Type a question…",
			send: "Ask",
			cta: "Contact me",
			fallback: "Good question, and I don't have a ready answer. Send me a message and I'll reply properly.",
			items: [
			{ q: "What do you do?", a: "I'm the Product Team Lead at JointEarn. I lead the developers, review code, and own the web platform and the infrastructure it ships on.", emoji: "🚀", keys: ["do", "work", "job", "role", "lead"] },
			{ q: "What's your stack?", a: "TypeScript with NestJS, Python with FastAPI, React and Next.js, PostgreSQL, and AWS with Docker and GitHub Actions. I also write Solidity on Polygon.", emoji: "🛠️", keys: ["stack", "tech", "skill", "language", "tools", "use"] },
			{ q: "Where are you based?", a: "In Africa, working with teams anywhere.", emoji: "🌍", keys: ["where", "based", "live", "location", "country", "timezone"] },
			{ q: "How do you lead?", a: "I write architecture decisions down, ship in small steps that are easy to roll back, and treat deployment and monitoring as part of the feature.", emoji: "🧭", keys: ["lead", "manage", "team", "style"] },
			{ q: "What else are you building?", a: "Outside my job I run BeezyLabs Technology Solutions and build my own software products. Have a look at the Products page.", emoji: "🧪", keys: ["building", "product", "side", "project", "beezy"] },
			{ q: "Are you available?", a: "I'm open to freelance work. Tell me what it is, your timeline, and your budget range.", emoji: "📬", keys: ["available", "hire", "freelance", "contact", "reach", "email", "work", "with"], cta: true },
			{ q: "Fun fact?", a: "I studied Mathematics before moving into software. That's probably why I like tests and clean rollbacks.", emoji: "🎲", keys: ["fun", "fact", "study", "degree", "math", "education", "hobby"] },
			{ q: "How experienced are you?", a: "5+ years building web platforms and the cloud infrastructure behind them, across payments, e-commerce, and Web3.", emoji: "📈", keys: ["experience", "experienced", "years", "long", "senior", "old", "since", "career"] },
			{ q: "How do we work together?", a: "We agree the goal and what done means. I build with weekly demos so there are no surprises, then we deploy, monitor, and hand over.", emoji: "🤝", keys: ["together", "process", "start", "timeline", "method", "demo", "steps"] },
			],
		},
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
		status: { live: "Live", beta: "Beta", building: "Building", soon: "Coming soon" },
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
		playPage: {
		 "title": "Tiny Wars",
		 "lead": "Defend your castle and break theirs. Three minutes a battle, and every battle adds glory to your side.",
		 "metaDesc": "Play Tiny Wars: a three-minute castle battle. Pick a side and fight in the weekly war.",
		 "canvasLabel": "The battlefield: your castle on the left, the enemy castle on the right, with tiny troops marching between them.",
		 "quit": "Leave battle",
		 "lobby": {
		  "nameLabel": "Your name",
		  "namePlaceholder": "Tiny Commander",
		  "sideLabel": "Pick your side",
		  "diffLabel": "Difficulty",
		  "diff": {
		   "easy": "Easy",
		   "normal": "Normal",
		   "hard": "Hard"
		  },
		  "start": "Start battle"
		 },
		 "how": {
		  "title": "How to play",
		  "steps": [
		   "Spend gold on troops. Your gold grows by itself.",
		   "Knights beat wizards and bakers up close, archers shoot knights from afar, wizards crush crowds, and bakers heal the army.",
		   "Blow the war horn to rush your army forward. Break their castle, or have the stronger one when time runs out."
		  ],
		  "keys": "Keys: 1 to 4 send troops, H blows the horn."
		 },
		 "hud": {
		  "gold": "Gold",
		  "horn": "War horn",
		  "time": "Time left",
		  "you": "You",
		  "enemy": "Enemy",
		  "ready": "Ready"
		 },
		 "units": {
		  "knight": "Knight",
		  "archer": "Archer",
		  "wizard": "Wizard",
		  "baker": "Baker"
		 },
		 "result": {
		  "win": "Victory!",
		  "lose": "Defeat",
		  "draw": "A draw",
		  "glory": "Glory earned: {n}",
		  "kills": "Enemy troops beaten: {n}",
		  "castle": "Your castle stands at {n}%",
		  "time": "Battle length: {n} seconds",
		  "offline": "Practice mode: your glory is saved on this device. It joins the shared war once the war server is switched on.",
		  "sending": "Adding your glory to the war…",
		  "sent": "Your glory was added to the weekly war.",
		  "failed": "Couldn't reach the war server. Your glory is saved on this device.",
		  "locked": "You're locked to your first side this week, so this glory went to it.",
		  "slow": "Too many battles too fast. This one only counts on this device.",
		  "record": "Your record: {w} wins in {b} battles, {g} glory.",
		  "again": "Fight again",
		  "change": "Change side"
		 },
		 "war": {
		  "title": "The weekly war",
		  "lead": "Every battle adds glory to your side. The board resets every Monday.",
		  "offline": "Practice mode for now: the shared scoreboard appears once the war server is switched on.",
		  "next": "Next: live battles against other players.",
		  "village": "Visit the village",
		  "back": "Back to games"
		 }
		},
		villagePage: {
		 "title": "Tiny Wars: the village",
		 "lead": "This is where the tiny people live. Watch them work, argue and go to war, then meet the cast.",
		 "metaDesc": "The Tiny Wars village: meet the tiny people and the characters of the game.",
		 "stageTitle": "The village",
		 "stageLabel": "A village with houses and trees where tiny people wander.",
		 "stageHint": "Tap a villager to give them a name and a job, or end them. Hiding? Use the chip at bottom left to bring them back.",
		 "castTitle": "The cast",
		 "castLead": "Eight characters live here today. Tap anyone in the village and they might become one of them.",
		 "stats": {
		  "hp": "HP",
		  "power": "Power",
		  "reach": "Reach",
		  "speed": "Speed"
		 },
		 "melee": "Melee",
		 "ranged": "Ranged",
		 "roles": [
		  {
		   "name": "Knight",
		   "blurb": "Tough and steady. Leads the charge when the war horn sounds."
		  },
		  {
		   "name": "Wizard",
		   "blurb": "Zaps enemies from a distance, and is fragile up close."
		  },
		  {
		   "name": "Baker",
		   "blurb": "Up before dawn, and fights with a rolling pin if pushed."
		  },
		  {
		   "name": "Builder",
		   "blurb": "Raises walls and mends roofs. Surprisingly sturdy."
		  },
		  {
		   "name": "Farmer",
		   "blurb": "Keeps the village fed. Not here for a fight."
		  },
		  {
		   "name": "Bard",
		   "blurb": "Quick on their feet, with a song for every occasion."
		  },
		  {
		   "name": "Merchant",
		   "blurb": "Knows the price of everything, including peace."
		  },
		  {
		   "name": "Archer",
		   "blurb": "Keeps their distance and a steady hand."
		  }
		 ],
		 "lockedTitle": "Still to come",
		 "lockedLead": "More characters are on their way. Some are not what you'd expect.",
		 "locked": [
		  "Healer",
		  "Rogue",
		  "Shaman",
		  "Dragon Tamer",
		  "Robot",
		  "Ninja"
		 ],
		 "lockedBadge": "Coming soon",
		 "follow": "Follow progress",
		 "back": "Back to games"
		},
		gamesPage: {
		 "title": "Games",
		 "lead": "Small online games, built one at a time. The first is in the works, and the rest are lined up.",
		 "metaDesc": "Online games by Edwin Anajemba. Tiny Wars is in the works, with more lined up.",
		 "nowTitle": "In the works",
		 "nextTitle": "Lined up next",
		 "notify": "Notify me",
		 "follow": "Follow progress",
		 "peek": "Meet the tiny people",
		 "play": "Play now",
		 "tags": {
		  "realtime": "Realtime",
		  "daily": "Daily",
		  "solo": "Solo + leaderboard",
		  "canvas": "Shared canvas",
		  "live": "Live event"
		 },
		 "items": {
		  "tiny-wars": {
		   "name": "Tiny Wars",
		   "pitch": "One shared world of tiny people. Pick red, blue or green, build a character, and fight the weekly war for your side."
		  },
		  "daily-bug-hunt": {
		   "name": "Daily Bug Hunt",
		   "pitch": "One developer puzzle a day, the same for everyone. Find the bug, keep your streak, share your result."
		  },
		  "code-race": {
		   "name": "Code Race",
		   "pitch": "Race other people live on real code snippets, and climb the ranks."
		  },
		  "tiny-kingdom": {
		   "name": "Tiny Kingdom",
		   "pitch": "Tap to grow a village that keeps earning while you're away. Trade with friends and top the board."
		  },
		  "pixel-canvas": {
		   "name": "Pixel Canvas",
		   "pitch": "One huge canvas, one pixel at a time. Join a team and take territory."
		  },
		  "quiz-night": {
		   "name": "Quiz Night",
		   "pitch": "A live weekly quiz with African and tech rounds, a leaderboard and sponsor-funded prizes."
		  }
		 }
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
