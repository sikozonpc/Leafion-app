import React, { Component } from "react";
import { Row, Col, Button, Container } from "react-bootstrap";

import Envirioment from "../../assets/svg/undraw_environment_iaus.svg";
import classes from "./Auth.module.css";

class Auth extends Component {
	render() {
		return (
			<Container fluid className={classes.Auth}>
				<Row className={classes.Container}>
					<Col xs md lg xl={4} style={{ padding: 0 }}>
						<img
							src={Envirioment}
							className={classes.Img}
							alt="Person holding a flower"
						/>
					</Col>
					<Col xs md lg xl={6} className={classes.TextBox}>
						<h1>
							Start Saving{" "}
							<span style={{ fontWeight: "300" }}>Today</span>
						</h1>
						<p>
							Are you having trouble managing your money ? Or
							perhaps you want to keep track of where your money
							goes ? Then, why don’t try Saving with Leafion !
						</p>
						<Button
							variant="success"
							className={classes.ButtonSave}
						>
							Start saving now
						</Button>
					</Col>
				</Row>
			</Container>
		);
	}
}

export default Auth;
