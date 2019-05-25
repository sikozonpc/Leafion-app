import React, { Component } from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../store/actions/index";

import Spinner from "../components/UI/PacmanSpinner/PacmanSpinner";
import Layout from "./Layout/Layout";
import RouterContent from "../components/RouterContent/RouterContent";
import WelcomeTutorial from "../components/WelcomeTutorial/WelcomeTutorial";
import Wallet from "./Walltet/Wallet";

//
// Container of the structure of the application and state.
//
class App extends Component {
	state = {
		searchResult: "",
	};

	// Api call to the API Server to get the database
	componentDidMount() {
		const email = localStorage.getItem("email");
		this.props.onInitItems(email);
		if (email) {
			this.props.setUserNameByEmail(email);
			this.props.onTryAutoLogin();
		}

		// Fetch User settings
		this.props.onFetchSettingsFromLocalStorage();
	}

	setSearchResult = (string) => {
		this.setState({ searchResult: string.toUpperCase() });
	};

	// Responsible for removing an item from the db.
	removeHandler = (id) => {
		this.props.onRemoveItem(id);

		//window.location.reload();
	};

	// TODO: might be depraced - Global onChangeHandler for state changes
	onChangeHandler = (event) => {
		const [name, value] = event.target;
		this.setState({ [name]: value });
	};

	activateWalletMode = () => {
		this.props.activateWalletMode();
	};

	render() {
		// Because I am using router for the pages the Content section is dynamically added by it
		let routerContent = this.props.items ? (
			<RouterContent
				isAuth={this.props.isAuth}
				removeHandler={this.removeHandler}
				searchResult={this.state.searchResult}
			/>
		) : (
			<Spinner />
		);
		let display = (
			<Layout
				setSearchResult={this.setSearchResult}
				name={this.props.name}
				isAuth={this.props.isAuth}
				tutorial={this.props.tutorial}
				activateWalletMode={this.props.activateWalletMode}
			>
				{routerContent}
			</Layout>
		);
		if (this.props.tutorial) {
			display = (
				<>
					<Route path="/wallet" component={Wallet} />
					<WelcomeTutorial endTutorial={this.props.onEndTutorial} />
				</>
			);
		}

		if (this.props.walletModeOn) {
			display = <Wallet userName={this.props.name} />;
		}

		return <Router>{display}</Router>;
	}
}

const mapStateToProps = (state) => {
	return {
		isAuth: state.auth.token !== null,
		currency: state.settings.currency,
		months: state.appData.months,
		categoryFrequency: state.appData.categoryFrequency,
		items: state.appData.items,
		name: state.auth.name,
		tutorial: state.auth.tutorial,
		walletModeOn: state.wallet.walletModeOn,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onInitItems: (email) => dispatch(actions.fetchItems(email)),
		onRemoveItem: (id) => dispatch(actions.removeItem(id)),
		onTryAutoLogin: (name) => dispatch(actions.authCheckState(name)),
		setUserNameByEmail: (email) =>
			dispatch(actions.getUserNameByEmail(email)),
		onFetchSettingsFromLocalStorage: () =>
			dispatch(actions.fetchSettings()),
		onEndTutorial: () => dispatch(actions.endTutorial()),
		activateWalletMode: () => dispatch(actions.activateWalletMode()),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);
