import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import INFO from "../data/user";
import { useI18n, LANGS } from "../i18n";
import { installReactions } from "./reactions";
import PlayLayer from "./PlayLayer";
import TinyPeople from "./TinyPeople";
import Guide from "./Guide";

const Layout = ({ children, current }) => {
	const { lang, setLang, site, ui } = useI18n();
	const [menuOpen, setMenuOpen] = useState(false);

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

	// Close the mobile menu with Escape.
	useEffect(() => {
		if (!menuOpen) return undefined;
		const onKey = (event) => {
			if (event.key === "Escape") setMenuOpen(false);
		};
		document.addEventListener("keydown", onKey);
		return () => document.removeEventListener("keydown", onKey);
	}, [menuOpen]);

	const closeMenu = () => setMenuOpen(false);

	return (
		<React.Fragment>
			<a className="skip-link" href="#main">
				{ui.skip}
			</a>

			<header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
				<div className="wrap">
					<div className="site-header__pill">
						<Link className="brand" to="/" onClick={closeMenu}>
							{site.name}
						</Link>
						<button
							type="button"
							className="nav-toggle"
							aria-expanded={menuOpen}
							aria-controls="site-menu"
							aria-label={ui.menu}
							onClick={() => setMenuOpen(!menuOpen)}
						>
							<span aria-hidden="true" />
						</button>
						<div
							className={`site-header__menu${menuOpen ? " is-open" : ""}`}
							id="site-menu"
							onClick={(event) => {
								if (event.target.closest("a")) closeMenu();
							}}
						>
						<nav className="nav" aria-label={ui.nav.label}>
							<a href="/#services">{ui.nav.services}</a>
							<a href="/#work">{ui.nav.work}</a>
							<Link
								to="/products"
								aria-current={current === "products" ? "page" : undefined}
							>
								{ui.nav.products}
							</Link>
							<Link
								to="/games"
								aria-current={current === "games" ? "page" : undefined}
							>
								{ui.nav.games}
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

			<PlayLayer />
			<TinyPeople />
			<Guide />

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
