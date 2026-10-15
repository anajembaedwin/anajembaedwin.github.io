import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import INFO from "../data/user";
import { useI18n, LANGS } from "../i18n";
import { installReactions } from "./reactions";
import PlayLayer from "./PlayLayer";
import TinyPeople from "./TinyPeople";
import Guide from "./Guide";
import { useLiveHeartbeat } from "../live/stats";
import STORE_URL from "../data/store";

const Layout = ({ children, current }) => {
	const { lang, setLang, site, ui } = useI18n();
	const { pathname, hash, key } = useLocation();
	const [menuOpen, setMenuOpen] = useState(false);

	useEffect(() => installReactions(), []);
	useLiveHeartbeat(pathname);

	// Section links ("/#work") work from every page: wait for the page to
	// render, then scroll to the section. Clicking the same link again scrolls again.
	useEffect(() => {
		if (!hash) return undefined;
		const id = decodeURIComponent(hash.slice(1));
		let tries = 0;
		let timer;
		const go = () => {
			const el = document.getElementById(id);
			if (el) {
				el.scrollIntoView({
					behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
					block: "start",
				});
			} else if (tries < 25) {
				tries += 1;
				timer = setTimeout(go, 60);
			}
		};
		timer = setTimeout(go, 30);
		return () => clearTimeout(timer);
	}, [pathname, hash, key]);

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

	// The "Build" group: opens on click (and on hover with a mouse), closes on outside click or Escape.
	const [groupOpen, setGroupOpen] = useState(false);
	const groupRef = useRef(null);
	const closeAll = () => {
		setGroupOpen(false);
		setMenuOpen(false);
	};
	useEffect(() => {
		if (!groupOpen) return undefined;
		const onDown = (event) => {
			if (groupRef.current && !groupRef.current.contains(event.target)) setGroupOpen(false);
		};
		const onKey = (event) => {
			if (event.key === "Escape") setGroupOpen(false);
		};
		document.addEventListener("pointerdown", onDown);
		document.addEventListener("keydown", onKey);
		return () => {
			document.removeEventListener("pointerdown", onDown);
			document.removeEventListener("keydown", onKey);
		};
	}, [groupOpen]);

	return (
		<React.Fragment>
			<a className="skip-link" href="#main">
				{ui.skip}
			</a>

			<header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
				<div className="wrap">
					<div className="site-header__pill">
						<Link
							className="brand"
							to="/"
							onClick={(event) => {
								closeMenu();
								// Already on the home page: the router does nothing, so scroll up ourselves.
								if (pathname === "/") {
									event.preventDefault();
									if (hash) window.history.replaceState(null, "", "/");
									window.scrollTo({
										top: 0,
										behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
									});
								}
							}}
						>
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
							<Link to="/#services" onClick={closeMenu}>
								{ui.nav.services}
							</Link>
							<Link to="/#work" onClick={closeMenu}>
								{ui.nav.work}
							</Link>
							<div
								className={`nav__group${groupOpen ? " is-open" : ""}`}
								ref={groupRef}
							>
								<button
									type="button"
									className="nav__trigger"
									aria-expanded={groupOpen}
									aria-haspopup="true"
									aria-controls="nav-build"
									data-current={["products", "games", "projects"].includes(current) ? "true" : undefined}
									onClick={() => setGroupOpen(!groupOpen)}
								>
									{ui.nav.build}
									<span className="nav__caret" aria-hidden="true" />
								</button>
								<div className="nav__menu" id="nav-build">
									<Link
										to="/products"
										aria-current={current === "products" ? "page" : undefined}
										onClick={closeAll}
									>
										{ui.nav.products}
									</Link>
									<Link
										to="/games"
										aria-current={current === "games" ? "page" : undefined}
										onClick={closeAll}
									>
										{ui.nav.games}
									</Link>
									<Link
										to="/projects"
										aria-current={current === "projects" ? "page" : undefined}
										onClick={closeAll}
									>
										{ui.nav.code}
									</Link>
								</div>
							</div>
							<a
								className="nav__store"
								href={STORE_URL}
								target="_blank"
								rel="noreferrer"
								onClick={closeMenu}
							>
								{ui.nav.store} <span aria-hidden="true">↗</span>
							</a>
							<Link to="/about" aria-current={current === "about" ? "page" : undefined}>
								{ui.nav.about}
							</Link>
							<Link to="/#contact" onClick={closeMenu}>
								{ui.nav.contact}
							</Link>
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
