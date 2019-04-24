import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import { Button, Form, Row, Container } from "react-bootstrap";

import WelcomeSVG from "../../assets/svg/undraw_welcome_3gvl.svg";
import Spinner from "../../components/UI/PacmanSpinner/PacmanSpinner";
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
				<h2 style={{ margin: "50px auto", textAlign: "center" }}>
					Register an account at{" "}
					<span style={{ fontWeight: "300" }}>Leafion</span>
				</h2>
				<Container>
					<Row>
						<img
							src={WelcomeSVG}
							alt="Welcome person"
							className={classes.ImgSvg}
						/>
					</Row>
				</Container>
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
