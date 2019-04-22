import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import { Button, Form, Label } from "react-bootstrap";

import classes from "./Auth.module.css";

class SignLogin extends Component {
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

	onSubmitHandler = () => {
		// Send request to firebase from action
	};
	render() {
		return (
			<div className={classes.Auth}>
				<h2>Login with a Google account</h2>
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
					<Form.Group controlId="formPassowrd">
						<Form.Label>Passowrd</Form.Label>
						<Form.Control
							name="password"
							type="password"
							placeholder="Enter password"
							value={this.state.password}
							onChange={this.onChange}
						/>
					</Form.Group>

					<Button type="submit" variant="success">
						Register
					</Button>
				</form>
			</div>
		);
	}
}

export default SignLogin;
