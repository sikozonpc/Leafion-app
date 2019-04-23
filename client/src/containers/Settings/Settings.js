import React, { Component } from "react";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";

class Settings extends Component {
	render() {
		return (
			<div>
				Settings
				{this.props.isAuth ? (
					<Button onClick={this.props.onLogout}>Logout</Button>
				) : (
					<Redirect to="/portal" />
				)}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isAuth: state.auth.token !== null,
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
