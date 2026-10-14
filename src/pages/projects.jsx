import React, { useEffect } from "react";
import { Helmet } from "react-helmet";

import Layout from "../site/Layout";

import INFO from "../data/user";
import { SITE } from "../data/site";

const Projects = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<Layout current="projects">
			<Helmet>
				<title>{`Code | ${SITE.name}`}</title>
				<meta
					name="description"
					content="Open-source projects by Edwin Anajemba: booking platforms, e-commerce backends, and productivity tools."
				/>
			</Helmet>

			<section className="page-hero">
				<div className="wrap">
					<h1 className="page-hero__title">Code on GitHub</h1>
					<p className="page-hero__lead">
						Open-source projects: booking platforms, e-commerce backends, and
						tools.
					</p>
				</div>
			</section>

			<section className="section">
				<div className="wrap">
					<ul className="repo-list">
						{INFO.projects.map((project) => (
							<li className="repo" key={project.link}>
								<div>
									<h2 className="repo__title">{project.title}</h2>
									<p className="repo__text">{project.description}</p>
								</div>
								<div className="repo__side">
									<span className="repo__tech">{project.tech}</span>
									<a href={project.link} target="_blank" rel="noreferrer">
										View code
									</a>
								</div>
							</li>
						))}
					</ul>
				</div>
			</section>
		</Layout>
	);
};

export default Projects;
