import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import Layout from "../site/Layout";
import StatusChip from "../site/StatusChip";

import { SITE } from "../data/site";
import PRODUCTS from "../data/products";

const Products = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<Layout current="products">
			<Helmet>
				<title>{`Products | ${SITE.name}`}</title>
				<meta
					name="description"
					content="Software products built by Edwin Anajemba, with their status and links."
				/>
			</Helmet>

			<section className="page-hero">
				<div className="wrap">
					<h1 className="page-hero__title">Products I build</h1>
					<p className="page-hero__lead">
						Each product stands on its own. Open one to see what it does, who
						it's for, and where it is today.
					</p>
				</div>
			</section>

			<section className="section">
				<div className="wrap">
					{PRODUCTS.length === 0 ? (
						<p className="prose">
							Products will appear here as they launch.{" "}
							<a href="/#contact">Get in touch</a> to hear first.
						</p>
					) : (
						<div className="product-grid">
							{PRODUCTS.map((product) => (
								<article className="product-card" key={product.slug}>
									<StatusChip status={product.status} />
									<h2>{product.name}</h2>
									<p>{product.pitch}</p>
									<Link to={`/products/${product.slug}`}>
										View {product.name}
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
