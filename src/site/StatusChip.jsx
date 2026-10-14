import React from "react";

import { STATUS_LABEL } from "../data/products";

const StatusChip = ({ status }) => (
	<span className={`chip chip--${status}`}>
		<span className="chip__dot" aria-hidden="true" />
		{STATUS_LABEL[status] || status}
	</span>
);

export default StatusChip;
