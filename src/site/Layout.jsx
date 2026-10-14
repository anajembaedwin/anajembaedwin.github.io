import React from "react";
import { Link } from "react-router-dom";

import INFO from "../data/user";
import { SITE } from "../data/site";

const Layout = ({ children, current }) => {
	return (
		<React.Fragment>
			<a className="skip-link" href="#main">
				Skip to content
			</a>

			<header className="site-header">
				<div className="wrap site-header__row">
					<Link className="brand" to="/">
						{SITE.name}
					</Link>
					<nav className="nav" aria-label="Main">
						<a href="/#services">Services</a>
						<a href="/#work">Work</a>
						<Link
							to="/products"
							aria-current={current === "products" ? "page" : undefined}
						>
							Products
						</Link>
						<a href="/#about">About</a>
						<a href="/#contact">Contact</a>
					</nav>
				</div>
			</header>

			<main id="main">{children}</main>

			<footer className="site-footer">
				<div className="wrap site-footer__row">
					<div>
						<div className="site-footer__name">{SITE.name}</div>
						<div className="site-footer__sub">
							Product team lead and engineer, based in Lagos.
						</div>
					</div>
					<div className="site-footer__links">
						<a href={INFO.socials.github} target="_blank" rel="noreferrer">
							GitHub
						</a>
						<a
							href={INFO.socials.linkedin}
							target="_blank"
							rel="noreferrer"
						>
							LinkedIn
						</a>
						<a href={`mailto:${INFO.main.email}`}>Email</a>
					</div>
				</div>
				<div className="wrap site-footer__copy">
					© {new Date().getFullYear()} {SITE.name}
				</div>
			</footer>
		</React.Fragment>
	);
};

export default Layout;
