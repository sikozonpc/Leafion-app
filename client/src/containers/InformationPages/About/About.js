import React from "react";

import classes from "../InformationPages.module.css";

const about = () => {
	return (
		<div className={classes.Container}>
			<div className={classes.TitleMain}>
				<h2 className={classes.Title}>About Leafion</h2>
				<span style={{ fontSize: "14px", color: "#777", margin: "0" }}>
					It's purpose, origin and more
				</span>
			</div>
			<main className={classes.Main}>
				<p className={classes.p}>
					Leafion is a web application to facilitate the user's money
					management nad hopefully make a good impact.
				</p>
				<p className={classes.p}>
					It started as a simple project and trough multiple
					iterations it started to grow and gain shape.
				</p>
				<p className={classes.p}>
					Leafion is an open-source project, so if you like to look
					under the hood you can check it out on{" "}
					<a
						style={{ color: "green" }}
						href="https://github.com/sikozonpc/Leafion"
						target="_blank"
						rel="noopener noreferrer"
					>
						Github
					</a>
				</p>
			</main>
		</div>
	);
};

export default about;
