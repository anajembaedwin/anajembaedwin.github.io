import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import Layout from "../site/Layout";

import { useI18n } from "../i18n";

const AiSolutions = () => {
	const { site, ui } = useI18n();
	const t = ui.aiPage;

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<Layout current="ai">
			<Helmet>
				<title>{`${ui.nav.ai} | ${site.name}`}</title>
				<meta name="description" content={t.metaDesc} />
			</Helmet>

			<section className="page-hero">
				<div className="wrap">
					<h1 className="page-hero__title">{t.title}</h1>
					<p className="page-hero__lead">{t.lead}</p>
					<div className="ai-cta-row">
						<Link className="btn btn--hot" to="/#contact">
							{t.cta}
						</Link>
						<a className="btn btn--ghost" href="#offer">
							{t.ctaSecondary}
						</a>
					</div>
				</div>
			</section>

			<section className="section" id="offer">
				<div className="wrap">
					<h2 className="section-title">{t.areasTitle}</h2>
					<p className="section-lede">{t.areasLede}</p>
					<div className="product-grid ai-grid">
						{t.areas.map((area) => (
							<article className="product-card" key={area.title}>
								<h3>{area.title}</h3>
								<p>{area.text}</p>
								<ul className="ai-list">
									{area.items.map((item) => (
										<li key={item}>{item}</li>
									))}
								</ul>
							</article>
						))}
					</div>
				</div>
			</section>

			<section className="section section--wash">
				<div className="wrap">
					<h2 className="section-title">{t.useCasesTitle}</h2>
					<p className="section-lede">{t.useCasesLede}</p>
					<div className="ai-usecases">
						{t.useCases.map((u) => (
							<div className="step" key={u.title}>
								<div className="step__title">{u.title}</div>
								<div className="step__text">{u.text}</div>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="section">
				<div className="wrap">
					<h2 className="section-title">{t.processTitle}</h2>
					<ol className="steps ai-steps">
						{t.process.map((step, i) => (
							<li className="step" key={step.title}>
								<div className="step__label">
									{ui.step} {i + 1}
								</div>
								<div className="step__title">{step.title}</div>
								<div className="step__text">{step.text}</div>
							</li>
						))}
					</ol>
				</div>
			</section>

			<section className="section section--wash">
				<div className="wrap">
					<h2 className="section-title">{t.whyTitle}</h2>
					<ul className="ai-list ai-list--why">
						{t.why.map((line) => (
							<li key={line}>{line}</li>
						))}
					</ul>
				</div>
			</section>

			<section className="section">
				<div className="wrap ai-final">
					<h2 className="section-title">{t.ctaTitle}</h2>
					<p className="section-lede">{t.ctaText}</p>
					<Link className="btn btn--hot ai-final__btn" to="/#contact">
						{t.cta}
					</Link>
				</div>
			</section>
		</Layout>
	);
};

export default AiSolutions;
