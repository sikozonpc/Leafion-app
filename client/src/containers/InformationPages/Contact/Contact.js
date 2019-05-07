import React from "react";
import PageHeader from "../../../components/PageHeader/PageHeader";
import classes from "../InformationPages.module.css";

const contact = () => {
	return (
		<div className={classes.Container}>
			<PageHeader title="Contact" desc="Contact information" />
			<main className={classes.Main}>
				<p className={classes.p}>
					If you need help, would like to contribute or anything else
					I'm more than happy to answer you on my{" "}
					<a
						style={{ color: "blue" }}
						href="https://twitter.com/tiago_taquelim"
						target="_blank"
						rel="noopener noreferrer"
					>
						Twitter
					</a>{" "}
					or by sending a message trough my{" "}
					<a
						style={{ color: "green" }}
						href="https://taquelim.netlify.com/"
						target="_blank"
						rel="noopener noreferrer"
					>
						Website
					</a>
					.
				</p>
			</main>
		</div>
	);
};

export default contact;
