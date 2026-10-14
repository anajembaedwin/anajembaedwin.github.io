import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import INFO from "../data/user";
import { SITE } from "../data/site";
import { installReactions } from "./reactions";

const Layout = ({ children, current }) => {
	useEffect(() => installReactions(), []);

	// Keep the header pinned, and show how far down the page you are.
	const [scrolled, setScrolled] = useState(false);
	const [progress, setProgress] = useState(0);
	useEffect(() => {
		let frame = null;
		const update = () => {
			frame = null;
			const max = document.documentElement.scrollHeight - window.innerHeight;
			setScrolled(window.scrollY > 8);
			setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
		};
		const onScroll = () => {
			if (!frame) frame = requestAnimationFrame(update);
		};
		update();
		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("resize", onScroll);
		return () => {
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("resize", onScroll);
			if (frame) cancelAnimationFrame(frame);
		};
	}, []);

	return (
		<React.Fragment>
			<a className="skip-link" href="#main">
				Skip to content
			</a>

			<header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
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
				<div
					className="progress"
					aria-hidden="true"
					style={{ transform: `scaleX(${progress})` }}
				/>
			</header>

			<main id="main">{children}</main>

			<footer className="site-footer">
				<div className="wrap site-footer__row">
					<div>
						<div className="site-footer__name">{SITE.name}</div>
						<div className="site-footer__sub">
							Product team lead. Web and infrastructure engineer, based in Africa.
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
