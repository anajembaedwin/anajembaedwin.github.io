import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import Layout from "../site/Layout";
import StatusChip from "../site/StatusChip";

import { useI18n, fmt } from "../i18n";

const Products = () => {
	const { site, ui, products } = useI18n();
	const t = ui.productsPage;

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<Layout current="products">
			<Helmet>
				<title>{`${ui.nav.products} | ${site.name}`}</title>
				<meta name="description" content={t.metaDesc} />
			</Helmet>

			<section className="page-hero">
				<div className="wrap">
					<h1 className="page-hero__title">{t.title}</h1>
					<p className="page-hero__lead">{t.lead}</p>
				</div>
			</section>

			<section className="section">
				<div className="wrap">
					{products.length === 0 ? (
						<p className="prose">
							{fmt(t.empty, {
								link: <a href="/#contact">{t.getInTouch}</a>,
							})}
						</p>
					) : (
						<div className="product-grid">
							{products.map((product) => (
								<article className="product-card" key={product.slug}>
									<StatusChip status={product.status} />
									<h2>{product.name}</h2>
									<p>{product.pitch}</p>
									<Link to={`/products/${product.slug}`}>
										{fmt(ui.viewProduct, { name: product.name })}
									</Link>
								</article>
							))}
						</div>
					)}
				</div>
			</section>
		</Layout>
	);
};

export default Products;
