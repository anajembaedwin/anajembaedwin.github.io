export type ProjectLink = {
  label: string;
  href: string;
  variant: "primary" | "secondary";
};

export type Project = {
  slug: string;
  image: string;
  tags: string[];
  title: string;
  description: string;
  links: ProjectLink[];
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "chertnodes",
    image: "/projects/chertnodes.png",
    tags: ["HTML", "SCSS", "Python", "Flask"],
    title: "ChertNodes",
    description: "Minecraft servers hosting",
    links: [
      { label: "Live", href: "#", variant: "primary" },
      { label: "Cached", href: "#", variant: "secondary" },
    ],
    featured: true,
  },
  {
    slug: "kahoot-answers-viewer",
    image: "/projects/kahoot-answers-viewer.png",
    tags: ["CSS", "Express", "Node.js"],
    title: "Kahoot Answers Viewer",
    description: "Get answers to your kahoot quiz",
    links: [{ label: "Live", href: "#", variant: "primary" }],
    featured: true,
  },
  {
    slug: "protectx",
    image: "/projects/protectx.png",
    tags: ["React", "Express", "Discord.js", "Node.js"],
    title: "ProtectX",
    description: "Discord anti-crash bot",
    links: [{ label: "Cached", href: "#", variant: "secondary" }],
    featured: true,
  },
  {
    slug: "kotik-bot",
    image: "/projects/kotik-bot.png",
    tags: ["HTML", "CSS", "JS"],
    title: "Kotik Bot",
    description: "Multi-functional discord bot",
    links: [{ label: "Live", href: "#", variant: "primary" }],
  },
  {
    slug: "portfolio",
    image: "/projects/portfolio.png",
    tags: ["Vue", "TS", "Less"],
    title: "Portfolio",
    description: "You're using it rn",
    links: [{ label: "Github", href: "#", variant: "primary" }],
  },
  {
    slug: "bot-boilerplate",
    image: "",
    tags: ["Discord.js", "TS", "JS"],
    title: "Bot boilerplate",
    description: "Start creating scalable discord.js bot with typescript in seconds",
    links: [{ label: "Github", href: "#", variant: "primary" }],
  },
  {
    slug: "my-blog",
    image: "",
    tags: ["VUE", "CSS", "JS"],
    title: "My blog",
    description: "Front-end of my future blog website written in vue",
    links: [{ label: "Github", href: "#", variant: "primary" }],
  },
  {
    slug: "chess-pro",
    image: "",
    tags: ["Figma"],
    title: "Chess pro",
    description: "Figma landing page about service for viewing chess tournaments",
    links: [{ label: "Figma", href: "#", variant: "primary" }],
  },
  {
    slug: "crash-protect-website",
    image: "",
    tags: ["Figma"],
    title: "Crash protect website",
    description: "Figma template for website about anti-raid, anti-crash discord bot",
    links: [{ label: "Figma", href: "#", variant: "primary" }],
  },
  {
    slug: "css-experiments",
    image: "",
    tags: ["HTML", "CSS"],
    title: "CSS experiments",
    description: "Collection of my different little projects in css",
    links: [{ label: "Live", href: "#", variant: "primary" }],
  },
  {
    slug: "web-dev-nvim-config",
    image: "",
    tags: ["Lua", "NeoVim"],
    title: "Web Dev nvim config",
    description: "Config for neovim perfect for web developer",
    links: [{ label: "Github", href: "#", variant: "primary" }],
  },
  {
    slug: "ooku",
    image: "",
    tags: ["Python", "Quart", "HTML"],
    title: "Ooku",
    description: "Simple link shortener with auth",
    links: [{ label: "Live", href: "#", variant: "primary" }],
  },
  {
    slug: "school-website",
    image: "",
    tags: ["Figma"],
    title: "School website",
    description: "Figma template website for my school",
    links: [{ label: "Figma", href: "#", variant: "primary" }],
  },
];

export type SkillCategory = {
  category: string;
  items: string[];
};

export const skills: SkillCategory[] = [
  { category: "Languages", items: ["TypeScript", "Lua", "Python", "JavaScript"] },
  { category: "Databases", items: ["SQLite", "PostgreSQL", "Mongo"] },
  { category: "Tools", items: ["VSCode", "Neovim", "Linux", "Figma", "XFCE", "Arch", "Git", "Font Awesome"] },
  { category: "Frameworks", items: ["React", "Vue", "Disnake", "Discord.js", "Flask", "Express.js"] },
  { category: "Other", items: ["HTML", "CSS", "EJS", "SCSS", "REST", "Jinja"] },
];

export type SocialLink = {
  name: string;
  href: string;
  icon: "github" | "dribbble" | "figma" | "twitter" | "discord" | "email";
};

export const socials: SocialLink[] = [
  { name: "GitHub", href: "https://github.com/", icon: "github" },
  { name: "Dribbble", href: "https://dribbble.com/", icon: "dribbble" },
  { name: "Figma", href: "https://figma.com/", icon: "figma" },
];

export const contact = {
  discord: "Elias#1234",
  email: "elias@elias.me",
  support: {
    label: "Support me here",
    address: "4149500120690030",
  },
};
