import React, { Component } from "react";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import { Container, Col, Row, Form, Alert } from "react-bootstrap";
import Button from "../../components/UI/Button/Button";
import { Redirect } from "react-router-dom";
import Spinner from "../../components/UI/PacmanSpinner/PacmanSpinner";
import PageHeader from "../../components/PageHeader/PageHeader";
import classes from "./Settings.module.css";

class Settings extends Component {
	state = {
		monthlyIncome: "",
		monthlyExpense: "",
		currency: "",
		showAlert: false,
	};

	componentDidMount() {
		// Setting the saved settings to state
		this.setState({
			monthlyIncome: this.props.monthlyIncome,
			monthlyExpense: this.props.monthlyExpense,
			currency: this.props.currency,
		});
	}

	saveChanges = () => {
		//TODO: Validation
		this.props.saveChanges(
			this.state.monthlyIncome,
			this.state.monthlyExpense,
			this.state.currency
		);
		this.setState({ showAlert: true });
	};

	onChangeHandler = (e) => {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	};

	render() {
		let alert = null;
		if (this.state.showAlert) {
			alert = (
				<Alert variant={"success"} style={{ fontSize: "1.8rem" }}>
					Changes were made successfuly!
				</Alert>
			);
		}
		return (
			<>
				<PageHeader
					title="Settings"
					desc="Change the app to your preferences"
				/>

				{this.props.loading ? (
					<Spinner />
				) : (
					<Container className={classes.SettingsWrapper}>
						<Row className={classes.Desc}>
							<Col md lg xl={12}>
								<div className={classes.User}>
									<span className={classes.UserAvatar}>
										{this.props.name
											? this.props.name[0]
											: null}
									</span>
									<h3>{this.props.name}</h3>
									<p style={{ color: "gray" }}>
										{this.props.email}
									</p>
									<div className={classes.Buttons}>
										{this.props.isAuth ? (
											<Button
												clickEvent={this.props.onLogout}
											>
												Logout
											</Button>
										) : (
											<Redirect to="/portal" />
										)}
										<Button variant="outline-green">
											Download data
										</Button>
									</div>
								</div>
							</Col>
						</Row>
						<Row className={classes.UserSettings}>
							<p>
								By letting Leafeon know your personal
								preferences, we can make your user more fun and
								interesting.
							</p>
							<Col md lg xl={12}>
								<Form.Group controlId="currency">
									<Form.Label>Currency</Form.Label>
									<Form.Control
										type="text"
										name="currency"
										placeholder="€, $ ..."
										value={this.state.currency}
										onChange={this.onChangeHandler}
									/>
								</Form.Group>
								<h3>
									Goals{" "}
									<span
										style={{
											fontSize: "15px",
											color: "gray",
										}}
									>
										(Currently not working)
									</span>
								</h3>
								<Form.Group controlId="monthlyincome">
									<Form.Label>
										Monthly Income / Salary
									</Form.Label>
									<Form.Control
										name="monthlyIncome"
										type="number"
										placeholder="Optional constant incomes "
										value={this.state.monthlyIncome}
										onChange={this.onChangeHandler}
									/>
								</Form.Group>
								<Form.Group controlId="monthlyexpense">
									<Form.Label>Monthly Expense</Form.Label>
									<Form.Control
										name="monthlyExpense"
										type="number"
										placeholder="Optional constant sum of expenses "
										value={this.state.monthlyExpense}
										onChange={this.onChangeHandler}
									/>
								</Form.Group>
								<Button clickEvent={this.saveChanges}>
									Save changes
								</Button>
							</Col>
						</Row>

						{alert}
					</Container>
				)}
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isAuth: state.auth.token !== null,
		name: state.auth.name,
		email: state.auth.email,
		currency: state.settings.currency,
		monthlyIncome: state.settings.monthlyIncome,
		monthlyExpense: state.settings.monthlyExpense,
		loading: state.settings.loading,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onLogout: () => dispatch(actions.logout()),
		saveChanges: (monthlyIncome, monthlyExpense, currency) =>
			dispatch(
				actions.saveChanges(monthlyIncome, monthlyExpense, currency)
			),
		onFetchSettingsFromLocalStorage: () =>
			dispatch(actions.fetchSettings()),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Settings);
