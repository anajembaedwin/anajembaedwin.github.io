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
	const online = Math.max(1, stats.online || 0);
	return (
		<div className="live-badge" title={T.note}>
			<span className="live-badge__dot" aria-hidden="true" />
			<span>
				<strong>{online}</strong> {T.online}
			</span>
			{stats.playing > 0 && (
				<span>
					<strong>{stats.playing}</strong> {T.playing}
				</span>
			)}
			<span>
				<strong>{stats.visits || 0}</strong> {T.visits}
			</span>
			{stats.plays > 0 && (
				<span>
					<strong>{stats.plays}</strong> {T.plays}
				</span>
			)}
		</div>
	);
};

export default LiveBadge;
