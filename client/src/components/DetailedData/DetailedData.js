import React from "react";

import { Container } from "react-bootstrap";
import classes from "./DetailedData.module.css";

//
// Component that displays and calculates the specific data to each month
//
const detailedData = (props) => {
	// Calculations for the data display
	const numActions = props.data.length;
	const IVA = 0.23;
	let totalSpendings = 0;
	let totalEarned = 0;
	let totalEarnedIVA = 0;

	props.data.forEach((e) => {
		let amount = Number(e.post.amount);
		if (amount >= 0) {
			totalEarned += amount;
		} else {
			totalSpendings += amount;
		}
	});
	totalEarnedIVA = (totalEarned - totalEarned * IVA).toFixed(2);

	let total = (totalEarned - totalSpendings).toFixed(2);

	let totalStyles = total > 0 ? successStyles : dangerStyles;
	if (total === 0) {
		totalStyles = null;
	}

	return (
		<Container className={classes.Box}>
			<div>
				<i className="far fa-bookmark" /> Actions:{" "}
				<strong>{numActions}</strong>
			</div>
			<div>
				<i className="fas fa-plus" /> Total Income:{" "}
				<strong style={{ color: "green" }}>{totalEarned} €</strong>
				{"  "}
				<i>+iva: ({totalEarnedIVA}) €</i>
			</div>
			<div>
				<i className="fas fa-minus" /> Total Expenses:{" "}
				<strong style={{ color: "red" }}>{totalSpendings} €</strong>
			</div>

			<div>
				Balance:{" "}
				<strong>
					{totalEarned} - {Math.abs(totalSpendings)} = {total} €
				</strong>
			</div>
		</Container>
	);
};

const successStyles = "success";
const dangerStyles = "danger";

export default detailedData;
