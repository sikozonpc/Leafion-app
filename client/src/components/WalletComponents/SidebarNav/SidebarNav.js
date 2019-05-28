import React from "react";
import { NavLink } from "react-router-dom";

import classes from "./SidebarNav.module.css";

const sidebarNav = ({ items, userName, deactivateWalletMode }) => {
	const navItems = items.map((item) => {
		return (
			<NavLink
				to={item.to}
				className={classes["nav-item"]}
				activeClassName={classes["nav-item__active"]}
				key={item.name}
			>
				<div className={classes["nav-item--background"]}>
					<span>
						{" "}
						<i className={item.icon} /> {"  "}
						<p>{item.name}</p>
					</span>
				</div>
			</NavLink>
		);
	});

	// Hard coded exit option
	navItems.push(
		<NavLink
			to="/back"
			key="back"
			className={classes["nav-item"]}
			activeClassName={classes["nav-item__active"]}
			style={{ marginTop: "30px" }}
			onClick={deactivateWalletMode}
		>
			<div className={classes["nav-item--background"]}>
				<span>
					<i className="fas fa-sign-out-alt" /> {"  "}
					<p>Back</p>
				</span>
			</div>
		</NavLink>
	);

	return (
		<nav className={classes.nav}>
			<div className={classes["user-area"]}>
				{" "}
				<span className={classes.user}> {userName[0]} </span>
				<span className={classes.username}>{userName}</span>
			</div>
			<div className={classes["items-list"]}>{navItems}</div>
		</nav>
	);
};

export default sidebarNav;
