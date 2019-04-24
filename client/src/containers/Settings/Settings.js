import React, { Component } from "react";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import { Button, Container, Col, Row, Form } from "react-bootstrap";
import { Redirect } from "react-router-dom";

import classes from "./Settings.module.css";

class Settings extends Component {
	render() {
		return (
			<Container className={classes.SettingsWrapper}>
				<Row className={classes.Desc}>
					<Col md lg xl={12} />
					<Col md lg xl={12}>
						<div className={classes.User}>
							<h2 className={classes.Title}>Settings</h2>
							<p>
								By letting Leafion know your personal
								preferences it can make your user experince more
								enjoyable and accruate
							</p>
							<span className={classes.UserAvatar}>
								{this.props.name ? this.props.name[0] : null}
							</span>
							<h3>{this.props.name}</h3>
							<p>{this.props.email}</p>
							<div className={classes.Buttons}>
								{this.props.isAuth ? (
									<Button
										onClick={this.props.onLogout}
										variant="success"
									>
										Logout
									</Button>
								) : (
									<Redirect to="/portal" />
								)}
								<Button variant="outline-success">
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
							<Form.Control type="text" placeholder="€, $ ..." />
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
