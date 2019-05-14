import React from "react";

import { Container } from "react-bootstrap";
import classes from "./DetailedData.module.css";
import formatMoney from "../../utils/formatMoney";

//
// Component that displays and calculates the specific data to each month
//
const detailedData = (props) => {
	const { currency } = props;
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

	let total = (totalEarned + totalSpendings).toFixed(2);

	// Formating the values to money strings
	const totalSpendingsAbs = formatMoney(-totalSpendings);
	totalSpendings = formatMoney(totalSpendings);
	totalEarned = formatMoney(totalEarned);
	total = formatMoney(total);
	totalEarnedIVA = formatMoney(totalEarnedIVA);

	return (
		<Container className={classes.Box}>
			<div>
				<i className="far fa-bookmark" /> Actions:{" "}
				<strong>{numActions}</strong>
			</div>
			<div>
				<i className="fas fa-plus" /> Total Income:{" "}
				<strong style={{ color: "green" }}>
					{totalEarned} {currency}
				</strong>
				{"  "}
				<i>
					+iva: ({totalEarnedIVA}) {currency}
				</i>
			</div>
			<div>
				<i className="fas fa-minus" /> Total Expenses:{" "}
				<strong style={{ color: "red" }}>
					{totalSpendings} {currency}
				</strong>
			</div>

			<div>
				Balance:{" "}
				<strong>
					{totalEarned} - {totalSpendingsAbs} ={" "}
					<b style={{ color: total > 0 ? "green" : "red" }}>
						{total} {currency}
					</b>
				</strong>
			</div>
		</Container>
	);
};

export default detailedData;
