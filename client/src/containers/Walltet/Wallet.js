import React, { Component } from "react";
import { connect } from "react-redux";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";

import * as actions from "../../store/actions/index";

import Layout from "./Layout/Layout";
import WalletView from "./WalletView/WalletView";
import AddItem from "./AddItem/AddItem";
import Account from "./Account/Account";
import Cart from "./Cart/Cart";

class Wallet extends Component {
	addItemHandler = (event, item) => {
		event.preventDefault();
		this.props.addItemWallet(item);
	};
	removeItemHandler = (event, item) => {
		event.preventDefault();
		this.props.removeItemWallet(item);
	};

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
										balance={this.props.balance}
									/>
								)}
								exact
							/>
							<Route
								path="/cart"
								render={() => (
									<Cart
										items={this.props.items}
										removeItem={this.removeItemHandler}
									/>
								)}
							/>
							<Route
								path="/additemcart"
								render={() => (
									<AddItem addItem={this.addItemHandler} />
								)}
							/>
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
		items: state.wallet.items,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		deactivateWalletMode: () => dispatch(actions.deactivateWalletMode()),
		addItemWallet: (item) => dispatch(actions.addItemWallet(item)),
		removeItemWallet: (item) => dispatch(actions.removeItemWallet(item)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Wallet);
