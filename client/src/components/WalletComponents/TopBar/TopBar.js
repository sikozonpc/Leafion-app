import React from "react";
import { Link } from "react-router-dom";

import classes from "./TopBar.module.css";

const topBar = (props) => {
	return (
		<div className={classes.container}>
			<Link
				className={["navbar-brand", classes.brand].join(" ")}
				to="/home"
				onClick={() => props.deactivateWalletMode()}
			>
				<i className="fas fa-leaf" style={{ color: "##33BE8F" }} />
				{"  "} {"  "}
				Leafion
			</Link>
		</div>
	);
};

export default topBar;
