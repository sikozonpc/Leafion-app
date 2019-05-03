import React from "react";

import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

import classes from "./MoneyHistory.module.css";

const moneyHistoryBox = (props) => {
	const COLOR = props.currMonthBalance >= 0 ? "green" : "red";
	const monthlyIncome = props.monthlyIncome ? (
		<p className={classes.Item} style={{ paddingTop: "10px" }}>
			{props.monthlyIncome} {props.currency}
		</p>
	) : null;
	const monthlyExpense = props.monthlyExpense ? (
		<p className={classes.Item} style={{ paddingTop: "10px" }}>
			-{props.monthlyExpense} {props.currency}
		</p>
	) : null;

	return (
		<Row className={classes.HistoryBox}>
			<Col xs lg="auto">
				<p className={classes.ItemBold}>Income</p>
				<p className={classes.ItemBold}>Expense</p>
				{props.lastTransactions.map((e, i) => {
					if (i === 0) {
						return (
							<p
								key={e[0]}
								className={classes.Item}
								style={{ paddingTop: "10px" }}
							>
								{e[0]}...
							</p>
						);
					} else if (i === props.listLenght - 1) {
						return (
							<p
								key={e[0]}
								className={classes.Item}
								style={{ paddingBottom: "10px" }}
							>
								{e[0]}...
							</p>
						);
					} else {
						return (
							<p key={e[0]} className={classes.Item}>
								{" "}
								{e[0]}...{" "}
							</p>
						);
					}
				})}
				{props.monthlyIncome ? (
					<p className={classes.Item} style={{ paddingTop: "10px" }}>
						Expected monthly Income
					</p>
				) : null}
				{props.monthlyExpense ? (
					<p className={classes.Item} style={{ paddingTop: "10px" }}>
						Expected monthly Expense
					</p>
				) : null}
				<p className={classes.ItemBold} style={{ marginTop: "15px" }}>
					Balance
				</p>
			</Col>
			<Col xs lg="auto">
				<p className={classes.ItemBold}>
					+{props.currMonthIncome} {props.currency}
				</p>
				<p className={classes.ItemBold}>
					{props.currMonthExpenses} {props.currency}
				</p>
				{props.lastTransactions.map((e, i) => {
					if (i === 0) {
						return (
							<p
								key={e[0]}
								className={classes.Item}
								style={{ paddingTop: "10px" }}
							>
								{e[1]} {props.currency}
							</p>
						);
					} else if (i === props.listLenght - 1) {
						return (
							<p
								key={e[0]}
								className={classes.Item}
								style={{ paddingBottom: "10px" }}
							>
								{e[1]} {props.currency}
							</p>
						);
					} else {
						return (
							<p key={e[0]} className={classes.Item}>
								{" "}
								{e[1]} {props.currency}{" "}
							</p>
						);
					}
				})}
				{monthlyIncome}
				{monthlyExpense}
				<p style={{ color: COLOR, marginTop: "15px" }}>
					{" "}
					{props.currMonthBalance.toFixed(2)} {props.currency}
				</p>
			</Col>
			<Row className={classes.Buttons}>
				<Link className="btn btn-outline-dark" to="/add/expense">
					+ Expense
				</Link>
				<Link className="btn btn-dark" to="/add/income">
					+ Income
				</Link>
			</Row>
		</Row>
	);
};

export default moneyHistoryBox;
