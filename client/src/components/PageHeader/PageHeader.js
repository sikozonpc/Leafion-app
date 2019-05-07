import React from "react";

import classes from "./PageHeader.module.css";

const pageHeader = (props) => {
	const { desc, title } = props;
	return (
		<div className={classes.TitleMain}>
			<h2 className={classes.Title}>{title}</h2>
			<span style={{ fontSize: "14px", color: "#777", margin: "0" }}>
				{desc}
			</span>
		</div>
	);
};

export default pageHeader;
