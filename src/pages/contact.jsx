import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet";

import Layout from "../site/Layout";
import ContactForm from "../site/ContactForm";

import INFO from "../data/user";
import { SITE } from "../data/site";
import PRODUCTS from "../data/products";

const Contact = () => {
	const [params] = useSearchParams();
	const topic = params.get("topic");
	const product = PRODUCTS.find((item) => item.slug === topic);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const fallbackType = SITE.contact.collabTypes[SITE.contact.collabTypes.length - 1];

	return (
		<Layout current="contact">
			<Helmet>
				<title>{`Contact | ${SITE.name}`}</title>
				<meta
					name="description"
					content="Get in touch with Edwin Anajemba about freelance projects, product leadership, or collaborations."
				/>
			</Helmet>

			<section className="page-hero">
				<div className="wrap">
					<h1 className="page-hero__title">
						{product ? `About ${product.name}` : SITE.contact.title}
					</h1>
					<p className="page-hero__lead">
						{product
							? "Leave your details and I'll let you know how it's going."
							: SITE.contact.lede}
					</p>
				</div>
			</section>

			<section className="section">
				<div className="wrap two-col">
					<div className="contact__card contact__card--plain">
						<ContactForm
							defaultType={product ? fallbackType : undefined}
							defaultMessage={
								product ? `I'd like to hear about ${product.name}.` : ""
							}
						/>
					</div>
					<div>
						<p className="prose">
							You can also write directly:{" "}
							<a href={`mailto:${INFO.main.email}`}>{INFO.main.email}</a>
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
