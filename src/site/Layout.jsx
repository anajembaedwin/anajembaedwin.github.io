import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import INFO from "../data/user";
import { useI18n, LANGS } from "../i18n";
import { installReactions } from "./reactions";

const Layout = ({ children, current }) => {
	const { lang, setLang, site, ui } = useI18n();

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
				{ui.skip}
			</a>

			<header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
				<div className="wrap">
					<div className="site-header__pill">
						<Link className="brand" to="/">
							{site.name}
						</Link>
						<nav className="nav" aria-label={ui.nav.label}>
							<a href="/#services">{ui.nav.services}</a>
							<a href="/#work">{ui.nav.work}</a>
							<Link
								to="/products"
								aria-current={current === "products" ? "page" : undefined}
							>
								{ui.nav.products}
							</Link>
							<a href="/#about">{ui.nav.about}</a>
							<a href="/#contact">{ui.nav.contact}</a>
						</nav>
						<div className="lang" role="group" aria-label={ui.langLabel}>
							{LANGS.map((item) => (
								<button
									type="button"
									key={item.code}
									lang={item.code}
									title={item.name}
									aria-pressed={item.code === lang}
									onClick={() => setLang(item.code)}
								>
									{item.label}
								</button>
							))}
						</div>
						<div
							className="progress"
							aria-hidden="true"
							style={{ transform: `scaleX(${progress})` }}
						/>
					</div>
				</div>
			</header>

			<main id="main">{children}</main>

			<footer className="site-footer">
				<div className="wrap site-footer__row">
					<div>
						<div className="site-footer__name">{site.name}</div>
						<div className="site-footer__sub">{ui.footerSub}</div>
					</div>
					<div className="site-footer__links">
						<a href={INFO.socials.github} target="_blank" rel="noreferrer">
							{ui.footerLinks.github}
						</a>
						<a href={INFO.socials.linkedin} target="_blank" rel="noreferrer">
							{ui.footerLinks.linkedin}
						</a>
						<a href={`mailto:${INFO.main.email}`}>{ui.footerLinks.email}</a>
					</div>
				</div>
				<div className="wrap site-footer__copy">
					© {new Date().getFullYear()} {site.name}
				</div>
			</footer>
		</React.Fragment>
	);
};

export default Layout;
