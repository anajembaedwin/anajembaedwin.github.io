import React from "react";

import { useI18n } from "../i18n";
import { useLiveStats } from "../live/stats";

// Small public "who's here right now" line. Renders nothing until the stats
// service answers, so the site looks normal when it is not configured.
const LiveBadge = () => {
	const { ui } = useI18n();
	const stats = useLiveStats();
	if (!stats) return null;
	const T = ui.liveStats;
	const items = [
		[Math.max(1, stats.online || 0), T.online],
		stats.playing > 0 ? [stats.playing, T.playing] : null,
		[stats.visits || 0, T.visits],
		stats.plays > 0 ? [stats.plays, T.plays] : null,
	].filter(Boolean);
	return (
		<div className="live-badge" title={T.note}>
			<span className="live-badge__tag">
				<span className="live-badge__dot" aria-hidden="true" />
				{T.live}
			</span>
			{items.map(([n, label]) => (
				<span className="live-stat" key={label}>
					<strong>{n}</strong>
					<em>{label}</em>
				</span>
			))}
		</div>
	);
};

export default LiveBadge;
