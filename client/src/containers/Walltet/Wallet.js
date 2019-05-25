import React, { Component } from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";

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
								component={WalletView}
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

export default Wallet;
