const pt = {
	label: "PT",
	name: "Português",
	ui: {
		langLabel: "Idioma",
		menu: "Menu",
		reset: "Repor o mundo",
		worldReset: "Mundo reposto",
		dragHint: "Psst… experimente arrastar os cartões",
		dragHintTouch: "Psst… prima e mantenha um cartão para o mover",
		skip: "Saltar para o conteúdo",
		nav: {
			label: "Principal",
			services: "Serviços",
			work: "Percurso",
			products: "Produtos",
			about: "Sobre",
			contact: "Contacto",
		},
		footerSub:
			"Responsável de equipa de produto. Engenheiro web e de infraestrutura, a trabalhar a partir de África.",
		footerLinks: { github: "GitHub", linkedin: "LinkedIn", email: "E-mail" },
		hire: "Contratar-me",
		seeProducts: "Ver os meus produtos",
		proofLabel: "Onde trabalhei",
		marquee: "Tecnologias com que trabalho",
		respLabel: "Resumo do perfil",
		step: "Passo",
		whatIDid: "O que fiz",
		outcome: "Resultado",
		codeSamples: "Há exemplos de código em {projects} e no {github}.",
		projectsLink: "página de projetos",
		productsTitle: "Produtos que construo",
		allProducts: "Todos os produtos",
		viewProduct: "Ver {name}",
		education: "Formação.",
		certifications: "Certificações.",
		contactAlt: "Prefere escrever diretamente? {email} ou {linkedin}.",
		kindWords: "Palavras simpáticas",
		reactTo: "Reagir",
		react: "reagir",
		avatarLabel:
			"Retrato em desenho animado do Edwin. Prima para o ouvir dizer algo.",
		avatarTitle:
			"Retrato em desenho animado de Edwin Anajemba: cabelo curto, barba cheia, óculos de armação preta e camisa estampada.",
		ask: {
			title: "Pergunte-me o que quiser",
			idle: "Escolha uma pergunta ou escreva a sua.",
			placeholder: "Escreva uma pergunta…",
			send: "Enviar",
			cta: "Contactar",
			fallback: "Boa pergunta, mas não tenho uma resposta pronta. Envie-me uma mensagem e respondo como deve ser.",
			items: [
			{ q: "O que faz?", a: "Sou Product Team Lead na JointEarn. Lidero os programadores, reviso código e sou responsável pela plataforma web e pela infraestrutura em que corre.", emoji: "🚀", keys: ["faz", "trabalho", "cargo", "funcao", "lider"] },
			{ q: "Qual é a sua stack?", a: "TypeScript com NestJS, Python com FastAPI, React e Next.js, PostgreSQL, e AWS com Docker e GitHub Actions. Também escrevo Solidity na Polygon.", emoji: "🛠️", keys: ["stack", "tecnologia", "competencia", "linguagem", "ferramenta", "usa"] },
			{ q: "Onde está baseado?", a: "Em África, a trabalhar com equipas de qualquer lugar.", emoji: "🌍", keys: ["onde", "baseado", "vive", "local", "pais", "fuso"] },
			{ q: "Como lidera?", a: "Registo as decisões de arquitetura, entrego em passos pequenos fáceis de reverter e trato o deploy e a monitorização como parte da funcionalidade.", emoji: "🧭", keys: ["lider", "gere", "equipa", "estilo"] },
			{ q: "Que mais está a construir?", a: "Fora do meu emprego, giro a BeezyLabs Technology Solutions e crio os meus próprios produtos. Veja a página de Produtos.", emoji: "🧪", keys: ["constr", "produto", "projeto", "beezy"] },
			{ q: "Está disponível?", a: "Estou aberto a trabalho freelance. Diga-me o que é, o prazo e o orçamento.", emoji: "📬", keys: ["disponivel", "contratar", "freelance", "contacto", "email", "trabalhar"], cta: true },
			{ q: "Uma curiosidade?", a: "Estudei Matemática antes de passar para software. Talvez por isso goste de testes e de reversões limpas.", emoji: "🎲", keys: ["curiosidade", "estudo", "curso", "matematica", "formacao", "hobby"] },
			],
		},
		quips: [
			"Na minha máquina funciona.",
			"Já tentou desligar e voltar a ligar?",
			"Vamos lançar.",
			"Eu leio os logs para que não tenha de o fazer.",
			"Tenha sempre um plano de reversão.",
			"Vamos construir algo.",
			"Produção é só o ambiente de testes com utilizadores.",
		],
		diagramTitle:
			"Um cliente chama uma API. A API usa uma fila e uma base de dados Postgres, e ambas ligam-se à Polygon.",
		status: { live: "Ativo", beta: "Beta", building: "Em construção" },
		form: {
			name: "Nome",
			email: "E-mail",
			emailPlaceholder: "nome@empresa.com",
			type: "De que precisa?",
			message: "Mensagem",
			messagePlaceholder:
				"O que está a construir, o seu prazo e o seu orçamento",
			errName: "Indique o seu nome.",
			errEmail: "Indique o seu endereço de e-mail.",
			errEmailInvalid:
				"Indique um endereço de e-mail válido, como nome@empresa.com.",
			errMessage: "Diga-me brevemente do que precisa.",
			send: "Enviar mensagem",
			sending: "A enviar…",
			sentTitle: "Mensagem enviada",
			sentBody: "Obrigado, {name}. Responderei para {email}.",
			mailtoNote:
				"A sua aplicação de e-mail deve abrir com a mensagem preenchida. Se não abrir, escreva para {email}.",
			failed: "Não foi possível enviar. Escreva-me antes para {email}.",
			subject: "{type}: mensagem de {name}",
		},
		productsPage: {
			title: "Produtos que construo",
			lead: "Cada produto é independente. Abra um para ver o que faz, a quem se destina e em que ponto está.",
			empty:
				"Os produtos aparecerão aqui quando forem lançados. {link} para saber primeiro.",
			getInTouch: "Entre em contacto",
			metaDesc:
				"Produtos de software criados por Edwin Anajemba, com estado e ligações.",
		},
		productDetail: {
			openProduct: "Abrir produto",
			getNotified: "Ser avisado",
			askQuestion: "Fazer uma pergunta",
			whoFor: "Para quem é",
			whatItDoes: "O que faz",
			screenshot: "Captura de ecrã de {name}",
		},
		projectsPage: {
			tab: "Código",
			title: "Código no GitHub",
			lead: "Projetos de código aberto: plataformas de reservas, backends de comércio eletrónico e ferramentas.",
			viewCode: "Ver código",
			metaDesc:
				"Projetos de código aberto de Edwin Anajemba: plataformas de reservas, backends de comércio eletrónico e ferramentas de produtividade.",
		},
		contactPage: {
			tab: "Contacto",
			metaDesc:
				"Contacte Edwin Anajemba para projetos freelance, liderança de produto ou colaborações.",
			aboutProduct: "Sobre {name}",
			productLead:
				"Deixe os seus dados e eu avisarei sobre o andamento.",
			alt: "Também pode escrever diretamente: {email}",
			productMessage: "Gostaria de saber novidades sobre {name}.",
		},
		notFound: {
			tab: "Página não encontrada",
			title: "Página não encontrada",
			lead: "Essa página não existe ou foi movida.",
			back: "Voltar ao início",
		},
	},
	site: {
		hero: {
			headline: "Responsável de equipa de produto.",
			lead: "Lidero equipas de engenharia e construo as plataformas web e a infraestrutura cloud por trás dos produtos, dos pagamentos à Web3.",
		},
		response: [
			["role", "Responsável de equipa de produto"],
			["company", "JointEarn"],
			["focus", "web + infraestrutura"],
			["experience", "5+ anos"],
			["open_to", "freelance"],
		],
		proof: [
			{ text: "Construiu o backend de comércio eletrónico, de 2021 a 2024." },
			{ text: "Contratos Hyperledger ligados a um backend Python." },
			{ text: "Lidera a equipa de produto desde outubro de 2026." },
		],
		services: {
			title: "O que posso fazer por si",
			lede: "Escolha um, ou combine-os. Abra um serviço para ver o que inclui.",
			items: [
				{
					title: "Liderar a construção de um produto",
					text: "Levo um produto do âmbito à produção: a arquitetura, a equipa, a entrega e a infraestrutura em que corre.",
					included: [
						"Âmbito do produto e roteiro",
						"Arquitetura e direção técnica",
						"Planeamento de sprints e demonstrações semanais",
						"Transição e documentação",
					],
				},
				{
					title: "Plataformas web e APIs",
					text: "Frontends em React e Next.js com backends em Node.js/TypeScript e Python sobre PostgreSQL.",
					included: [
						"Aplicações web em React e Next.js",
						"Desenho e desenvolvimento de APIs REST",
						"Esquema de base de dados e migrações",
						"Integrações com terceiros e webhooks",
					],
				},
				{
					title: "Cloud e infraestrutura",
					text: "AWS, Docker e pipelines de CI/CD que tornam os lançamentos rotineiros e a produção observável.",
					included: [
						"Implementações na AWS: App Runner, ECR, S3, RDS, SES",
						"Pipelines com Docker e GitHub Actions",
						"Monitorização de latência e fiabilidade",
						"Configuração de ambientes e planos de migração",
					],
				},
				{
					title: "Pagamentos, Web3 e IA",
					text: "Fluxos de pagamento, contratos Solidity na Polygon e funcionalidades com Claude.",
					included: [
						"Integração de fornecedores de pagamento e reenvio de webhooks",
						"Contratos inteligentes integrados no seu backend Web2",
						"Funcionalidades LLM baseadas na API Claude",
					],
				},
			],
		},
		process: {
			title: "Como trabalhamos juntos",
			steps: [
				{ title: "Definir", text: "Acordamos o objetivo e o que significa «concluído»." },
				{ title: "Construir", text: "Demonstrações semanais, para não haver surpresas." },
				{ title: "Lançar", text: "Implementar, monitorizar e entregar." },
				{ title: "Apoiar", text: "Correções e a iteração seguinte." },
			],
		},
		work: {
			title: "Percurso",
			items: [
				{
					tag: "Plataforma de entretenimento digital, envolvimento social e comércio eletrónico. De 2025 até hoje.",
					role: "Engenheiro backend, depois full stack, agora responsável de equipa de produto. Superviso os programadores, acompanho o progresso e garanto que as entregas saem. Continuo responsável pela entrega do frontend React e do backend Node.js/TypeScript.",
					outcome: "O backend é a fonte de verdade para a atividade dos utilizadores, o envolvimento e as transações.",
				},
				{
					tag: "Plataforma SaaS empresarial. 2024 a 2025.",
					role: "Construiu serviços backend e camadas de acesso a dados em Node.js e Python sobre PostgreSQL.",
					outcome: "Reduziu os tempos de resposta em cerca de 25 % ao otimizar consultas SQL e vistas de relatórios.",
				},
				{
					tag: "Plataforma de verificação de emissões de carbono. 2024 a 2025, contrato.",
					role: "Construiu contratos inteligentes em Hyperledger e integrou-os com um backend Python (FastAPI) e APIs que recebem dados de um dispositivo de monitorização embutido.",
					outcome: "Registos de emissões auditáveis para uma plataforma de conformidade ESG.",
				},
				{
					name: "Cruva (antiga UpTk)",
					tag: "Mercado de comércio eletrónico. 2024, contrato.",
					role: "Construiu fluxos de comprador e vendedor em Vue.js e implementou serviços backend na AWS.",
					outcome: "Um mercado com mais de 2000 utilizadores e cerca de 10 000 $ em transações mensais.",
				},
				{
					tag: "Plataforma de comércio retalhista online. 2021 a 2024.",
					role: "Engenheiro backend, depois full stack. Construiu os sistemas de catálogo, encomendas e pagamentos à medida que a plataforma passava a multivendedor, e depois reconstruiu o frontend em Next.js.",
					outcome: "APIs ao serviço de clientes web e móveis, com milhares de transações diárias.",
				},
				{
					tag: "Plataforma federal nigeriana de acompanhamento de projetos. Projeto de cliente, ativo.",
					role: "Trabalhou na aplicação web da plataforma, que permite aos cidadãos acompanhar projetos públicos e reportar o progresso.",
				},
				{
					tag: "Organização sem fins lucrativos, voluntariado. De 2025 até hoje. Ativo.",
					role: "Desenhou a arquitetura backend das plataformas internas. Escreveu os requisitos de produto, as diretrizes de engenharia e o plano de migração de infraestrutura, e orienta programadores juniores.",
				},
			],
		},
		diagram: {
			title: "Como construo",
			lede: "Todos os projetos começam como um diagrama assim.",
		},
		leadership: {
			title: "Como lidero",
			text: "Lidero a engenharia na JointEarn: arquitetura, revisão de código, entrega e a plataforma de produção em que a equipa lança. Venho do backend, por isso tomo as decisões de produto e de infraestrutura em conjunto: o que construímos, como é implementado e como se mantém no ar.",
			principles: [
				"Dominar a arquitetura e registar as decisões por escrito.",
				"Lançar em passos pequenos, fáceis de reverter.",
				"Tratar a implementação e a monitorização como parte da funcionalidade.",
			],
		},
		about: {
			title: "Sobre mim",
			text: [
				"Sou responsável de equipa de produto e engenheiro, com mais de 5 anos de experiência a construir plataformas web e a infraestrutura cloud que as suporta, em pagamentos, comércio eletrónico e Web3.",
				"Estou em África e trabalho com equipas em qualquer lugar. Fora do meu trabalho, giro a BeezyLabs Technology Solutions, onde construo e lanço os meus próprios produtos de software.",
			],
			skills: [
				{ group: "Backend" },
				{ group: "Frontend" },
				{ group: "Dados" },
				{ group: "Cloud" },
				{ group: "Web3" },
				{
					group: "IA",
					items: [
						"Integração da API Claude",
						"Desenvolvimento assistido por IA com Cursor, Claude Code e GitHub Copilot, com revisão de código e testes em tudo o que produz",
					],
				},
			],
			education: {
				degree: "Licenciatura em Matemática, Federal University Oye-Ekiti, Nigéria (2013 a 2017)",
				certs: [
					"Especialização em Programação Python 3, Universidade do Michigan",
					"Fundamentos de Programação Java e Engenharia de Software, Universidade Duke",
					"Blockchain, Universidade de Buffalo",
				],
			},
		},
		contact: {
			title: "Tem algo para construir?",
			lede: "Diga-me o que é, o seu prazo e o seu orçamento.",
			collabTypes: [
				"Projeto freelance",
				"Líder de produto para contratar",
				"Contratos inteligentes e Web3",
				"Mentoria",
				"Outra coisa",
			],
		},
	},
	products: {
		beezyapply: {
			pitch: "Otimização de CV com IA para quem procura emprego na Nigéria.",
			audience: "Quem procura emprego na Nigéria",
		},
	},
	projects: [
		"Fluxo de reservas para clientes da Buz and Socials, para reservar diretamente online.",
		"Painel de administração para gerir reservas de hotel, criado para a equipa da Buz and Socials.",
		"API que alimenta o painel de reservas de hotel.",
		"Smartworka: uma ferramenta de produtividade para gerir um projeto do início à entrega.",
		"Loja de comércio eletrónico construída sobre a framework Medusa.",
		"Uma API RESTful desenvolvida com Go e Gin para a Vintage Jazz Records.",
		"Backend de API REST da Palimart Cosmetics, parte da plataforma de comércio eletrónico cujo backend giri durante três anos.",
		"Um backend para uma empresa de viagens, construído com Python, Django e PostgreSQL.",
	],
};

export default pt;
