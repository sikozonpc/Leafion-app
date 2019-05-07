import React from "react";
import PageHeader from "../../../components/PageHeader/PageHeader";
import classes from "../InformationPages.module.css";

const howToUse = () => {
	return (
		<div className={classes.Container}>
			<PageHeader
				title="How to use"
				desc="Information on how to use Leafion"
			/>
			<main className={classes.Main}>
				<p className={classes.p}>In Progress</p>
			</main>
		</div>
	);
};

export default howToUse;
