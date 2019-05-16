import React, { Component } from "react";
import { Row, Col, Container } from "react-bootstrap";
import Button from "../../components/UI/Button/Button";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

import Envirioment from "../../assets/svg/undraw_environment_iaus.svg";
import classes from "./Auth.module.css";

class Auth extends Component {
	onLoginWithTestAccount = () => {
		this.props.testAccountLogin();
		this.props.getUserNameWithEmail();
		this.props.onInitItems();
		this.props.onFetchSettingsFromLocalStorage();
	};

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
					<Col xs={11} md lg xl={6} className={classes.TextBox}>
						<h1>
							Start Saving{" "}
							<span style={{ fontWeight: "300" }}>Today</span>
						</h1>
						<p>
							Are you having trouble managing your money ? Or
							perhaps you want to keep track of where your money
							goes ? Then, why don’t try Saving with Leafion !
						</p>
						<Button link toLink="/signin">
							Start saving now
						</Button>
						<Button
							clickEvent={this.onLoginWithTestAccount}
							variant="outline-green--test-acc"
						>
							Use test account
						</Button>
					</Col>
				</Row>
			</Container>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		testAccountLogin: () =>
			dispatch(actions.authLogin("testleafion@leafion.com", "test123")),
		getUserNameWithEmail: () =>
			dispatch(actions.getUserNameByEmail("testleafion@leafion.com")),
		onInitItems: () =>
			dispatch(actions.fetchItems("testleafion@leafion.com")),
		onFetchSettingsFromLocalStorage: () =>
			dispatch(actions.fetchSettings()),
	};
};

export default connect(
	null,
	mapDispatchToProps
)(Auth);
