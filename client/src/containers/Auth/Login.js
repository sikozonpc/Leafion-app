import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import { Form, Container, Row } from "react-bootstrap";
import Button from "../../components/UI/Button/Button";
import { Redirect } from "react-router-dom";

import Spinner from "../../components/UI/PacmanSpinner/PacmanSpinner";
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
	};

	componentWillUnmount() {
		this.props.clearErrorMessage();
	}

	onSubmitHandler = (event) => {
		event.preventDefault();
		this.props.setUserNameByEmail(this.state.email);
		this.props.onAuth(this.state.email, this.state.password);
		this.props.onInitItems(this.state.email);
	};

	render() {
		let error = (
			<p
				style={{
					color: "red",
					textAlign: "center",
					margin: "3rem auto",
					fontSize: "1.8rem",
				}}
			>
				{this.props.error}
			</p>
		);
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
							required
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
							required
						/>
					</Form.Group>
					<Button type="submit">Login</Button>
				</form>
			);
		}
		return (
			<div className={classes.Window}>
				{!this.props.loading ? (
					<Container>
						{this.props.isAuth ? <Redirect to="/home" /> : null}
						<Row>
							<>
								{this.props.isAuth ? (
									<h2
										style={{
											color: "green",
											textAlign: "center",
											margin: "5rem auto",
											fontSize: "2.9rem",
										}}
									>
										Welcome, {this.props.email}
									</h2>
								) : (
									<h2
										style={{
											color: "#333",
											textAlign: "center",
											margin: "5rem auto",
											fontSize: "2.9rem",
										}}
									>
										Login with your{" "}
										<span style={{ fontWeight: "300" }}>
											Leafion
										</span>{" "}
										account.
									</h2>
								)}
							</>
						</Row>
						<Row
							style={{
								margin: "auto",
								fontSize: "50px",
								color: "##33BE8F",
							}}
						>
							<i
								className="fas fa-leaf"
								style={{
									color: "#33BE8F",
									margin: "20px auto",
								}}
							/>
						</Row>
						<Row>{error}</Row>
						<Row>{form}</Row>
					</Container>
				) : (
					<Spinner />
				)}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isAuth: state.auth.token !== null,
		email: state.auth.email,
		loading: state.auth.loading,
		error: state.auth.prettyError
			? state.auth.prettyError
			: state.auth.error,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onInitItems: (email) => dispatch(actions.fetchItems(email)),
		onAuth: (email, password) =>
			dispatch(actions.authLogin(email, password)),
		setUserNameByEmail: (email) =>
			dispatch(actions.getUserNameByEmail(email)),
		clearErrorMessage: () => dispatch(actions.clearError()),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Login);
