import React from "react";

import { useI18n } from "../i18n";

const Diagram = () => {
	const { ui } = useI18n();
	return (
	<svg
		className="diagram"
		viewBox="0 0 620 120"
		role="img"
		aria-labelledby="diagram-title"
	>
		<title id="diagram-title">{ui.diagramTitle}</title>
		<g className="diagram__lines">
			<rect x="6" y="40" width="96" height="40" rx="12" />
			<rect x="170" y="40" width="96" height="40" rx="12" />
			<rect x="340" y="6" width="96" height="40" rx="12" />
			<rect x="340" y="74" width="96" height="40" rx="12" />
			<rect x="510" y="40" width="104" height="40" rx="12" />
			<path d="M102 60H170M266 60H300V26H340M266 60H300V94H340M436 26H470V60H510M436 94H470V60" />
		</g>
		<g className="diagram__text" textAnchor="middle">
			<text x="54" y="64">Client</text>
			<text x="218" y="64">API</text>
			<text x="388" y="30">Queue</text>
			<text x="388" y="98">Postgres</text>
			<text x="562" y="64">Polygon</text>
		</g>
	</svg>
	);
};

export default Diagram;
