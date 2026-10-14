import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import Layout from "../site/Layout";
import { useI18n } from "../i18n";

const Notfound = () => {
	const { site, ui } = useI18n();
	const t = ui.notFound;
	return (
		<Layout>
			<Helmet>
				<title>{`${t.tab} | ${site.name}`}</title>
			</Helmet>
			<section className="page-hero">
				<div className="wrap">
					<h1 className="page-hero__title">{t.title}</h1>
					<p className="page-hero__lead">{t.lead}</p>
					<div className="hero__actions">
						<Link className="btn btn--hot" to="/">
							{t.back}
						</Link>
					</div>
				</div>
			</section>
		</Layout>
	);
};

export default Notfound;
