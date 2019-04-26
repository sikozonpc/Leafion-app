import React, { Component } from "react";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import { Container, Col, Row, Form } from "react-bootstrap";
import Button from "../../components/UI/Button/Button";
import { Redirect } from "react-router-dom";

import classes from "./Settings.module.css";

class Settings extends Component {
	render() {
		return (
			<>
				<div className={classes.TitleMain}>
					<h2 className={classes.Title}>Settings</h2>
					<span
						style={{ fontSize: "14px", color: "#777", margin: "0" }}
					>
						Change the app to your preferences
					</span>
				</div>

				<Container className={classes.SettingsWrapper}>
					<Row className={classes.Desc}>
						<Col md lg xl={12} />
						<Col md lg xl={12}>
							<div className={classes.User}>
								<p>
									By letting Leafeon know your personal
									preferences, we can make your user more fun
									and interesting
								</p>
								<span className={classes.UserAvatar}>
									{this.props.name
										? this.props.name[0]
										: null}
								</span>
								<h3>{this.props.name}</h3>
								<p>{this.props.email}</p>
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
						<Col md lg xl={6}>
							<Form.Group controlId="currency">
								<Form.Label>Currency</Form.Label>
								<Form.Control
									type="text"
									placeholder="€, $ ..."
								/>
							</Form.Group>
							<Form.Group controlId="monthlyincome">
								<Form.Label>Monthly Income / Salary</Form.Label>
								<Form.Control type="number" placeholder=" " />
							</Form.Group>
							<Form.Group controlId="monthlyexpense">
								<Form.Label>Monthly Expense</Form.Label>
								<Form.Control type="number" placeholder=" " />
							</Form.Group>
						</Col>
						<Col md lg xl={6}>
							<Form.Group controlId="expectedincome">
								<Form.Label>Expected Income</Form.Label>
								<Form.Control type="number" placeholder=" " />
							</Form.Group>
						</Col>
					</Row>
				</Container>
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isAuth: state.auth.token !== null,
		name: state.auth.name,
		email: state.auth.email,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onLogout: () => dispatch(actions.logout()),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Settings);
