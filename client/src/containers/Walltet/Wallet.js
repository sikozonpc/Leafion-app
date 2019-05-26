import React, { Component } from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

import Layout from "./Layout/Layout";
import WalletView from "./WalletView/WalletView";
import AddItem from "./AddItem/AddItem";

class Wallet extends Component {
	render() {
		return (
			<>
				<Router>
					<Layout userName={this.props.userName}>
						<Switch>
							<Route
								path="/wallet"
								render={() => (
									<WalletView
										deactivateWalletMode={
											this.props.deactivateWalletMode
										}
									/>
								)}
								exact
							/>
							<Route path="/additemcart" component={AddItem} />
							{/* Redirect UNKOWN PAGES TO / */}
							<Redirect to="/" />
						</Switch>
					</Layout>
				</Router>
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		balance: state.wallet.balance,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		deactivateWalletMode: () => dispatch(actions.deactivateWalletMode()),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Wallet);
