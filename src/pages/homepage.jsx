import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import Layout from "../site/Layout";
import ResponsePanel from "../site/ResponsePanel";
import Diagram from "../site/Diagram";
import StatusChip from "../site/StatusChip";
import ContactForm from "../site/ContactForm";

import INFO from "../data/user";
import { SITE } from "../data/site";
import PRODUCTS from "../data/products";

const Homepage = () => {
	useEffect(() => {
		if (!window.location.hash) {
			window.scrollTo(0, 0);
		}
	}, []);

	return (
		<Layout current="home">
			<Helmet>
				<title>{`${SITE.name} | ${SITE.role}`}</title>
			</Helmet>

			<section className="hero">
				<div className="wrap hero__grid">
					<div>
						<h1 className="hero__title">{SITE.hero.headline}</h1>
						<p className="hero__lead">{SITE.hero.lead}</p>
						<div className="hero__actions">
							<a className="btn btn--hot" href="#contact">
								Hire me
							</a>
							<Link className="btn btn--ghost" to="/products">
								See my products
							</Link>
						</div>
					</div>
					<ResponsePanel lines={SITE.response} />
				</div>
			</section>

			<section className="proof" aria-label="Where I've worked">
				<div className="wrap proof__grid">
					{SITE.proof.map((item) => (
						<div className="proof__item" key={item.name}>
							<div className="proof__name">{item.name}</div>
							<div className="proof__text">{item.text}</div>
						</div>
					))}
				</div>
			</section>

			<section className="section" id="services">
				<div className="wrap">
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
				<div className="wrap">
					<h2 className="section-title">{SITE.process.title}</h2>
					<ol className="steps">
						{SITE.process.steps.map((step, i) => (
							<li className="step" key={step.title}>
								<div className="step__label">Step {i + 1}</div>
								<div className="step__title">{step.title}</div>
								<div className="step__text">{step.text}</div>
							</li>
						))}
					</ol>
				</div>
			</section>

			<section className="section" id="work">
				<div className="wrap">
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
									<div className="work__label">What I did</div>
									{item.role}
								</div>
								{item.outcome && (
									<div>
										<div className="work__label">Outcome</div>
										{item.outcome}
									</div>
								)}
							</article>
						))}
					</div>
					<p className="work__more">
						Code samples are on{" "}
						<Link to="/projects">the projects page</Link> and{" "}
						<a href={INFO.socials.github} target="_blank" rel="noreferrer">
							GitHub
						</a>
						.
					</p>
				</div>
			</section>

			<section className="section section--blueprint">
				<div className="wrap">
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
					<div className="wrap">
						<div className="section-head">
							<h2 className="section-title">Products I build</h2>
							<Link to="/products">All products</Link>
						</div>
						<div className="product-grid">
							{PRODUCTS.map((product) => (
								<article className="product-card" key={product.slug}>
									<StatusChip status={product.status} />
									<h3>{product.name}</h3>
									<p>{product.pitch}</p>
									<Link to={`/products/${product.slug}`}>
										View {product.name}
									</Link>
								</article>
							))}
						</div>
					</div>
				</section>
			)}

			<section className="section section--wash">
				<div className="wrap two-col">
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
				<div className="wrap about">
					<img
						className="about__photo"
						src={`${process.env.PUBLIC_URL}/edwin-cartoon.svg`}
						alt="Cartoon portrait of Edwin Anajemba"
						width="320"
						height="325"
					/>
					<div>
						<h2 className="section-title">{SITE.about.title}</h2>
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
							<strong>Education.</strong> {SITE.about.education.degree}
						</p>
						<p className="prose edu">
							<strong>Certifications.</strong>{" "}
							{SITE.about.education.certs.join("; ")}.
						</p>
					</div>
				</div>
			</section>

			{SITE.testimonial && (
				<section className="section section--wash">
					<div className="wrap">
						<blockquote className="quote">
							<p>{SITE.testimonial.quote}</p>
							<footer>
								{SITE.testimonial.name}, {SITE.testimonial.role}
							</footer>
						</blockquote>
					</div>
				</section>
			)}

			<section className="contact" id="contact">
				<div className="wrap two-col">
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
							Prefer to write directly?{" "}
							<a href={`mailto:${INFO.main.email}`}>{INFO.main.email}</a>{" "}
							or{" "}
							<a
								href={INFO.socials.linkedin}
								target="_blank"
								rel="noreferrer"
							>
								LinkedIn
							</a>
							.
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
