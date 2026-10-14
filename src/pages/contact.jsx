import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet";

import Layout from "../site/Layout";
import ContactForm from "../site/ContactForm";

import INFO from "../data/user";
import GAMES from "../data/games";
import { useI18n, fmt, fmtText } from "../i18n";

const Contact = () => {
	const { site: SITE, ui, products: PRODUCTS } = useI18n();
	const t = ui.contactPage;
	const [params] = useSearchParams();
	const topic = params.get("topic");
	const game = GAMES.find((item) => item.slug === topic);
	const product =
		PRODUCTS.find((item) => item.slug === topic) ||
		(game ? { slug: game.slug, name: ui.gamesPage.items[game.slug].name } : null);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const fallbackIndex = SITE.contact.collabTypes.length - 1;

	return (
		<Layout current="contact">
			<Helmet>
				<title>{`${t.tab} | ${SITE.name}`}</title>
				<meta name="description" content={t.metaDesc} />
			</Helmet>

			<section className="page-hero">
				<div className="wrap">
					<h1 className="page-hero__title">
						{product
							? fmtText(t.aboutProduct, { name: product.name })
							: SITE.contact.title}
					</h1>
					<p className="page-hero__lead">
						{product
							? t.productLead
							: SITE.contact.lede}
					</p>
				</div>
			</section>

			<section className="section">
				<div className="wrap two-col">
					<div className="contact__card contact__card--plain">
						<ContactForm
							defaultTypeIndex={product ? fallbackIndex : undefined}
							defaultMessage={
								product ? fmtText(t.productMessage, { name: product.name }) : ""
							}
						/>
					</div>
					<div>
						<p className="prose">
							{fmt(t.alt, {
								email: (
									<a href={`mailto:${INFO.main.email}`}>{INFO.main.email}</a>
								),
							})}
						</p>
						<p className="prose">
							<a href={INFO.socials.linkedin} target="_blank" rel="noreferrer">
								LinkedIn
							</a>{" "}
							·{" "}
							<a href={INFO.socials.github} target="_blank" rel="noreferrer">
								GitHub
							</a>
						</p>
					</div>
				</div>
			</section>
		</Layout>
	);
};

export default Contact;
