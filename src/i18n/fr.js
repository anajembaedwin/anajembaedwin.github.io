const fr = {
	label: "FR",
	name: "Français",
	ui: {
		langLabel: "Langue",
		skip: "Aller au contenu",
		nav: {
			label: "Principal",
			services: "Services",
			work: "Parcours",
			products: "Produits",
			about: "À propos",
			contact: "Contact",
		},
		footerSub:
			"Responsable d'équipe produit. Ingénieur web et infrastructure, basé en Afrique.",
		footerLinks: { github: "GitHub", linkedin: "LinkedIn", email: "E-mail" },
		hire: "Me recruter",
		seeProducts: "Voir mes produits",
		proofLabel: "Où j'ai travaillé",
		marquee: "Technologies que j'utilise",
		respLabel: "Résumé du profil",
		step: "Étape",
		whatIDid: "Ce que j'ai fait",
		outcome: "Résultat",
		codeSamples: "Des exemples de code sont sur {projects} et {github}.",
		projectsLink: "la page des projets",
		productsTitle: "Les produits que je construis",
		allProducts: "Tous les produits",
		viewProduct: "Voir {name}",
		education: "Formation.",
		certifications: "Certifications.",
		contactAlt: "Vous préférez écrire directement ? {email} ou {linkedin}.",
		kindWords: "Ils en parlent",
		reactTo: "Réagir",
		react: "réagir",
		avatarLabel:
			"Portrait en dessin animé d'Edwin. Appuyez pour l'entendre dire quelque chose.",
		avatarTitle:
			"Portrait en dessin animé d'Edwin Anajemba : cheveux courts, barbe fournie, lunettes à monture noire et chemise à motifs.",
		quips: [
			"Ça marche sur ma machine.",
			"Avez-vous essayé de l'éteindre et de le rallumer ?",
			"On livre.",
			"Je lis les logs pour que vous n'ayez pas à le faire.",
			"Toujours prévoir un plan de retour arrière.",
			"Construisons quelque chose.",
			"La production, c'est juste la préprod avec des utilisateurs.",
		],
		diagramTitle:
			"Un client appelle une API. L'API utilise une file d'attente et une base Postgres, et les deux se connectent à Polygon.",
		status: { live: "En ligne", beta: "Bêta", building: "En construction" },
		form: {
			name: "Nom",
			email: "E-mail",
			emailPlaceholder: "nom@entreprise.com",
			type: "De quoi avez-vous besoin ?",
			message: "Message",
			messagePlaceholder:
				"Ce que vous construisez, votre calendrier et votre budget",
			errName: "Indiquez votre nom.",
			errEmail: "Indiquez votre adresse e-mail.",
			errEmailInvalid:
				"Indiquez une adresse e-mail valide, comme nom@entreprise.com.",
			errMessage: "Décrivez-moi brièvement votre besoin.",
			send: "Envoyer le message",
			sending: "Envoi…",
			sentTitle: "Message envoyé",
			sentBody: "Merci, {name}. Je vous répondrai à {email}.",
			mailtoNote:
				"Votre application de messagerie devrait s'ouvrir avec le message prérempli. Sinon, écrivez à {email}.",
			failed: "L'envoi a échoué. Écrivez-moi plutôt à {email}.",
			subject: "{type} : message de {name}",
		},
		productsPage: {
			title: "Les produits que je construis",
			lead: "Chaque produit est indépendant. Ouvrez-en un pour voir ce qu'il fait, à qui il s'adresse et où il en est.",
			empty:
				"Les produits apparaîtront ici à leur lancement. {link} pour être prévenu en premier.",
			getInTouch: "Contactez-moi",
			metaDesc:
				"Produits logiciels créés par Edwin Anajemba, avec leur statut et leurs liens.",
		},
		productDetail: {
			openProduct: "Ouvrir le produit",
			getNotified: "Être prévenu",
			askQuestion: "Poser une question",
			whoFor: "Pour qui",
			whatItDoes: "Ce qu'il fait",
			screenshot: "Capture d'écran de {name}",
		},
		projectsPage: {
			tab: "Code",
			title: "Code sur GitHub",
			lead: "Projets open source : plateformes de réservation, backends e-commerce et outils.",
			viewCode: "Voir le code",
			metaDesc:
				"Projets open source d'Edwin Anajemba : plateformes de réservation, backends e-commerce et outils de productivité.",
		},
		contactPage: {
			tab: "Contact",
			metaDesc:
				"Contactez Edwin Anajemba pour des missions freelance, du pilotage produit ou des collaborations.",
			aboutProduct: "À propos de {name}",
			productLead:
				"Laissez vos coordonnées et je vous tiendrai au courant de l'avancement.",
			alt: "Vous pouvez aussi écrire directement : {email}",
			productMessage: "J'aimerais avoir des nouvelles de {name}.",
		},
		notFound: {
			tab: "Page introuvable",
			title: "Page introuvable",
			lead: "Cette page n'existe pas ou a été déplacée.",
			back: "Retour à l'accueil",
		},
	},
	site: {
		hero: {
			headline: "Responsable d'équipe produit.",
			lead: "Je dirige des équipes d'ingénieurs et je construis les plateformes web et l'infrastructure cloud derrière les produits, des paiements au Web3.",
		},
		response: [
			["role", "Responsable d'équipe produit"],
			["company", "JointEarn"],
			["focus", "web + infrastructure"],
			["experience", "5+ ans"],
			["open_to", "freelance"],
		],
		proof: [
			{ text: "A construit le backend e-commerce, de 2021 à 2024." },
			{ text: "Contrats Hyperledger reliés à un backend Python." },
			{ text: "Dirige l'équipe produit depuis octobre 2026." },
		],
		services: {
			title: "Ce que je peux faire pour vous",
			lede: "Choisissez-en un, ou combinez-les. Ouvrez un service pour voir ce qu'il comprend.",
			items: [
				{
					title: "Piloter la construction d'un produit",
					text: "Je mène un produit de la définition à la production : l'architecture, l'équipe, la livraison et l'infrastructure sur laquelle il tourne.",
					included: [
						"Périmètre produit et feuille de route",
						"Architecture et direction technique",
						"Planification des sprints et démos hebdomadaires",
						"Transmission et documentation",
					],
				},
				{
					title: "Plateformes web et API",
					text: "Des frontends React et Next.js avec des backends Node.js/TypeScript et Python sur PostgreSQL.",
					included: [
						"Applications web en React et Next.js",
						"Conception et développement d'API REST",
						"Schéma de base de données et migrations",
						"Intégrations tierces et webhooks",
					],
				},
				{
					title: "Cloud et infrastructure",
					text: "AWS, Docker et pipelines CI/CD qui rendent les mises en production routinières et la production observable.",
					included: [
						"Déploiements AWS : App Runner, ECR, S3, RDS, SES",
						"Pipelines Docker et GitHub Actions",
						"Supervision de la latence et de la fiabilité",
						"Mise en place des environnements et plans de migration",
					],
				},
				{
					title: "Paiements, Web3 et IA",
					text: "Parcours de paiement, contrats Solidity sur Polygon et fonctionnalités propulsées par Claude.",
					included: [
						"Intégration de prestataires de paiement et relance des webhooks",
						"Contrats intelligents intégrés à votre backend Web2",
						"Fonctionnalités LLM basées sur l'API Claude",
					],
				},
			],
		},
		process: {
			title: "Comment nous travaillons ensemble",
			steps: [
				{ title: "Cadrer", text: "Nous définissons l'objectif et ce que « terminé » veut dire." },
				{ title: "Construire", text: "Des démos chaque semaine, pour éviter les mauvaises surprises." },
				{ title: "Livrer", text: "Déployer, superviser et transmettre." },
				{ title: "Accompagner", text: "Corrections et itération suivante." },
			],
		},
		work: {
			title: "Parcours",
			items: [
				{
					tag: "Plateforme de divertissement numérique, d'engagement social et d'e-commerce. De 2025 à aujourd'hui.",
					role: "Ingénieur backend, puis full stack, aujourd'hui responsable d'équipe produit. Je supervise les développeurs, suis l'avancement et veille à ce que les livrables sortent. Je reste responsable de la livraison du frontend React et du backend Node.js/TypeScript.",
					outcome: "Le backend est la référence pour l'activité des utilisateurs, l'engagement et les transactions.",
				},
				{
					tag: "Plateforme SaaS d'entreprise. 2024 à 2025.",
					role: "A construit des services backend et des couches d'accès aux données en Node.js et Python sur PostgreSQL.",
					outcome: "Temps de réponse réduits d'environ 25 % grâce à l'optimisation des requêtes SQL et des vues de reporting.",
				},
				{
					tag: "Plateforme de vérification des émissions de carbone. 2024 à 2025, mission freelance.",
					role: "A développé des contrats intelligents sur Hyperledger et les a intégrés à un backend Python (FastAPI) et à des API qui reçoivent les données d'un dispositif de suivi embarqué.",
					outcome: "Des relevés d'émissions auditables pour une plateforme de conformité ESG.",
				},
				{
					name: "Cruva (anciennement UpTk)",
					tag: "Place de marché e-commerce. 2024, mission freelance.",
					role: "A développé les parcours acheteur et vendeur en Vue.js et déployé les services backend sur AWS.",
					outcome: "Une place de marché de plus de 2 000 utilisateurs et environ 10 000 $ de transactions par mois.",
				},
				{
					tag: "Plateforme de vente en ligne. 2021 à 2024.",
					role: "Ingénieur backend, puis full stack. A construit les systèmes de catalogue, de commandes et de paiement pendant le passage à une marketplace multi-vendeurs, puis a reconstruit le frontend en Next.js.",
					outcome: "Des API au service des clients web et mobiles, avec des milliers de transactions par jour.",
				},
				{
					tag: "Plateforme fédérale nigériane de suivi de projets. Projet client, en ligne.",
					role: "A travaillé sur l'application web de la plateforme, qui permet aux citoyens de suivre les projets publics et de signaler leur avancement.",
				},
				{
					tag: "Association, bénévolat. De 2025 à aujourd'hui. En ligne.",
					role: "A conçu l'architecture backend des plateformes internes. A rédigé le cahier des charges produit, les règles d'ingénierie et le plan de migration d'infrastructure, et accompagne des développeurs juniors.",
				},
			],
		},
		diagram: {
			title: "Ma façon de construire",
			lede: "Chaque projet commence par un schéma comme celui-ci.",
		},
		leadership: {
			title: "Ma façon de diriger",
			text: "Je dirige l'ingénierie chez JointEarn : architecture, revue de code, livraison et plateforme de production sur laquelle l'équipe livre. Je viens du backend, donc je prends les décisions produit et infrastructure ensemble : ce que nous construisons, comment c'est déployé et comment ça reste en ligne.",
			principles: [
				"Maîtriser l'architecture et consigner les décisions par écrit.",
				"Livrer par petites étapes faciles à annuler.",
				"Considérer le déploiement et la supervision comme une partie de la fonctionnalité.",
			],
		},
		about: {
			title: "À propos de moi",
			text: [
				"Je suis responsable d'équipe produit et ingénieur, avec plus de 5 ans d'expérience dans la création de plateformes web et de l'infrastructure cloud qui les soutient, dans les paiements, l'e-commerce et le Web3.",
				"Je suis basé en Afrique et je travaille avec des équipes partout dans le monde. En dehors de mon travail, je dirige BeezyLabs Technology Solutions, où je construis et lance mes propres produits logiciels.",
			],
			skills: [
				{ group: "Backend" },
				{ group: "Frontend" },
				{ group: "Données" },
				{ group: "Cloud" },
				{ group: "Web3" },
				{
					group: "IA",
					items: [
						"Intégration de l'API Claude",
						"Développement assisté par IA avec Cursor, Claude Code et GitHub Copilot, avec revue de code et tests sur tout ce qu'il produit",
					],
				},
			],
			education: {
				degree: "Licence en mathématiques, Federal University Oye-Ekiti, Nigéria (2013 à 2017)",
				certs: [
					"Spécialisation Programmation Python 3, Université du Michigan",
					"Fondamentaux de la programmation Java et du génie logiciel, Université Duke",
					"Blockchain, Université de Buffalo",
				],
			},
		},
		contact: {
			title: "Un projet à construire ?",
			lede: "Dites-moi de quoi il s'agit, votre calendrier et votre budget.",
			collabTypes: [
				"Mission freelance",
				"Responsable produit à louer",
				"Contrats intelligents et Web3",
				"Mentorat",
				"Autre chose",
			],
		},
	},
	products: {
		beezyapply: {
			pitch: "Optimisation de CV par IA pour les chercheurs d'emploi au Nigéria.",
			audience: "Chercheurs d'emploi au Nigéria",
		},
	},
	projects: [
		"Parcours de réservation destiné aux clients de Buz and Socials, pour réserver directement en ligne.",
		"Tableau de bord d'administration des réservations d'hôtel, conçu pour l'équipe de Buz and Socials.",
		"API qui alimente le tableau de bord des réservations d'hôtel.",
		"Smartworka : un outil de productivité pour gérer un projet du lancement à la livraison.",
		"Vitrine e-commerce construite sur le framework Medusa.",
		"Une API REST développée avec Go et Gin pour Vintage Jazz Records.",
		"Backend d'API REST pour Palimart Cosmetics, une partie de la plateforme e-commerce dont j'ai géré le backend pendant trois ans.",
		"Un backend pour une agence de voyages, construit avec Python, Django et PostgreSQL.",
	],
};

export default fr;
