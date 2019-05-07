import React from "react";
import PageHeader from "../../../components/PageHeader/PageHeader";
import classes from "../InformationPages.module.css";

const about = () => {
	return (
		<div className={classes.Container}>
			<PageHeader
				title="About Leafion"
				desc="It's purpose, origins and more"
			/>
			<main className={classes.Main}>
				<p className={classes.p}>
					Leafion is a web application to facilitate the user's money
					management and hopefully make a good impact.
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
