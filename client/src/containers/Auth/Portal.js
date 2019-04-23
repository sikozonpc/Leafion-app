import React, { Component } from "react";

import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";

import classes from "./Auth.module.css";

class Portal extends Component {
	render() {
		return (
			<Container className={classes.Auth}>
				<h2>Leafion</h2>
				<Link to="/signin" className={classes.ButtonSave}>
					Sign In
				</Link>
				<Link to="/login" className={classes.ButtonSave}>
					Log In
				</Link>
			</Container>
		);
	}
}

export default Portal;
