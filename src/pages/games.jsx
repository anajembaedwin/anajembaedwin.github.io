import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import Layout from "../site/Layout";
import StatusChip from "../site/StatusChip";
import GAMES from "../data/games";

import { useI18n } from "../i18n";

const Art = ({ game, big }) => (
	<div
		className={`game-art${big ? " game-art--big" : ""}`}
		style={{ background: `linear-gradient(135deg, ${game.tone[0]}, ${game.tone[1]})` }}
		aria-hidden="true"
	>
		<span>{game.emoji}</span>
	</div>
);

const Games = () => {
	const { site, ui } = useI18n();
	const t = ui.gamesPage;

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const [first, ...rest] = GAMES;
	const info = (slug) => t.items[slug];

	return (
		<Layout current="games">
			<Helmet>
				<title>{`${ui.nav.games} | ${site.name}`}</title>
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
					<h2 className="section-title">{t.nowTitle}</h2>
					<article className="game-feature">
						<Art game={first} big />
						<div className="game-feature__body">
							<div className="game-card__meta">
								<StatusChip status={first.status} />
								<span className="game-tag">{t.tags[first.tag]}</span>
							</div>
							<h3>{info(first.slug).name}</h3>
							<p>{info(first.slug).pitch}</p>
							<div className="game-card__actions">
								{first.play ? (
									<Link className="btn btn--hot" to={first.play}>
										{t.play}
									</Link>
								) : (
									<Link className="btn btn--hot" to="/games/tiny-wars">
										{t.peek}
									</Link>
								)}
								<Link className="btn btn--ghost-dark" to={`/contact?topic=${first.slug}`}>
									{t.follow}
								</Link>
							</div>
						</div>
					</article>
				</div>
			</section>

			<section className="section section--wash">
				<div className="wrap">
					<h2 className="section-title">{t.nextTitle}</h2>
					<div className="game-grid">
						{rest.map((game) => (
							<article className="game-card" key={game.slug}>
								<Art game={game} />
								<div className="game-card__meta">
									<StatusChip status={game.status} />
									<span className="game-tag">{t.tags[game.tag]}</span>
								</div>
								<h3>{info(game.slug).name}</h3>
								<p>{info(game.slug).pitch}</p>
								<Link to={`/contact?topic=${game.slug}`}>{t.notify}</Link>
							</article>
						))}
					</div>
				</div>
			</section>
		</Layout>
	);
};

export default Games;
