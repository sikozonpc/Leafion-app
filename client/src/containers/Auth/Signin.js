import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import { Button, Form } from "react-bootstrap";

import Spinner from "../../components/UI/Spinner/Spinner";
import classes from "./Auth.module.css";

class Signin extends Component {
	state = {
		email: "",
		password: "",
		name: "",
	};

	onChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value,
		});
	};

	onSubmitHandler = (event) => {
		event.preventDefault();

		this.props.onAuth(
			this.state.email,
			this.state.password,
			this.state.name
		);
	};

	render() {
		let form = <Spinner />;
		if (!this.props.loading) {
			form = (
				<form onSubmit={this.onSubmitHandler} className={classes.Form}>
					<Form.Group controlId="formName">
						<Form.Label>First Name</Form.Label>
						<Form.Control
							name="name"
							type="text"
							placeholder="Enter you name..."
							value={this.state.name}
							onChange={this.onChange}
						/>
					</Form.Group>
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

					<Button type="submit" variant="success">
						Register
					</Button>
				</form>
			);
		}
		return (
			<div className={classes.Auth}>
				<h2>Register an account at Leafion</h2>
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
		onAuth: (email, password, name) =>
			dispatch(actions.authSignin(email, password, name)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Signin);
