import React from "react";
import { Row, Col } from "react-bootstrap";

import MoneyHistoryBox from "./MoneyHistoryBox/MoneyHistoryBox";
import classes from "./ExpenseSummary.module.css";

import ballons from "../../assets/svg/undraw_balloons_vxx5.svg";
import sad from "../../assets/svg/undraw_happy_feeling_slmw.svg";

const expenseSummary = (props) => {
	console.log(props);
	let currMonthIncome = 0;
	let currMonthExpenses = 0;
	let lastTransactions = [];

	let currMonthBalance = 0;
	// Since JS getMonth() returns the index of the month I use the months object to get the
	// month formated for my calculations
	const currMonth = Object.values(props.months)[new Date().getMonth()];
	// Display format is the "pretty" version of the month name
	const currMonthDisplayFormat = Object.keys(props.months)[
		new Date().getMonth()
	];
	// Change the listLength to change the number or reports to show
	const listLenght = 5;

	for (let i = 0; i < props.data.length; i++) {
		if (
			props.data[i].post.amount >= 0 &&
			props.data[i].post.month === currMonth
		) {
			currMonthIncome += Number(props.data[i].post.amount);
		}
		if (
			props.data[i].post.amount < 0 &&
			props.data[i].post.month === currMonth
		) {
			currMonthExpenses += Number(props.data[i].post.amount);
		}
	}

	// List with the name and amount of the recent activites from
	// the curr month for displaying.
	for (let i = props.data.length - 1; i >= 0; i--) {
		if (props.data[i].post.month === currMonth) {
			lastTransactions.push([
				props.data[i].post.name,
				props.data[i].post.amount,
			]);
		}
	}

	// Set current month balance
	props.data.map((e) => {
		if (currMonth === e.post.month) {
			return (currMonthBalance += Number(e.post.amount));
		}
	});

	const userCondition =
		currMonthBalance >= 0 ? (
			<>
				<Col md lg={5}>
					<img className={classes.Img} src={ballons} alt="Ballons" />
				</Col>
				<Col md lg={7}>
					<div className={classes.Info}>
						<p>
							Hello <span>{props.name}</span>,
						</p>
						<p>
							looks like your financial situation is{" "}
							<span style={{ color: "green" }}>GOOD </span>
							<br />
							for the month of
							<span> {currMonthDisplayFormat}</span> !
						</p>
					</div>
					<MoneyHistoryBox
						className={classes.MoneyHistoryBox}
						lastTransactions={lastTransactions}
						listLenght={listLenght}
						currMonthBalance={currMonthBalance}
						currMonthIncome={currMonthIncome}
						currMonthExpenses={currMonthExpenses}
					/>
				</Col>
			</>
		) : (
			<>
				<Col md lg={5}>
					<img className={classes.Img} src={sad} alt="Ballons" />
				</Col>
				<Col md lg={7}>
					<div className={classes.Info}>
						<p>
							Hello <span>Tiago</span>,
						</p>
						<p>
							it seems you have been spending more
							<br /> than what you earned for last couple <br />{" "}
							days of <span>{currMonthDisplayFormat}</span> !
						</p>
					</div>
					<MoneyHistoryBox
						className={classes.MoneyHistoryBox}
						lastTransactions={lastTransactions}
						listLenght={listLenght}
						currMonthBalance={currMonthBalance}
						currMonthIncome={currMonthIncome}
						currMonthExpenses={currMonthExpenses}
					/>
				</Col>
			</>
		);

	return (
		<>
			<Row className={classes.Good}>{userCondition}</Row>
		</>
	);
};

export default expenseSummary;
