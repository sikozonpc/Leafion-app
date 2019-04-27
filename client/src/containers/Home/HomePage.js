import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";

import {
	Radar,
	RadarChart,
	PolarGrid,
	PolarAngleAxis,
	PolarRadiusAxis,
	Bar,
	BarChart,
	Legend,
	Tooltip,
	CartesianGrid,
	YAxis,
	XAxis,
	Line,
	LineChart,
	ResponsiveContainer,
} from "recharts";

import classes from "./HomePage.module.css";
import ExpenseSummary from "../../components/ExpenseSummary/ExpenseSummary";

class HomePage extends Component {
	render() {
		console.log("[HomePage.js] @render | props: ", this.props);

		const recebidoGraphFormatedData = {};
		const gastoGraphFormatedData = {};

		//TODO: Add another line in the graph for the expected
		Object.keys(this.props.months).map((m) => {
			return (gastoGraphFormatedData[m.slice(0, 3)] = getMoneyFromMonth(
				this.props.items,
				this.props.months[m],
				"g"
			));
		});
		Object.keys(this.props.months).map((m) => {
			return (recebidoGraphFormatedData[
				m.slice(0, 3)
			] = getMoneyFromMonth(this.props.items, this.props.months[m], "r"));
		});

		// Find the max value of the categories to set the max value of the RadarChart
		let maxValueCategory = 0;
		for (let cat of this.props.categoryFrequency) {
			if (cat.val > maxValueCategory) {
				maxValueCategory = cat.val;
			}
		}

		const graphData = [];
		Object.values(this.props.months).forEach((m) => {
			let mCapitalized = m.charAt(0).toUpperCase() + m.slice(1);
			graphData.push({
				Month: mCapitalized,
				Income: recebidoGraphFormatedData[mCapitalized],
				Expense: gastoGraphFormatedData[mCapitalized],
			});
		});

		return (
			<Container fluid style={{ backgroundColor: "#F9F9F9" }}>
				<Row className={classes.MainStatus}>
					<ExpenseSummary
						data={this.props.items}
						months={this.props.months}
						name={this.props.name}
					/>
				</Row>
				<Row className={classes.Graphs}>
					<Col xs={12} sm={12} md lg={9}>
						<div className={classes.ContainerWrapper}>
							<h2> Year Overview - {new Date().getFullYear()}</h2>
							<ResponsiveContainer width="100%" height={400}>
								<LineChart data={graphData}>
									<XAxis dataKey="Month" />
									<YAxis />
									<CartesianGrid
										vertical={false}
										strokeDasharray="3 3"
									/>
									<Tooltip />
									<Legend />
									<Line
										type="monotone"
										dataKey="Income"
										stroke="#82ca9d"
									/>
									<Line
										type="monotone"
										dataKey="Expense"
										stroke="#e83c3c"
										activeDot={{ r: 8 }}
									/>
								</LineChart>
							</ResponsiveContainer>
						</div>
					</Col>
					<Col
						className={classes.SingletionList}
						xs={12}
						sm={12}
						md
						lg={3}
					>
						<div className={classes.Singleton}>
							<h3>Total Income</h3>
							<p>
								{" "}
								+{" "}
								{getMoneyFromMonth(
									this.props.items,
									"all",
									"r"
								)}{" "}
								{this.props.currency}
							</p>
						</div>
						<div className={classes.SingletonRed}>
							<h3>Total Expenses</h3>
							<p>
								{" "}
								-{" "}
								{getMoneyFromMonth(
									this.props.items,
									"all",
									"g"
								)}{" "}
								{this.props.currency}
							</p>
						</div>
						<div className={classes.SingletonBlue}>
							<h3>Nº Actions</h3>
							<p>{this.props.items.length} actions </p>
						</div>
					</Col>
				</Row>
				<Row className={classes.Graphs}>
					<Col>
						<div
							className={classes.ContainerWrapper}
							style={{ width: "100%" }}
						>
							<h2>Bar Chart </h2>
							<ResponsiveContainer width="100%" height={400}>
								<BarChart data={graphData}>
									<CartesianGrid strokeDasharray="3 3" />
									<XAxis dataKey="Month" />
									<YAxis />
									<Tooltip />
									<Legend />
									<Bar dataKey="Income" fill="#82ca9d" />
									<Bar dataKey="Expense" fill="#e83c3c" />
								</BarChart>
							</ResponsiveContainer>
						</div>
					</Col>
					<Col>
						<div
							className={classes.ContainerWrapper}
							style={{ width: "80%", margin: "50px auto" }}
						>
							<h2> Money Activity </h2>
							<ResponsiveContainer width="100%" height={300}>
								<RadarChart
									outerRadius={90}
									data={this.props.categoryFrequency}
								>
									<PolarGrid />
									<PolarAngleAxis dataKey="category" />
									<PolarRadiusAxis
										angle={30}
										domain={[0, maxValueCategory + 1]}
										axisLine={false}
										tick={false}
										tickCount={1}
									/>
									<Radar
										name="Categories"
										dataKey="val"
										stroke="#82ca9d"
										fill="#82ca9d"
										fillOpacity={0.6}
									/>
									<Legend />
								</RadarChart>
							</ResponsiveContainer>
						</div>
					</Col>
				</Row>
			</Container>
		);
	}
}

// Auxaliary method to extract type of money transaction from a given month
function getMoneyFromMonth(data, month, transactionType) {
	let totalGasto = 0;
	let totalRecebido = 0;

	if (transactionType === "r") {
		data.map((e) => {
			if (e.post.month === month && e.post.amount >= 0) {
				totalRecebido += Number(e.post.amount);
			}
			// Special argument for getting the total amount for the year
			else if (month === "all" && e.post.amount >= 0) {
				totalRecebido += Number(e.post.amount);
			}
		});

		return totalRecebido;
	} else {
		data.map((e) => {
			if (e.post.month === month && e.post.amount < 0) {
				totalGasto += Number(e.post.amount);
			} else if (month === "all" && e.post.amount < 0) {
				totalGasto += Number(e.post.amount);
			}
		});
		return -totalGasto;
	}
}

const mapStateToProps = (state) => {
	return {
		currency: state.settings.currency,
		months: state.appData.months,
		categoryFrequency: state.appData.categoryFrequency,
		items: state.appData.items,
		isAuth: state.auth.token !== null,
		name: state.auth.name,
	};
};

export default connect(mapStateToProps)(HomePage);
