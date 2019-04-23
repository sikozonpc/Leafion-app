import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import { Button, Form } from "react-bootstrap";

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

	onSubmitHandler = (event, isAuth) => {
		event.preventDefault();

		this.props.onAuth(this.state.email, this.state.password);
	};

	render() {
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
				<h2>
					{this.props.isAuth
						? "Welcome " + this.props.email
						: "Login with your Leafion account."}
				</h2>
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
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onAuth: (email, password) =>
			dispatch(actions.authLogin(email, password)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Login);
