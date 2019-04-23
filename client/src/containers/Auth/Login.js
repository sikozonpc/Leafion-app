import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import { Button, Form } from "react-bootstrap";
import { Redirect } from "react-router-dom";

import Spinner from "../../components/UI/Spinner/Spinner";
import classes from "./Auth.module.css";

class Login extends Component {
	state = {
		email: "",
		password: "",
	};

	onChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value,
		});
		console.log(this.state);
	};

	onSubmitHandler = (event) => {
		event.preventDefault();
		this.props.setUserNameByEmail(this.state.email);

		this.props.onAuth(this.state.email, this.state.password);

		this.props.onInitItems(this.state.email);
	};

	render() {
		let error = <p style={{ color: "red" }}>{this.props.error}</p>;
		let form = <Spinner />;
		if (!this.props.loading) {
			form = (
				<form onSubmit={this.onSubmitHandler} className={classes.Form}>
					<Form.Group controlId="formEmail">
						<Form.Label>Email address</Form.Label>
						<Form.Control
							name="email"
							type="email"
							placeholder="Enter email"
							value={this.state.email}
							onChange={this.onChange}
						/>
					</Form.Group>
					<Form.Group controlId="formPassoword">
						<Form.Label>Passoword</Form.Label>
						<Form.Control
							name="password"
							type="password"
							placeholder="Enter password"
							value={this.state.password}
							onChange={this.onChange}
						/>
					</Form.Group>
					<Button type="submit" variant="info">
						Login
					</Button>
				</form>
			);
		}
		return (
			<div className={classes.Auth}>
				{this.props.isAuth ? <Redirect to="/home" /> : null}
				<h2>
					{this.props.isAuth ? (
						<p style={{ color: "green" }}>
							Welcome, {this.props.email}
						</p>
					) : (
						"Login with your Leafion account."
					)}
				</h2>
				{error}
				{form}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isAuth: state.auth.token !== null,
		email: state.auth.email,
		loading: state.auth.loading,
		error: state.auth.error,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onInitItems: (email) => dispatch(actions.fetchItems(email)),
		onAuth: (email, password) =>
			dispatch(actions.authLogin(email, password)),
		setUserNameByEmail: (email) =>
			dispatch(actions.getUserNameByEmail(email)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Login);
