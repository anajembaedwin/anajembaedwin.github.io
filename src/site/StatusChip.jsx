import React from "react";

import { useI18n } from "../i18n";

const StatusChip = ({ status }) => {
	const { ui } = useI18n();
	return (
		<span className={`chip chip--${status}`}>
			<span className="chip__dot" aria-hidden="true" />
			{ui.status[status] || status}
		</span>
	);
};

export default StatusChip;
