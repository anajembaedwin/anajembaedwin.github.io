import React from "react";

// Hero art for a game page. The pictures live in public/games/<slug>.svg.
const GameBanner = ({ slug, phoneHide }) => (
	<div className={`game-banner${phoneHide ? " game-banner--phone-hide" : ""}`} aria-hidden="true">
		<img src={`${process.env.PUBLIC_URL || ""}/games/${slug}.svg`} alt="" width="800" height="450" />
	</div>
);

export default GameBanner;
