import React from "react";

const ITEMS = [
	"TypeScript",
	"Node.js",
	"NestJS",
	"React",
	"Next.js",
	"Python",
	"FastAPI",
	"PostgreSQL",
	"Redis",
	"AWS",
	"Docker",
	"GitHub Actions",
	"CI/CD",
	"Solidity",
	"Hyperledger",
	"Claude API",
];

const Row = ({ hidden }) => (
	<ul className="marquee__row" aria-hidden={hidden ? "true" : undefined}>
		{ITEMS.map((item) => (
			<li key={item}>{item}</li>
		))}
	</ul>
);

const Marquee = () => (
	<section className="marquee" aria-label="Technologies I work with">
		<div className="marquee__track">
			<Row />
			<Row hidden />
		</div>
	</section>
);

export default Marquee;
