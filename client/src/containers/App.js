import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../store/actions/index";

import Spinner from "../components/UI/PacmanSpinner/PacmanSpinner";
import Layout from "./Layout/Layout";
import RouterContent from "../components/RouterContent/RouterContent";

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

		return (
			<Router>
				<Layout
					setSearchResult={this.setSearchResult}
					name={this.props.name}
					isAuth={this.props.isAuth}
				>
					{routerContent}
				</Layout>
			</Router>
		);
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
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);
