import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import Layout from "../site/Layout";

const Notfound = () => (
	<Layout>
		<Helmet>
			<title>Page not found | Edwin Anajemba</title>
		</Helmet>
		<section className="page-hero">
			<div className="wrap">
				<h1 className="page-hero__title">Page not found</h1>
				<p className="page-hero__lead">
					That page doesn't exist or has moved.
				</p>
				<div className="hero__actions">
					<Link className="btn btn--hot" to="/">
						Back to home
					</Link>
				</div>
			</div>
		</section>
	</Layout>
);

export default Notfound;
