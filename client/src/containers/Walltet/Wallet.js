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
import Account from "./Account/Account";

class Wallet extends Component {
	render() {
		return (
			<>
				<Router>
					<Layout
						userName={this.props.userName}
						deactivateWalletMode={this.props.deactivateWalletMode}
					>
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
							<Route path="/account" component={Account} />
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
