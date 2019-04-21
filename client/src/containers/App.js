import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../store/actions/index";

import Spinner from "../components/UI/Spinner/Spinner";
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
		this.props.onInitItems();
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
				removeHandler={this.removeHandler}
				searchResult={this.state.searchResult}
			/>
		) : (
			<Spinner />
		);

		return (
			<Router>
				<Layout setSearchResult={this.setSearchResult}>
					{routerContent}
				</Layout>
			</Router>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		currency: state.settings.currency,
		months: state.appData.months,
		categoryFrequency: state.appData.categoryFrequency,
		items: state.appData.items,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onInitItems: () => dispatch(actions.fetchItems()),
		onRemoveItem: (id) => dispatch(actions.removeItem(id)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);
