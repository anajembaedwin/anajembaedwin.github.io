import React from "react";
import { Link } from "react-router-dom";
import { faHandshake } from "@fortawesome/free-solid-svg-icons";

import Card from "../common/card";

import INFO from "../../data/user";

import "./styles/workWithMe.css";

const SERVICES = [
	"Backend and API development (TypeScript/NestJS, Python/FastAPI)",
	"Payments and e-commerce platforms",
	"Smart contracts and Web3 integrations (Solidity, Polygon)",
	"AWS deployment and CI/CD (Docker, GitHub Actions)",
	"AI and LLM integration (Claude API)",
];

const WorkWithMe = () => {
	return (
		<div className="work-with-me">
			<Card
				icon={faHandshake}
				title="Work with me"
				body={
					<div className="work-with-me-body">
						<div className="work-with-me-intro">
							Available for select freelance and contract projects.
						</div>

						<ul className="work-with-me-services">
							{SERVICES.map((service) => (
								<li key={service}>{service}</li>
							))}
						</ul>

						<div className="work-with-me-actions">
							<a
								className="work-with-me-link"
								href={`mailto:${INFO.main.email}`}
							>
								Email me
							</a>
							<a
								className="work-with-me-link"
								href={INFO.socials.linkedin}
								target="_blank"
								rel="noreferrer"
							>
								LinkedIn
							</a>
							<Link className="work-with-me-link" to="/contact">
								Contact page
							</Link>
						</div>
					</div>
				}
			/>
		</div>
	);
};

export default WorkWithMe;
