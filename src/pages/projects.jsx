import React, { useEffect } from "react";
import { Helmet } from "react-helmet";

import Layout from "../site/Layout";

import { useI18n } from "../i18n";

const Projects = () => {
	const { site: SITE, ui, projects } = useI18n();
	const t = ui.projectsPage;
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<Layout current="projects">
			<Helmet>
				<title>{`${t.tab} | ${SITE.name}`}</title>
				<meta
					name="description"
					content={t.metaDesc}
				/>
			</Helmet>

			<section className="page-hero">
				<div className="wrap">
					<h1 className="page-hero__title">{t.title}</h1>
					<p className="page-hero__lead">{t.lead}</p>
				</div>
			</section>

			<section className="section">
				<div className="wrap">
					<ul className="repo-list">
						{projects.map((project) => (
							<li className="repo" key={project.link}>
								<div>
									<h2 className="repo__title">{project.title}</h2>
									<p className="repo__text">{project.description}</p>
								</div>
								<div className="repo__side">
									<span className="repo__tech">{project.tech}</span>
									<a href={project.link} target="_blank" rel="noreferrer">
										{t.viewCode}
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
