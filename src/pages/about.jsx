import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import Layout from "../site/Layout";
import AboutSide from "../site/AboutSide";
import { useI18n } from "../i18n";

const About = () => {
	const { site: SITE, ui } = useI18n();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<Layout current="about">
			<Helmet>
				<title>{`${ui.nav.about} | ${SITE.name}`}</title>
				<meta name="description" content={SITE.about.text[0]} />
			</Helmet>

			<section className="page-hero">
				<div className="wrap">
					<h1 className="page-hero__title">{SITE.about.title}</h1>
					<p className="page-hero__lead">{SITE.hero.lead}</p>
				</div>
			</section>

			<section className="section">
				<div className="wrap about">
					<AboutSide />
					<div>
						{SITE.about.text.map((paragraph) => (
							<p className="prose" key={paragraph}>
								{paragraph}
							</p>
						))}
						<dl className="skills">
							{SITE.about.skills.map((skill) => (
								<div className="skills__row" key={skill.group}>
									<dt>{skill.group}</dt>
									<dd>{skill.items.join(", ")}</dd>
								</div>
							))}
						</dl>
						<p className="prose edu">
							<strong>{ui.education}</strong> {SITE.about.education.degree}
						</p>
						<p className="prose edu">
							<strong>{ui.certifications}</strong> {SITE.about.education.certs.join("; ")}.
						</p>
						<div className="hero__actions">
							<Link className="btn btn--hot" to="/#contact">
								{ui.hire}
							</Link>
						</div>
					</div>
				</div>
			</section>
		</Layout>
	);
};

export default About;
