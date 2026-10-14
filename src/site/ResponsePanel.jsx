import React from "react";

// The hero's API-response panel. Lines fade in one after another on first
// load (and not at all for people who prefer reduced motion).
const ResponsePanel = ({ lines }) => {
	const rows = [
		{ key: "req", node: <span className="resp__dim">GET /edwin</span> },
		{
			key: "status",
			node: (
				<span>
					<span className="resp__dot" aria-hidden="true" />
					200 OK
				</span>
			),
		},
		{ key: "open", node: "{" },
		...lines.map(([k, v], i) => ({
			key: k,
			node: (
				<span className="resp__indent">
					"{k}": "{v}"{i < lines.length - 1 ? "," : ""}
				</span>
			),
		})),
		{ key: "close", node: "}" },
	];

	return (
		<div className="resp" role="group" aria-label="Profile summary">
			{rows.map((row, i) => (
				<div className="resp__line" style={{ "--i": i }} key={row.key}>
					{row.node}
				</div>
			))}
		</div>
	);
};

export default ResponsePanel;
