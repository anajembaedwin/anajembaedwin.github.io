import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

import Layout from "../site/Layout";
import StatusChip from "../site/StatusChip";
import Notfound from "./404";

import { SITE } from "../data/site";
import PRODUCTS from "../data/products";

const ProductDetail = () => {
	const { slug } = useParams();
	const product = PRODUCTS.find((item) => item.slug === slug);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [slug]);

	if (!product) {
		return <Notfound />;
	}

	const notify = `/contact?topic=${product.slug}`;

	return (
		<Layout current="products">
			<Helmet>
				<title>{`${product.name} | ${SITE.name}`}</title>
				<meta name="description" content={product.pitch} />
			</Helmet>

			<section className="page-hero">
				<div className="wrap">
					<Link className="page-hero__back" to="/products">
						All products
					</Link>
					<StatusChip status={product.status} />
					<h1 className="page-hero__title">{product.name}</h1>
					<p className="page-hero__lead">{product.pitch}</p>
					<div className="hero__actions">
						{product.url ? (
							<a
								className="btn btn--hot"
								href={product.url}
								target="_blank"
								rel="noreferrer"
							>
								Open product
							</a>
						) : (
							<Link className="btn btn--hot" to={notify}>
								Get notified
							</Link>
						)}
						<Link className="btn btn--ghost" to={notify}>
							Ask a question
						</Link>
					</div>
				</div>
			</section>

			<section className="section">
				<div className="wrap product-detail">
					{product.audience && (
						<div>
							<h2 className="section-title">Who it's for</h2>
							<p className="prose">{product.audience}</p>
						</div>
					)}
					{product.highlights && product.highlights.length > 0 && (
						<div>
							<h2 className="section-title">What it does</h2>
							<ul className="principles">
								{product.highlights.map((line) => (
									<li key={line}>{line}</li>
								))}
							</ul>
						</div>
					)}
					{product.screenshot && (
						<img
							className="product-detail__shot"
							src={`${process.env.PUBLIC_URL}${product.screenshot}`}
							alt={`${product.name} screenshot`}
						/>
					)}
				</div>
			</section>
		</Layout>
	);
};

export default ProductDetail;
