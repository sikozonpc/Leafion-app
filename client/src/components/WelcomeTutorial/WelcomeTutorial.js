import React, { useState } from "react";
import Button from "../UI/Button/Button";

import classes from "./WelcomeTutorials.module.css";

const welcomeTutorial = (props) => {
	// Responsible for keeping track of each slide
	let [counter, addToCounter] = useState(0);

	let displayText = (
		<div className={classes.TextBox}>
			<p className={classes.Title}>
				Welcome to Leafion{" "}
				<i className="fas fa-leaf" style={{ color: "#33BE8F" }} />.
			</p>
			<p className={classes.Title}>
				With Leafion, our goal is to give you the ability to{" "}
				<span className={classes.Bold}>manage your money</span> in one
				place that is easy to use.
			</p>
			<p className={classes.Title}>
				And then give you an overview of your balance.
			</p>
			<Button clickEvent={() => addToCounter((counter += 1))}>
				Next
			</Button>
		</div>
	);
	if (counter === 1) {
		displayText = (
			<div className={classes.TextBox}>
				<p className={classes.Title}>How we do that ?</p>
				<p className={classes.Title}>
					By recording all of your transactions in our web
					application, from which you can access from anywhere at
					anytime.
				</p>
				<Button clickEvent={() => addToCounter((counter += 1))}>
					Next
				</Button>
			</div>
		);
	}
	if (counter === 2) {
		displayText = (
			<div className={classes.TextBox}>
				<Button clickEvent={props.endTutorial}>Finish</Button>
			</div>
		);
	}
	console.log(counter);
	return <div className={classes.Container}>{displayText}</div>;
};

export default welcomeTutorial;
