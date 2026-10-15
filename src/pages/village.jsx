import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import Layout from "../site/Layout";
import GameBanner from "../site/GameBanner";
import { ROLES, GLYPHS, SIDES } from "../site/tiny";

import { useI18n } from "../i18n";

// Houses and trees. The tiny people treat these as walls.
const PROPS = [
	{ e: "🏰", x: 46, y: 6, s: 4.2 },
	{ e: "🏠", x: 8, y: 30, s: 3 },
	{ e: "🏡", x: 80, y: 28, s: 3 },
	{ e: "⛪", x: 24, y: 58, s: 3.2 },
	{ e: "🏪", x: 66, y: 60, s: 3 },
	{ e: "🌳", x: 4, y: 72, s: 2.6 },
	{ e: "🌲", x: 90, y: 66, s: 2.6 },
	{ e: "⛲", x: 47, y: 52, s: 2.4 },
	{ e: "🌳", x: 34, y: 26, s: 2.2 },
	{ e: "🌲", x: 62, y: 30, s: 2.2 },
];

const Figure = ({ hat, color, glyph }) => (
	<svg className="cast-figure" viewBox="0 0 60 84" aria-hidden="true">
		<ellipse cx="30" cy="78" rx="14" ry="4" fill="rgba(23,18,43,0.22)" />
		<path d="M30 58 L22 76 M30 58 L38 76" stroke="#2b2350" strokeWidth="4.2" strokeLinecap="round" fill="none" />
		<path d="M30 58 L30 38" stroke={color} strokeWidth="12" strokeLinecap="round" />
		<path d="M30 42 L44 50 M30 42 L16 50" stroke="#2b2350" strokeWidth="3.4" strokeLinecap="round" fill="none" />
		<circle cx="30" cy="27" r="9.4" fill="#c68642" stroke="#17122b" strokeWidth="2" />
		<rect x="20" y="13" width="20" height="6.4" rx="1.5" fill={hat} stroke="#17122b" strokeWidth="2" />
		<text x="30" y="9" textAnchor="middle" fontSize="13">
			{glyph}
		</text>
	</svg>
);

const Village = () => {
	const { site, ui } = useI18n();
	const t = ui.villagePage;

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<Layout current="games">
			<Helmet>
				<title>{`${t.title} | ${site.name}`}</title>
				<meta name="description" content={t.metaDesc} />
			</Helmet>

			<section className="page-hero">
				<div className="wrap page-hero--split">
					<div>
						<h1 className="page-hero__title">{t.title}</h1>
						<p className="page-hero__lead">{t.lead}</p>
					</div>
					<GameBanner slug="tiny-wars" />
				</div>
			</section>

			<section className="section">
				<div className="wrap">
					<h2 className="section-title">{t.stageTitle}</h2>
					<div className="village-stage" role="img" aria-label={t.stageLabel}>
						{PROPS.map((prop, i) => (
							<span
								key={i}
								className="village-prop"
								style={{ left: `${prop.x}%`, top: `${prop.y}%`, fontSize: `${prop.s}rem` }}
								aria-hidden="true"
							>
								{prop.e}
							</span>
						))}
					</div>
					<p className="village-note">{t.stageHint}</p>
				</div>
			</section>

			<section className="section section--wash">
				<div className="wrap">
					<h2 className="section-title">{t.castTitle}</h2>
					<p className="prose">{t.castLead}</p>
					<div className="cast-grid">
						{ROLES.map((role, i) => (
							<article className="cast-card" key={i}>
								<Figure hat={role.hat} color={SIDES[i % SIDES.length].color} glyph={GLYPHS[i]} />
								<h3>{t.roles[i].name}</h3>
								<p>{t.roles[i].blurb}</p>
								<dl className="cast-stats">
									<div>
										<dt>{t.stats.hp}</dt>
										<dd>{3 + role.hp}</dd>
									</div>
									<div>
										<dt>{t.stats.power}</dt>
										<dd>{role.dmg.toFixed(1)}</dd>
									</div>
									<div>
										<dt>{t.stats.reach}</dt>
										<dd>{role.range > 20 ? t.ranged : t.melee}</dd>
									</div>
									<div>
										<dt>{t.stats.speed}</dt>
										<dd>{role.speed.toFixed(2)}</dd>
									</div>
								</dl>
							</article>
						))}
					</div>
				</div>
			</section>

			<section className="section">
				<div className="wrap">
					<h2 className="section-title">{t.lockedTitle}</h2>
					<p className="prose">{t.lockedLead}</p>
					<div className="locked-grid">
						{t.locked.map((name) => (
							<article className="locked-card" key={name}>
								<span className="locked-card__mark" aria-hidden="true">
									?
								</span>
								<h3>{name}</h3>
								<span className="game-tag">{t.lockedBadge}</span>
							</article>
						))}
					</div>
					<div className="game-card__actions">
						<Link className="btn btn--hot" to="/games/tiny-wars/play">
							{ui.gamesPage.play}
						</Link>
						<Link className="btn btn--ghost-dark" to="/contact?topic=tiny-wars">
							{t.follow}
						</Link>
						<Link className="btn btn--ghost-dark" to="/games">
							{t.back}
						</Link>
					</div>
				</div>
			</section>
		</Layout>
	);
};

export default Village;
