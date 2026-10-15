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
			build: "Criar",
			store: "Loja",
			games: "Jogos",
			code: "Código",
			about: "Sobre",
			contact: "Contacto",
		},
		liveStats: {"live": "Ao vivo", "online": "online agora", "playing": "a jogar", "visits": "visitas hoje", "plays": "partidas hoje", "note": "Anónimo. Sem cookies, nenhum IP guardado."},
		footerSub:
			"Engenheiro de produto e líder de equipa. Web e infraestrutura, a trabalhar a partir de África.",
		footerLinks: { github: "GitHub", linkedin: "LinkedIn", email: "E-mail" },
		hire: "Contrate-me para um projeto",
		aboutMe: "Sobre mim",
		openToContracts: "Disponível para contratos",
		seeProducts: "Ver os meus produtos",
		proofLabel: "Onde trabalhei",
		marquee: "Tecnologias com que trabalho",
		respLabel: "Resumo do perfil",
		step: "Passo",
		whatIDid: "O que fiz",
		outcome: "Resultado",
		codeSamples: "Há exemplos de código em {projects} e no {github}.",
		projectsLink: "página de projetos",
		liveTitle: "Produtos online em que contribuí",
		liveLede: "Produtos reais com utilizadores reais. Abra qualquer um para ver o trabalho em uso.",
		visitSite: "Visitar o site",
		liveItems: {"jointearn": "Uma plataforma de recompensas onde se ganha a ver vídeos, a jogar, a ler notícias e a comprar. Lidero a equipa de produto e sou responsável pelo frontend React e pelo backend Node.js.", "eyemark": "A plataforma da Nigéria para acompanhar projetos públicos e reportar o progresso. Trabalhei na aplicação web.", closecarbon: "Verificação de emissões de carbono da Netzence. Construí os smart contracts em Hyperledger e o backend Python e as APIs que recebem dados do dispositivo de monitorização.", girllead: "Um acelerador de talentos sem fins lucrativos. Como voluntário, desenhei a arquitetura backend das plataformas internas e escrevi os requisitos de produto e o plano de migração.", cruva: "Antes UpTk, o marketplace onde construí os fluxos de comprador e comerciante. Hoje a Cruva é uma plataforma de IA para o crescimento de afiliados do TikTok Shop." },
		storeBanner: { kicker: "Novo", title: "A loja BeezyLabs", text: "Software, integrações, modelos e scripts que construí, numa pequena loja. Está no início e vou juntando produtos à medida que ficam prontos.", cta: "Visitar a loja", more: "Sobre a loja" },
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
		tiny: {
		 "label": "Gente miúda",
		 "scoreLabel": "Gente miúda por lado, e os caídos",
		 "fallen": "Caídos",
		 "hint": "Vive aqui gente miúda. Toque em alguém para lhe dar uma personagem… ou acabar com ela. Arraste um cartão para lhes barrar o caminho.",
		 "joined": "{name} ({role}) juntou-se à história.",
		 "fellNamed": "{name} ({role}) caiu. 🪦",
		 "fell": "Uma pessoa miúda {side} caiu. 🪦",
		 "squashed": "Uma pessoa miúda {side} foi esmagada por um cartão. 🪦",
		 "war": "Guerra! {a} contra {b} ⚔️",
		 "roles": [
		  "Cavaleiro",
		  "Mago",
		  "Padeiro",
		  "Construtor",
		  "Agricultor",
		  "Bardo",
		  "Mercador",
		  "Arqueiro"
		 ],
		 "sides": {
		  "red": "vermelho",
		  "blue": "azul",
		  "green": "verde"
		 },
		 "lines": [
		  "Agora não, estou ocupado!",
		  "Pelo reino!",
		  "Cuidado com os cartões!",
		  "Isso é um deploy?",
		  "Preciso de um café.",
		  "Já tentou desligar e voltar a ligar?"
		 ]
		},
		term: {
		 "title": "edwin@portfolio: ~",
		 "hint": "Escreva help para ver o que sei fazer.",
		 "placeholder": "escreva um comando…",
		 "label": "Comando do terminal",
		 "helpTitle": "Comandos disponíveis:",
		 "none": "Ainda nada aqui.",
		 "form": "Abrir o formulário de contacto",
		 "projects": "Abrir a página de projetos",
		 "catUsage": "uso: cat <ficheiro>  (experimente ls)",
		 "noFile": "cat: {f}: ficheiro inexistente",
		 "openUsage": "uso: open services | work | about | contact | products | projects | store",
		 "opening": "a abrir {x}…",
		 "langUsage": "uso: lang <{l}>",
		 "langSet": "idioma: {l}",
		 "sudo": "Boa tentativa. O Edwin não está no ficheiro sudoers. Este incidente será reportado.",
		 "rm": "Permissão negada. Gosto dos meus ficheiros.",
		 "exit": "Não há fuga, só /contact.",
		 "notFound": "comando não encontrado: {cmd}. Escreva help.",
		 "matrix": {
		  "wake": "Acorda, Neo...",
		  "follow": "A Matrix apanhou-te...",
		  "rabbit": "Segue o coelho branco.",
		  "inside": "Está lá dentro. Experimente: theme red | blue | violet | amber | green. Escreva exit (ou prima Esc) para tomar a pílula azul.",
		  "out": "Tomou a pílula azul. A história termina. Acorda e acredita no que quiser acreditar.",
		  "already": "Já está lá dentro.",
		  "hint": "Acorda, Neo... A Matrix apanhou-te. Experimente: red pill",
		  "themeSet": "Chuva definida para {c}.",
		  "themeUsage": "uso: theme <{c}>",
		  "exitLabel": "Tomar a pílula azul (Esc)"
		 },
		 "guideOn": "O Pip voltou.",
		 "guideOff": "O Pip foi descansar. Escreva guide para o chamar de volta.",
		 "cmds": {
		  "help": "mostrar esta lista",
		  "whoami": "quem sou",
		  "about": "uma biografia curta",
		  "skills": "a minha stack",
		  "experience": "onde trabalhei",
		  "products": "o que estou a construir",
		  "projects": "trabalho open source",
		  "contact": "como falar comigo",
		  "links": "GitHub, LinkedIn, e-mail",
		  "ls": "listar ficheiros",
		  "cat": "ler um ficheiro, ex. cat about.md",
		  "open": "ir para uma secção, ex. open work",
		  "lang": "mudar de idioma, ex. lang pt",
		  "guide": "chamar ou mandar embora o Pip, o guia: guide on|off",
		  "curl": "mostrar de novo a resposta da API",
		  "clear": "limpar o ecrã"
		 }
		},
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
			{ q: "Qual é a sua experiência?", a: "Mais de 5 anos a construir plataformas web e a infraestrutura cloud por trás delas, em pagamentos, e-commerce e Web3.", emoji: "📈", keys: ["experiencia", "anos", "tempo", "senior", "carreira", "desde"] },
			{ q: "Como trabalhamos juntos?", a: "Definimos o objetivo e o que significa estar concluído. Construo com demonstrações semanais, sem surpresas, depois fazemos o deploy, monitorizamos e entrego.", emoji: "🤝", keys: ["juntos", "processo", "comec", "prazo", "metodo", "demo", "passos"] },
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
		diagramSteps: ["Um cliente envia um pedido.", "A API valida-o e assume o controlo.", "O trabalho entra na fila e é guardado na base de dados.", "O resultado é fechado on-chain e confirmado ao cliente."],
		diagramTitle:
			"Um cliente chama uma API. A API usa uma fila e uma base de dados Postgres, e ambas ligam-se à Polygon.",
		status: { live: "Ativo", beta: "Beta", building: "Em construção", soon: "Em breve" },
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
		guide: {
		 "label": "Guia",
		 "open": "Pip, o guia. Abrir o menu.",
		 "show": "Chamar o guia de volta",
		 "close": "Fechar",
		 "hide": "Mandar o Pip embora",
		 "tipsOn": "Ligar as dicas",
		 "tipsOff": "Parar as dicas",
		 "yes": "Sim",
		 "no": "Não, obrigado",
		 "notNow": "Agora não",
		 "next": "Seguinte",
		 "stop": "Parar",
		 "finish": "Concluir",
		 "thanks": "Obrigado",
		 "go": "Levar-me lá",
		 "play": "Jogar",
		 "back": "Voltei!",
		 "intro": "Olá, sou o Pip, o seu guia. Quer uma visita de 30 segundos?",
		 "menu": {
		  "title": "O que gostaria de fazer?",
		  "tour": "Fazer a visita",
		  "work": "Ver a experiência",
		  "contact": "Contactar o Edwin",
		  "game": "Jogar Tiny Wars"
		 },
		 "tour": [
		  {
		   "id": "services",
		   "text": "Estes são os serviços oferecidos, desde liderar um produto até à infraestrutura cloud."
		  },
		  {
		   "id": "work",
		   "text": "A experiência, com o que foi construído e o resultado de cada projeto."
		  },
		  {
		   "id": "about",
		   "text": "Uma biografia curta. A página Sobre mim tem a stack completa e um retrato que responde a perguntas."
		  },
		  {
		   "id": "contact",
		   "text": "Diga o que quer construir, o prazo e o orçamento, e terá resposta."
		  }
		 ],
		 "tourDone": "Esta foi a visita. Toque em mim sempre que precisar.",
		 "tips": {
		  "services": "Parece que está a ver os serviços. Quer que o leve ao formulário de contacto?",
		  "work": "Curioso sobre como o Edwin lidera uma equipa? A secção logo abaixo explica.",
		  "about": "A página Sobre mim tem um retrato que responde a perguntas.",
		  "contact": "Dica: indique o prazo e o orçamento para a resposta ser útil.",
		  "form": "A escrever uma mensagem? Diga o que quer construir e para quando.",
		  "terminal": "Aquele terminal é real. Escreva help para ver o que faz.",
		  "products": "Cada produto tem a sua página, com o estado.",
		  "projects": "Estes são projetos open source. Cada um liga ao GitHub.",
		  "games": "O Tiny Wars já se joga. Quer experimentar uma batalha?",
		  "village": "Toque numa pessoa miúda. Pode ganhar nome e profissão, ou não."
		 }
		},
		race: {"name": "Deploy Rush", "eyebrow": "Corrida arcade", "metaDesc": "Deploy Rush: um jogo de corrida arcade gratuito. Três voltas, seis carros, trânsito e nitro. Bata o seu melhor tempo.", "lead": "Corra contra o prazo. Três voltas, cinco rivais, uma estrada cheia de trânsito. O acelerador é automático: tudo depende da sua direção, das suas travagens e de quando queima o nitro.", "readyTitle": "Pronto para entregar?", "readyBody": "Começa em último. Desvie-se do trânsito, apanhe os raios para ganhar nitro e cruze a meta em primeiro.", "keys": "Setas ou A / D para virar. Baixo ou S para travar. Espaço ou Cima para o nitro.", "best": "Melhor tempo", "start": "Começar corrida", "bestLap": "Melhor volta", "record": "Novo recorde pessoal!", "again": "Correr de novo", "share": "Copiar meu resultado", "copied": "Copiado", "moreGames": "Mais jogos", "soundOn": "Ligar o som", "soundOff": "Desligar o som", "controls": "Controles", "left": "Virar à esquerda", "right": "Virar à direita", "brake": "FREIO", "boost": "NITRO", "tip": "Dica: trave um pouco antes das curvas fechadas. Sair da pista faz perder velocidade.", "shareText": "Terminei em {place} de {total} no Deploy Rush em {time}. Tente me bater:", "places": ["1.º lugar", "2.º lugar", "3.º lugar", "4.º lugar", "5.º lugar", "6.º lugar"], "hud": {"pos": "POSIÇÃO", "lap": "VOLTA", "kmh": "KM/H", "nitro": "NITRO", "go": "VAI!", "bolt": "+NITRO", "finish": "CHEGADA!", "off": "FORA DA PISTA", "finalLap": "ÚLTIMA VOLTA"}, "pause": "Pausa", "paused": "Em pausa", "resume": "Continuar", "restart": "Recomeçar", "level": "Dificuldade", "levels": {"easy": "Fácil", "normal": "Normal", "hard": "Difícil"}, "top": "Melhores tempos"},
		bugHunt: {
		 "name": "Caça diária aos bugs",
		 "eyebrow": "Jogo diário",
		 "metaDesc": "Um desafio de programação por dia, igual para todos. Encontre o bug com a lanterna do Pip.",
		 "lead": "Cinco pequenos excertos por dia, iguais para todos. Cada um tem uma linha com erro. Clique nela.",
		 "intro": "Sou o Pip. Seguro a lanterna enquanto procura.",
		 "go": "Certo, primeiro excerto. Que linha está errada?",
		 "right": "Encontrou!",
		 "wrong": "Essa não. Olhe outra vez.",
		 "hintSay": "A lanterna ilumina duas linhas. Uma delas é o bug.",
		 "next": "Seguinte.",
		 "finished": "A caça de hoje acabou. Muito bem.",
		 "readyTitle": "Pronto para a caça de hoje?",
		 "readyBody": "{n} excertos, um bug cada. Erros custam pontos e a lanterna também.",
		 "start": "Começar a caça",
		 "streak": "Sequência: {n} dia(s)",
		 "progress": "Excerto {n} de {total}",
		 "pts": "pts",
		 "find": "Clique na linha com o bug.",
		 "codeLabel": "Excerto de código",
		 "whyTitle": "Porque é um bug",
		 "nextBtn": "Próximo excerto",
		 "finish": "Ver o meu resultado",
		 "lantern": "Usar a lanterna (restam {n})",
		 "doneTitle": "Resultado de hoje",
		 "share": "Copiar o meu resultado",
		 "copied": "Copiado!",
		 "moreGames": "Mais jogos",
		 "comeBack": "Uma nova caça aparece amanhã.",
		 "shareText": "Caça aos bugs {date}: {score}/{max}, sequência {streak}. Jogue: {url}",
		 "why": {
		  "offbyone": "<= vai um passo além do fim, e items[items.length] é undefined. Use <.",
		  "assign": "Um único = atribui \"admin\" ao cargo, por isso todos passam. Compare com ===.",
		  "reduce": "Sem valor inicial, reduce numa lista vazia lança erro. Passe 0 como segundo argumento.",
		  "foreach": "forEach não espera callbacks async, por isso \"all saved\" aparece cedo demais. Use for...of com await, ou Promise.all.",
		  "alias": "Isto não copia a lista, aponta para a mesma, por isso o push altera a original. Use [...original].",
		  "default": "A lista por defeito é criada uma vez e partilhada por todas as chamadas. Use bag=None e crie uma lista dentro da função.",
		  "sql": "Juntar a entrada do utilizador à consulta permite injeção de SQL. Use uma consulta parametrizada.",
		  "var": "var é partilhado por todo o ciclo, por isso cada callback vê o último i (3). Use let."
		 }
		},
		playPage: {
		 "title": "Tiny Wars",
		 "lead": "Defenda o seu castelo e derrube o deles. Três minutos por batalha, e cada batalha soma glória ao seu lado.",
		 "metaDesc": "Jogue Tiny Wars: uma batalha de castelos de três minutos. Escolha um lado e lute na guerra semanal.",
		 "canvasLabel": "O campo de batalha: o seu castelo à esquerda, o do inimigo à direita, com pequenas tropas a marchar entre eles.",
		 "quit": "Sair da batalha",
		 "lobby": {
		  "nameLabel": "O seu nome",
		  "namePlaceholder": "Pequeno Comandante",
		  "sideLabel": "Escolha o seu lado",
		  "diffLabel": "Dificuldade",
		  "diff": {
		   "easy": "Fácil",
		   "normal": "Normal",
		   "hard": "Difícil"
		  },
		  "start": "Começar batalha"
		 },
		 "how": {
		  "title": "Como jogar",
		  "steps": [
		   "Gaste ouro em tropas. O ouro cresce sozinho.",
		   "Os cavaleiros vencem magos e padeiros de perto, os arqueiros atingem cavaleiros ao longe, os magos esmagam multidões e os padeiros curam o exército.",
		   "Toque a corneta para lançar o exército. Derrube o castelo deles, ou tenha o mais forte quando o tempo acabar."
		  ],
		  "keys": "Teclas: 1 a 4 enviam tropas, H toca a corneta."
		 },
		 "hud": {
		  "gold": "Ouro",
		  "horn": "Corneta de guerra",
		  "time": "Tempo restante",
		  "you": "Você",
		  "enemy": "Inimigo",
		  "ready": "Pronta"
		 },
		 "units": {
		  "knight": "Cavaleiro",
		  "archer": "Arqueiro",
		  "wizard": "Mago",
		  "baker": "Padeiro"
		 },
		 "result": {
		  "win": "Vitória!",
		  "lose": "Derrota",
		  "draw": "Empate",
		  "glory": "Glória ganha: {n}",
		  "kills": "Tropas inimigas derrotadas: {n}",
		  "castle": "O seu castelo está a {n}%",
		  "time": "Duração da batalha: {n} segundos",
		  "offline": "Modo de treino: a sua glória fica guardada neste dispositivo. Junta-se à guerra partilhada quando o servidor for ligado.",
		  "sending": "A somar a sua glória à guerra…",
		  "sent": "A sua glória foi somada à guerra semanal.",
		  "failed": "Não foi possível contactar o servidor da guerra. A sua glória fica guardada neste dispositivo.",
		  "locked": "Está preso ao primeiro lado esta semana, por isso a glória foi para ele.",
		  "slow": "Demasiadas batalhas muito depressa. Esta só conta neste dispositivo.",
		  "record": "O seu registo: {w} vitórias em {b} batalhas, {g} de glória.",
		  "again": "Lutar outra vez",
		  "change": "Mudar de lado"
		 },
		 "war": {
		  "title": "A guerra semanal",
		  "lead": "Cada batalha soma glória ao seu lado. O placar recomeça todas as segundas-feiras.",
		  "offline": "Modo de treino por agora: o placar partilhado aparece quando o servidor da guerra for ligado.",
		  "next": "A seguir: batalhas ao vivo contra outros jogadores.",
		  "village": "Visitar a aldeia",
		  "back": "Voltar aos jogos"
		 }
		},
		villagePage: {
		 "title": "Tiny Wars: a aldeia",
		 "lead": "É aqui que vive a gente miúda. Veja-os trabalhar, discutir e ir para a guerra, e conheça o elenco.",
		 "metaDesc": "A aldeia do Tiny Wars: conheça a gente miúda e as personagens do jogo.",
		 "stageTitle": "A aldeia",
		 "stageLabel": "Uma aldeia com casas e árvores onde pequenas pessoas passeiam.",
		 "stageHint": "Toque num aldeão para lhe dar um nome e uma profissão, ou acabar com ele. Estão escondidos? Use o botão em baixo à esquerda para os trazer de volta.",
		 "castTitle": "O elenco",
		 "castLead": "Oito personagens vivem aqui hoje. Toque em alguém na aldeia e pode tornar-se uma delas.",
		 "stats": {
		  "hp": "PV",
		  "power": "Força",
		  "reach": "Alcance",
		  "speed": "Velocidade"
		 },
		 "melee": "Corpo a corpo",
		 "ranged": "À distância",
		 "roles": [
		  {
		   "name": "Cavaleiro",
		   "blurb": "Firme e resistente. Lidera a carga quando soa a corneta de guerra."
		  },
		  {
		   "name": "Mago",
		   "blurb": "Fulmina inimigos ao longe e é frágil de perto."
		  },
		  {
		   "name": "Padeiro",
		   "blurb": "Acorda antes do amanhecer e luta com o rolo da massa se o provocarem."
		  },
		  {
		   "name": "Construtor",
		   "blurb": "Levanta muros e arranja telhados. Surpreendentemente robusto."
		  },
		  {
		   "name": "Agricultor",
		   "blurb": "Mantém a aldeia alimentada. Não veio para lutar."
		  },
		  {
		   "name": "Bardo",
		   "blurb": "Ágil, com uma canção para cada ocasião."
		  },
		  {
		   "name": "Mercador",
		   "blurb": "Sabe o preço de tudo, até da paz."
		  },
		  {
		   "name": "Arqueiro",
		   "blurb": "Mantém a distância e a mão firme."
		  }
		 ],
		 "lockedTitle": "Ainda por vir",
		 "lockedLead": "Mais personagens a caminho. Algumas não são o que espera.",
		 "locked": [
		  "Curandeiro",
		  "Gatuno",
		  "Xamã",
		  "Domador de dragões",
		  "Robô",
		  "Ninja"
		 ],
		 "lockedBadge": "Em breve",
		 "follow": "Acompanhar o progresso",
		 "back": "Voltar aos jogos"
		},
		gamesPage: {
		 "title": "Jogos",
		 "lead": "Pequenos jogos online, construídos um de cada vez. O primeiro está a caminho e os outros estão na fila.",
		 "metaDesc": "Jogos online de Edwin Anajemba. O Tiny Wars está a caminho, com mais na fila.",
		 "nowTitle": "A caminho",
		 "nextTitle": "Na fila",
		 "notify": "Avisar-me",
		 "follow": "Acompanhar o progresso",
		 "peek": "Conhecer a gente miúda",
		 "play": "Jogar",
		 "tags": {
		  "realtime": "Tempo real",
		  "racing": "Corrida arcade",
		  "daily": "Diário",
		  "solo": "Solo + classificação",
		  "canvas": "Tela partilhada",
		  "live": "Evento ao vivo"
		 },
		 "items": {
		  "tiny-wars": {
		   "name": "Tiny Wars",
		   "pitch": "Um mundo partilhado de gente miúda. Escolha vermelho, azul ou verde, crie uma personagem e lute a guerra semanal pelo seu lado."
		  },
		  "daily-bug-hunt": {
		   "name": "Daily Bug Hunt",
		   "pitch": "Um enigma de programação por dia, igual para todos. Encontre o bug, mantenha a sequência e partilhe o resultado."
		  },
		  "deploy-rush": {
		   "name": "Deploy Rush",
		   "pitch": "Três voltas, cinco rivais e uma estrada cheia de trânsito. Vire, trave e queime o nitro para bater o seu recorde."
		  },
		  "code-race": {
		   "name": "Code Race",
		   "pitch": "Corra ao vivo contra outras pessoas em excertos de código reais e suba na classificação."
		  },
		  "tiny-kingdom": {
		   "name": "Tiny Kingdom",
		   "pitch": "Toque para fazer crescer uma aldeia que rende mesmo quando está fora. Troque com amigos e chegue ao topo."
		  },
		  "pixel-canvas": {
		   "name": "Pixel Canvas",
		   "pitch": "Uma tela enorme, um píxel de cada vez. Junte-se a uma equipa e conquiste território."
		  },
		  "quiz-night": {
		   "name": "Quiz Night",
		   "pitch": "Um quiz semanal ao vivo com rondas africanas e de tecnologia, classificação e prémios financiados por patrocinadores."
		  }
		 }
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
			lead: "Projetos selecionados: microsserviços, apps em tempo real, autenticação, APIs financeiras, ML e smart contracts.",
			viewCode: "Ver código",
			metaDesc:
				"Código selecionado de Edwin Anajemba: microsserviços NestJS, apps em tempo real, autenticação, APIs financeiras, machine learning e contratos Solidity.",
		},
		contactPage: {
			tab: "Contacto",
			metaDesc:
				"Contacte Edwin Anajemba para projetos freelance, liderança de produto ou colaborações.",
			aboutProduct: "Sobre {name}",
			backTo: "Voltar a {name}",
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
			headline: "Engenheiro de software de produto.",
			lead: "Lidero a equipa de produto na JointEarn e construo as plataformas web e a infraestrutura cloud por trás dos produtos, dos pagamentos à Web3.",
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
		"beezylabs-store": {
			pitch: "Uma pequena loja com o software, as integrações, os modelos e os scripts que construo.",
			audience: "Programadores e equipas pequenas que querem código pronto a usar",
			highlights: ["Descarregamento imediato com uma chave de licença por compra", "Pagamento por cartão, nairas ou USDC", "Sem palavras-passe: entre com uma ligação de uso único enviada por email"],
		},
		beezyapply: {
			pitch: "Otimização de CV com IA para quem procura emprego na Nigéria.",
			audience: "Quem procura emprego na Nigéria",
		},
	},
	projects: [
		"Microsserviços gRPC em NestJS: serviços de utilizador e carteira com débitos seguros por transação, Prisma em PostgreSQL, Docker, CI e testes de ponta a ponta.",
		"Chat em tempo real um-para-um: frontend em React e TypeScript, backend em Express e Socket.io, mensagens guardadas em PostgreSQL, testado e compilado em CI.",
		"Sistema de previsão de jogos de futebol: modelos XGBoost e LightGBM, deteção de apostas de valor a partir de odds em direto e previsões diárias publicadas pelo GitHub Actions.",
		"Contratos Solidity para a Recylox, uma dApp de reciclagem: um token ERC20 e registo, depósitos, validação e pagamentos de recicladores e recolhedores, com Hardhat.",
		"Backend de autenticação por tokens: registo, início de sessão, redefinição de palavra-passe com tokens no Redis, limitação de pedidos, docs Swagger, Docker e configurações de deploy.",
		"APIs de demonstração de fluxos de caixa e reconciliação bancária construídas com Node.js, Express e PostgreSQL.",
		"Backend de API REST para a Palimart Cosmetics, parte da plataforma de comércio eletrónico cujo backend giri durante três anos.",
	],
};

export default pt;
