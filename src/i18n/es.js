const es = {
	label: "ES",
	name: "Español",
	ui: {
		langLabel: "Idioma",
		menu: "Menú",
		reset: "Reiniciar el mundo",
		worldReset: "Mundo reiniciado",
		dragHint: "Psst… prueba a arrastrar las tarjetas",
		dragHintTouch: "Psst… mantén pulsada una tarjeta para moverla",
		skip: "Saltar al contenido",
		nav: {
			label: "Principal",
			services: "Servicios",
			work: "Trayectoria",
			products: "Productos",
			games: "Juegos",
			about: "Sobre mí",
			contact: "Contacto",
		},
		footerSub:
			"Líder de equipo de producto. Ingeniero web y de infraestructura, con base en África.",
		footerLinks: { github: "GitHub", linkedin: "LinkedIn", email: "Correo" },
		hire: "Contrátame",
		seeProducts: "Ver mis productos",
		proofLabel: "Dónde he trabajado",
		marquee: "Tecnologías con las que trabajo",
		respLabel: "Resumen del perfil",
		step: "Paso",
		whatIDid: "Qué hice",
		outcome: "Resultado",
		codeSamples: "Hay ejemplos de código en {projects} y en {github}.",
		projectsLink: "la página de proyectos",
		productsTitle: "Productos que construyo",
		allProducts: "Todos los productos",
		viewProduct: "Ver {name}",
		education: "Formación.",
		certifications: "Certificaciones.",
		contactAlt: "¿Prefieres escribir directamente? {email} o {linkedin}.",
		kindWords: "Buenas palabras",
		reactTo: "Reaccionar",
		react: "reaccionar",
		avatarLabel:
			"Retrato de dibujos animados de Edwin. Pulsa para oírle decir algo.",
		avatarTitle:
			"Retrato de dibujos animados de Edwin Anajemba: pelo corto, barba completa, gafas de montura negra y camisa estampada.",
		tiny: {
		 "label": "Gente diminuta",
		 "scoreLabel": "Gente diminuta por bando, y los caídos",
		 "fallen": "Caídos",
		 "hint": "Aquí vive gente diminuta. Toca a alguien para darle un personaje… o acabar con él. Arrastra una tarjeta para cortarles el paso.",
		 "joined": "{name} ({role}) se une a la historia.",
		 "fellNamed": "{name} ({role}) ha caído. 🪦",
		 "fell": "Una personita {side} ha caído. 🪦",
		 "squashed": "Una personita {side} fue aplastada por una tarjeta. 🪦",
		 "war": "¡Guerra! {a} contra {b} ⚔️",
		 "roles": [
		  "Caballero",
		  "Mago",
		  "Panadero",
		  "Constructor",
		  "Granjero",
		  "Bardo",
		  "Mercader",
		  "Arquero"
		 ],
		 "sides": {
		  "red": "rojo",
		  "blue": "azul",
		  "green": "verde"
		 },
		 "lines": [
		  "¡Ahora no, estoy ocupado!",
		  "¡Por el reino!",
		  "¡Cuidado con las tarjetas!",
		  "¿Eso es un despliegue?",
		  "Necesito un café.",
		  "¿Has probado a apagarlo y volverlo a encender?"
		 ]
		},
		term: {
		 "title": "edwin@portfolio: ~",
		 "hint": "Escribe help para ver lo que sé hacer.",
		 "placeholder": "escribe un comando…",
		 "label": "Comando de la terminal",
		 "helpTitle": "Comandos disponibles:",
		 "none": "Aún no hay nada aquí.",
		 "form": "Abrir el formulario de contacto",
		 "projects": "Abrir la página de proyectos",
		 "catUsage": "uso: cat <archivo>  (prueba ls)",
		 "noFile": "cat: {f}: no existe el archivo",
		 "openUsage": "uso: open services | work | about | contact | products | projects",
		 "opening": "abriendo {x}…",
		 "langUsage": "uso: lang <{l}>",
		 "langSet": "idioma: {l}",
		 "sudo": "Buen intento. Edwin no está en el archivo sudoers. Se informará de este incidente.",
		 "rm": "Permiso denegado. Quiero a mis archivos.",
		 "exit": "No hay escapatoria, solo /contact.",
		 "notFound": "comando no encontrado: {cmd}. Escribe help.",
		 "cmds": {
		  "help": "mostrar esta lista",
		  "whoami": "quién soy",
		  "about": "una biografía corta",
		  "skills": "mi stack",
		  "experience": "dónde he trabajado",
		  "products": "lo que estoy construyendo",
		  "projects": "trabajo open source",
		  "contact": "cómo contactarme",
		  "links": "GitHub, LinkedIn, correo",
		  "ls": "listar archivos",
		  "cat": "leer un archivo, ej. cat about.md",
		  "open": "ir a una sección, ej. open work",
		  "lang": "cambiar idioma, ej. lang es",
		  "curl": "mostrar otra vez la respuesta de la API",
		  "clear": "limpiar la pantalla"
		 }
		},
		ask: {
			title: "Pregúntame lo que quieras",
			idle: "Elige una pregunta o escribe la tuya.",
			placeholder: "Escribe una pregunta…",
			send: "Enviar",
			cta: "Contactar",
			fallback: "Buena pregunta, pero no tengo una respuesta preparada. Escríbeme y te respondo como se debe.",
			items: [
			{ q: "¿A qué te dedicas?", a: "Soy Product Team Lead en JointEarn. Dirijo a los desarrolladores, reviso código y soy responsable de la plataforma web y de la infraestructura en la que corre.", emoji: "🚀", keys: ["dedicas", "trabajo", "puesto", "rol", "lider"] },
			{ q: "¿Cuál es tu stack?", a: "TypeScript con NestJS, Python con FastAPI, React y Next.js, PostgreSQL, y AWS con Docker y GitHub Actions. También escribo Solidity en Polygon.", emoji: "🛠️", keys: ["stack", "tecnologia", "habilidad", "lenguaje", "herramienta", "usas"] },
			{ q: "¿Dónde vives?", a: "En África, trabajando con equipos de cualquier lugar.", emoji: "🌍", keys: ["donde", "vives", "basado", "lugar", "pais", "zona"] },
			{ q: "¿Cómo lideras?", a: "Dejo por escrito las decisiones de arquitectura, entrego en pasos pequeños fáciles de revertir y trato el despliegue y la monitorización como parte de la funcionalidad.", emoji: "🧭", keys: ["lider", "gestion", "equipo", "estilo"] },
			{ q: "¿Qué más estás construyendo?", a: "Fuera de mi trabajo dirijo BeezyLabs Technology Solutions y creo mis propios productos. Mira la página de Productos.", emoji: "🧪", keys: ["constru", "producto", "proyecto", "beezy"] },
			{ q: "¿Estás disponible?", a: "Estoy abierto a trabajo freelance. Cuéntame qué es, tu plazo y tu presupuesto.", emoji: "📬", keys: ["disponible", "contratar", "freelance", "contacto", "email", "trabajar"], cta: true },
			{ q: "¿Un dato curioso?", a: "Estudié Matemáticas antes de pasar al software. Quizá por eso me gustan las pruebas y los retrocesos limpios.", emoji: "🎲", keys: ["curioso", "estudio", "carrera", "matematicas", "formacion", "hobby"] },
			{ q: "¿Cuánta experiencia tienes?", a: "Más de 5 años construyendo plataformas web y la infraestructura cloud que las sostiene, en pagos, e-commerce y Web3.", emoji: "📈", keys: ["experiencia", "anos", "tiempo", "senior", "carrera", "desde"] },
			{ q: "¿Cómo trabajamos juntos?", a: "Acordamos el objetivo y qué significa terminado. Construyo con demos semanales, sin sorpresas, y luego desplegamos, monitorizamos y entrego.", emoji: "🤝", keys: ["juntos", "proceso", "empez", "plazo", "metodo", "demo", "pasos"] },
			],
		},
		quips: [
			"En mi máquina funciona.",
			"¿Has probado a apagarlo y volver a encenderlo?",
			"A producción.",
			"Yo leo los logs para que tú no tengas que hacerlo.",
			"Ten siempre un plan de reversión.",
			"Construyamos algo.",
			"Producción es solo staging con usuarios.",
		],
		diagramTitle:
			"Un cliente llama a una API. La API usa una cola y una base de datos Postgres, y ambas se conectan a Polygon.",
		status: { live: "En vivo", beta: "Beta", building: "En construcción", soon: "Próximamente" },
		form: {
			name: "Nombre",
			email: "Correo electrónico",
			emailPlaceholder: "nombre@empresa.com",
			type: "¿Qué necesitas?",
			message: "Mensaje",
			messagePlaceholder: "Qué estás construyendo, tu plazo y tu presupuesto",
			errName: "Escribe tu nombre.",
			errEmail: "Escribe tu correo electrónico.",
			errEmailInvalid:
				"Escribe un correo válido, como nombre@empresa.com.",
			errMessage: "Cuéntame brevemente qué necesitas.",
			send: "Enviar mensaje",
			sending: "Enviando…",
			sentTitle: "Mensaje enviado",
			sentBody: "Gracias, {name}. Responderé a {email}.",
			mailtoNote:
				"Tu aplicación de correo debería abrirse con el mensaje preparado. Si no, escribe a {email}.",
			failed: "No se pudo enviar. Escríbeme mejor a {email}.",
			subject: "{type}: mensaje de {name}",
		},
		gamesPage: {
		 "title": "Juegos",
		 "lead": "Pequeños juegos en línea, construidos uno a uno. El primero está en marcha y los demás están en cola.",
		 "metaDesc": "Juegos en línea de Edwin Anajemba. Tiny Wars está en marcha, con más en cola.",
		 "nowTitle": "En marcha",
		 "nextTitle": "Próximos",
		 "notify": "Avísame",
		 "follow": "Seguir el progreso",
		 "peek": "Conocer a la gente diminuta",
		 "play": "Jugar",
		 "tags": {
		  "realtime": "Tiempo real",
		  "daily": "Diario",
		  "solo": "Solo + clasificación",
		  "canvas": "Lienzo compartido",
		  "live": "Evento en vivo"
		 },
		 "items": {
		  "tiny-wars": {
		   "name": "Tiny Wars",
		   "pitch": "Un mundo compartido de gente diminuta. Elige rojo, azul o verde, crea un personaje y pelea la guerra semanal por tu bando."
		  },
		  "daily-bug-hunt": {
		   "name": "Daily Bug Hunt",
		   "pitch": "Un acertijo de programación al día, igual para todos. Encuentra el bug, mantén tu racha y comparte tu resultado."
		  },
		  "code-race": {
		   "name": "Code Race",
		   "pitch": "Compite en directo contra otras personas con fragmentos de código reales y sube en la clasificación."
		  },
		  "tiny-kingdom": {
		   "name": "Tiny Kingdom",
		   "pitch": "Toca para hacer crecer una aldea que rinde incluso cuando no estás. Comercia con amigos y llega a lo más alto."
		  },
		  "pixel-canvas": {
		   "name": "Pixel Canvas",
		   "pitch": "Un lienzo enorme, un píxel cada vez. Únete a un equipo y conquista territorio."
		  },
		  "quiz-night": {
		   "name": "Quiz Night",
		   "pitch": "Un quiz semanal en directo con rondas africanas y de tecnología, clasificación y premios financiados por patrocinadores."
		  }
		 }
		},
		productsPage: {
			title: "Productos que construyo",
			lead: "Cada producto es independiente. Abre uno para ver qué hace, para quién es y en qué punto está.",
			empty:
				"Los productos aparecerán aquí cuando se lancen. {link} para enterarte primero.",
			getInTouch: "Ponte en contacto",
			metaDesc:
				"Productos de software creados por Edwin Anajemba, con su estado y enlaces.",
		},
		productDetail: {
			openProduct: "Abrir producto",
			getNotified: "Recibir aviso",
			askQuestion: "Hacer una pregunta",
			whoFor: "Para quién es",
			whatItDoes: "Qué hace",
			screenshot: "Captura de pantalla de {name}",
		},
		projectsPage: {
			tab: "Código",
			title: "Código en GitHub",
			lead: "Proyectos de código abierto: plataformas de reservas, backends de comercio electrónico y herramientas.",
			viewCode: "Ver código",
			metaDesc:
				"Proyectos de código abierto de Edwin Anajemba: plataformas de reservas, backends de comercio electrónico y herramientas de productividad.",
		},
		contactPage: {
			tab: "Contacto",
			metaDesc:
				"Contacta con Edwin Anajemba para proyectos freelance, liderazgo de producto o colaboraciones.",
			aboutProduct: "Sobre {name}",
			productLead:
				"Deja tus datos y te avisaré de cómo avanza.",
			alt: "También puedes escribir directamente: {email}",
			productMessage: "Me gustaría saber más sobre {name}.",
		},
		notFound: {
			tab: "Página no encontrada",
			title: "Página no encontrada",
			lead: "Esa página no existe o se ha movido.",
			back: "Volver al inicio",
		},
	},
	site: {
		hero: {
			headline: "Líder de equipo de producto.",
			lead: "Lidero equipos de ingeniería y construyo las plataformas web y la infraestructura en la nube detrás de los productos, desde pagos hasta Web3.",
		},
		response: [
			["role", "Líder de equipo de producto"],
			["company", "JointEarn"],
			["focus", "web + infraestructura"],
			["experience", "5+ años"],
			["open_to", "freelance"],
		],
		proof: [
			{ text: "Construyó el backend de comercio electrónico, de 2021 a 2024." },
			{ text: "Contratos Hyperledger conectados a un backend en Python." },
			{ text: "Lidera el equipo de producto desde octubre de 2026." },
		],
		services: {
			title: "Lo que puedo hacer por ti",
			lede: "Elige uno o combínalos. Abre un servicio para ver qué incluye.",
			items: [
				{
					title: "Liderar la construcción de un producto",
					text: "Llevo un producto del alcance a producción: la arquitectura, el equipo, la entrega y la infraestructura en la que corre.",
					included: [
						"Alcance del producto y hoja de ruta",
						"Arquitectura y dirección técnica",
						"Planificación de sprints y demos semanales",
						"Traspaso y documentación",
					],
				},
				{
					title: "Plataformas web y APIs",
					text: "Frontends en React y Next.js con backends en Node.js/TypeScript y Python sobre PostgreSQL.",
					included: [
						"Aplicaciones web en React y Next.js",
						"Diseño y desarrollo de APIs REST",
						"Esquema de base de datos y migraciones",
						"Integraciones con terceros y webhooks",
					],
				},
				{
					title: "Nube e infraestructura",
					text: "AWS, Docker y pipelines de CI/CD que hacen rutinarios los despliegues y observable la producción.",
					included: [
						"Despliegues en AWS: App Runner, ECR, S3, RDS, SES",
						"Pipelines con Docker y GitHub Actions",
						"Monitorización de latencia y fiabilidad",
						"Configuración de entornos y planes de migración",
					],
				},
				{
					title: "Pagos, Web3 e IA",
					text: "Flujos de pago, contratos Solidity en Polygon y funciones con Claude.",
					included: [
						"Integración de proveedores de pago y reintentos de webhooks",
						"Contratos inteligentes integrados con tu backend Web2",
						"Funciones LLM basadas en la API de Claude",
					],
				},
			],
		},
		process: {
			title: "Cómo trabajamos juntos",
			steps: [
				{ title: "Definir", text: "Acordamos el objetivo y qué significa «terminado»." },
				{ title: "Construir", text: "Demos semanales, para que no haya sorpresas." },
				{ title: "Lanzar", text: "Desplegar, monitorizar y traspasar." },
				{ title: "Dar soporte", text: "Correcciones y la siguiente iteración." },
			],
		},
		work: {
			title: "Trayectoria",
			items: [
				{
					tag: "Plataforma de entretenimiento digital, interacción social y comercio electrónico. De 2025 a hoy.",
					role: "Ingeniero backend, luego full stack, ahora líder de equipo de producto. Superviso a los desarrolladores, sigo el progreso y me aseguro de que las entregas salgan. Sigo a cargo de la entrega del frontend en React y del backend en Node.js/TypeScript.",
					outcome: "El backend es el sistema de referencia de la actividad de los usuarios, la interacción y las transacciones.",
				},
				{
					tag: "Plataforma SaaS empresarial. 2024 a 2025.",
					role: "Construyó servicios backend y capas de acceso a datos en Node.js y Python sobre PostgreSQL.",
					outcome: "Redujo los tiempos de respuesta en torno a un 25 % optimizando consultas SQL y vistas de reportes.",
				},
				{
					tag: "Plataforma de verificación de emisiones de carbono. 2024 a 2025, contrato.",
					role: "Construyó contratos inteligentes en Hyperledger y los integró con un backend en Python (FastAPI) y APIs que reciben datos de un dispositivo de seguimiento embebido.",
					outcome: "Registros de emisiones auditables para una plataforma de cumplimiento ESG.",
				},
				{
					name: "Cruva (antes UpTk)",
					tag: "Marketplace de comercio electrónico. 2024, contrato.",
					role: "Construyó los flujos de comprador y vendedor en Vue.js y desplegó servicios backend en AWS.",
					outcome: "Un marketplace con más de 2000 usuarios y unos 10 000 $ en transacciones mensuales.",
				},
				{
					tag: "Plataforma de comercio minorista en línea. 2021 a 2024.",
					role: "Ingeniero backend, luego full stack. Construyó los sistemas de catálogo, pedidos y pagos mientras la plataforma pasaba a multivendedor, y después reconstruyó el frontend en Next.js.",
					outcome: "APIs al servicio de clientes web y móviles, con miles de transacciones diarias.",
				},
				{
					tag: "Plataforma federal nigeriana de seguimiento de proyectos. Proyecto de cliente, en vivo.",
					role: "Trabajó en la aplicación web de la plataforma, que permite a los ciudadanos seguir proyectos públicos y reportar avances.",
				},
				{
					tag: "Organización sin ánimo de lucro, voluntariado. De 2025 a hoy. En vivo.",
					role: "Diseñó la arquitectura backend de las plataformas internas. Redactó los requisitos de producto, las guías de ingeniería y el plan de migración de infraestructura, y orienta a desarrolladores junior.",
				},
			],
		},
		diagram: {
			title: "Cómo construyo",
			lede: "Todo proyecto empieza como un diagrama como este.",
		},
		leadership: {
			title: "Cómo lidero",
			text: "Lidero la ingeniería en JointEarn: arquitectura, revisión de código, entrega y la plataforma de producción sobre la que lanza el equipo. Vengo del backend, así que tomo juntas las decisiones de producto e infraestructura: qué construimos, cómo se despliega y cómo se mantiene en pie.",
			principles: [
				"Dominar la arquitectura y dejar las decisiones por escrito.",
				"Lanzar en pasos pequeños y fáciles de revertir.",
				"Tratar el despliegue y la monitorización como parte de la función.",
			],
		},
		about: {
			title: "Sobre mí",
			text: [
				"Soy líder de equipo de producto e ingeniero, con más de 5 años de experiencia construyendo plataformas web y la infraestructura en la nube que las sostiene, en pagos, comercio electrónico y Web3.",
				"Estoy en África y trabajo con equipos de cualquier lugar. Fuera de mi trabajo dirijo BeezyLabs Technology Solutions, donde construyo y lanzo mis propios productos de software.",
			],
			skills: [
				{ group: "Backend" },
				{ group: "Frontend" },
				{ group: "Datos" },
				{ group: "Nube" },
				{ group: "Web3" },
				{
					group: "IA",
					items: [
						"Integración de la API de Claude",
						"Desarrollo asistido por IA con Cursor, Claude Code y GitHub Copilot, con revisión de código y pruebas sobre todo lo que produce",
					],
				},
			],
			education: {
				degree: "Licenciatura en Matemáticas, Federal University Oye-Ekiti, Nigeria (2013 a 2017)",
				certs: [
					"Especialización en Programación con Python 3, Universidad de Míchigan",
					"Fundamentos de Programación en Java e Ingeniería de Software, Universidad Duke",
					"Blockchain, Universidad de Buffalo",
				],
			},
		},
		contact: {
			title: "¿Tienes algo que construir?",
			lede: "Cuéntame qué es, tu plazo y tu presupuesto.",
			collabTypes: [
				"Proyecto freelance",
				"Líder de producto a contratar",
				"Contratos inteligentes y Web3",
				"Mentoría",
				"Otra cosa",
			],
		},
	},
	products: {
		beezyapply: {
			pitch: "Optimización de CV con IA para quienes buscan empleo en Nigeria.",
			audience: "Personas que buscan empleo en Nigeria",
		},
	},
	projects: [
		"Flujo de reservas para clientes de Buz and Socials, para reservar directamente en línea.",
		"Panel de administración para gestionar reservas de hotel, creado para el equipo de Buz and Socials.",
		"API que alimenta el panel de reservas de hotel.",
		"Smartworka: una herramienta de productividad para gestionar un proyecto desde el inicio hasta la entrega.",
		"Tienda de comercio electrónico construida sobre el framework Medusa.",
		"Una API RESTful desarrollada con Go y Gin para Vintage Jazz Records.",
		"Backend de API REST de Palimart Cosmetics, parte de la plataforma de comercio electrónico cuyo backend gestioné durante tres años.",
		"Un backend para un negocio de viajes y tours, construido con Python, Django y PostgreSQL.",
	],
};

export default es;
