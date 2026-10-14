import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import Layout from "../site/Layout";
import ResponsePanel from "../site/ResponsePanel";
import Diagram from "../site/Diagram";
import StatusChip from "../site/StatusChip";
import ContactForm from "../site/ContactForm";
import Floaters from "../site/Floaters";
import Marquee from "../site/Marquee";
import Testimonials from "../site/Testimonials";

import INFO from "../data/user";
import LIVE from "../data/live";
import { useI18n, fmt } from "../i18n";

const Homepage = () => {
	const { site: SITE, ui, products: PRODUCTS } = useI18n();
	useEffect(() => {
		if (!window.location.hash) {
			window.scrollTo(0, 0);
		}
	}, []);

	// Fade sections in as they scroll into view.
	useEffect(() => {
		if (
			window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
			!("IntersectionObserver" in window)
		) {
			return undefined;
		}
		const root = document.documentElement;
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add("is-in");
						observer.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.1, rootMargin: "0px 0px -5% 0px" }
		);
		document
			.querySelectorAll("[data-reveal]")
			.forEach((el) => observer.observe(el));
		root.classList.add("reveal-ready");
		return () => {
			observer.disconnect();
			root.classList.remove("reveal-ready");
		};
	}, []);

	return (
		<Layout current="home">
			<Helmet>
				<title>{`${SITE.name} | ${SITE.hero.headline.replace(/\.$/, "")}`}</title>
			</Helmet>

			<section className="hero">
				<Floaters />
				<div className="wrap hero__grid">
					<div>
						<h1 className="hero__title">{SITE.hero.headline}</h1>
						<p className="hero__lead">{SITE.hero.lead}</p>
						<p className="hero__avail">
							<span aria-hidden="true" />
							{ui.openToContracts}
						</p>
						<div className="hero__actions">
							<Link className="btn btn--hot" to="/#contact" data-react="🚀,✨,💜">
								{ui.hire}
							</Link>
							<Link className="btn btn--ghost" to="/about">
								{ui.aboutMe}
							</Link>
						</div>
					</div>
					<ResponsePanel lines={SITE.response} />
				</div>
			</section>

			<section className="proof" aria-label={ui.proofLabel}>
				<div className="wrap proof__grid">
					{SITE.proof.map((item) => (
						<div className="proof__item" key={item.name}>
							<div className="proof__name">{item.name}</div>
							<div className="proof__text">{item.text}</div>
						</div>
					))}
				</div>
			</section>

			<Marquee />

			<section className="section" id="services">
				<div className="wrap" data-reveal>
					<h2 className="section-title">{SITE.services.title}</h2>
					<p className="section-lede">{SITE.services.lede}</p>
					<div className="services">
						{SITE.services.items.map((service, index) => (
							<details
								className="service"
								key={service.title}
								open={index === 0}
							>
								<summary>{service.title}</summary>
								<div className="service__body">
									<p>{service.text}</p>
									<ul>
										{service.included.map((line) => (
											<li key={line}>{line}</li>
										))}
									</ul>
								</div>
							</details>
						))}
					</div>
				</div>
			</section>

			<section className="section section--wash">
				<div className="wrap" data-reveal>
					<h2 className="section-title">{SITE.process.title}</h2>
					<ol className="steps">
						{SITE.process.steps.map((step, i) => (
							<li className="step" key={step.title}>
								<div className="step__label">{ui.step} {i + 1}</div>
								<div className="step__title">{step.title}</div>
								<div className="step__text">{step.text}</div>
							</li>
						))}
					</ol>
				</div>
			</section>

			<section className="section" id="work">
				<div className="wrap" data-reveal>
					<h2 className="section-title">{SITE.work.title}</h2>
					<div className="work">
						{SITE.work.items.map((item) => (
							<article className="work__row" key={item.name}>
								<div>
									<h3 className="work__name">{item.name}</h3>
									<div className="work__tag">{item.tag}</div>
									{item.link && (
										<a
											className="work__link"
											href={item.link.url}
											target="_blank"
											rel="noreferrer"
										>
											{item.link.label}
										</a>
									)}
								</div>
								<div>
									<div className="work__label">{ui.whatIDid}</div>
									{item.role}
								</div>
								{item.outcome && (
									<div>
										<div className="work__label">{ui.outcome}</div>
										{item.outcome}
									</div>
								)}
							</article>
						))}
					</div>
					<p className="work__more">
						{fmt(ui.codeSamples, {
							projects: <Link to="/projects">{ui.projectsLink}</Link>,
							github: (
								<a href={INFO.socials.github} target="_blank" rel="noreferrer">
									GitHub
								</a>
							),
						})}
					</p>
				</div>
			</section>

			<section className="section section--wash" id="live">
				<div className="wrap" data-reveal>
					<h2 className="section-title">{ui.liveTitle}</h2>
					<p className="section-lede">{ui.liveLede}</p>
					<div className="product-grid">
						{LIVE.map((item) => (
							<article className="product-card" key={item.id}>
								{item.logo && (
									<img className="live__logo" src={item.logo} alt="" loading="lazy" />
								)}
								<StatusChip status="live" />
								<h3>{item.name}</h3>
								<p>{ui.liveItems[item.id]}</p>
								<a href={item.url} target="_blank" rel="noreferrer">
									{ui.visitSite} ↗
								</a>
							</article>
						))}
					</div>
				</div>
			</section>

			<section className="section section--blueprint">
				<div className="wrap" data-reveal>
					<h2 className="section-title">{SITE.diagram.title}</h2>
					<p className="section-lede">{SITE.diagram.lede}</p>
					<div
						className="diagram-scroll"
						tabIndex="0"
						role="region"
						aria-label="System diagram"
					>
						<Diagram />
					</div>
				</div>
			</section>

			{PRODUCTS.length > 0 && (
				<section className="section" id="products">
					<div className="wrap" data-reveal>
						<div className="section-head">
							<h2 className="section-title">{ui.productsTitle}</h2>
							<Link to="/products">{ui.allProducts}</Link>
						</div>
						<div className="product-grid">
							{PRODUCTS.map((product) => (
								<article className="product-card" key={product.slug}>
									<StatusChip status={product.status} />
									<h3>{product.name}</h3>
									<p>{product.pitch}</p>
									<Link to={`/products/${product.slug}`}>
										{fmt(ui.viewProduct, { name: product.name })}
									</Link>
								</article>
							))}
						</div>
					</div>
				</section>
			)}

			<section className="section section--wash">
				<div className="wrap two-col" data-reveal>
					<div>
						<h2 className="section-title">{SITE.leadership.title}</h2>
						<p className="prose">{SITE.leadership.text}</p>
					</div>
					<ul className="principles">
						{SITE.leadership.principles.map((line) => (
							<li key={line}>{line}</li>
						))}
					</ul>
				</div>
			</section>

			<section className="section" id="about">
				<div className="wrap about-teaser" data-reveal>
					<div>
						<h2 className="section-title">{SITE.about.title}</h2>
						<p className="prose">{SITE.about.text[0]}</p>
					</div>
					<Link className="btn btn--hot" to="/about">
						{ui.aboutMe}
					</Link>
				</div>
			</section>

			<Testimonials items={SITE.testimonials} />

			<section className="contact" id="contact">
				<div className="wrap two-col" data-reveal>
					<div>
						<h2 className="contact__title">{SITE.contact.title}</h2>
						<p className="contact__lede">{SITE.contact.lede}</p>
						{SITE.contact.responseTimes && (
							<dl className="response-times">
								{SITE.contact.responseTimes.map((row) => (
									<div key={row.channel}>
										<dt>{row.channel}</dt>
										<dd>{row.time}</dd>
									</div>
								))}
							</dl>
						)}
						<p className="contact__alt">
							{fmt(ui.contactAlt, {
								email: (
									<a href={`mailto:${INFO.main.email}`}>{INFO.main.email}</a>
								),
								linkedin: (
									<a
										href={INFO.socials.linkedin}
										target="_blank"
										rel="noreferrer"
									>
										LinkedIn
									</a>
								),
							})}
						</p>
					</div>
					<div className="contact__card">
						<ContactForm />
					</div>
				</div>
			</section>
		</Layout>
	);
};

export default Homepage;
