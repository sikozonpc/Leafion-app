import React from "react";
import { Route, Switch } from "react-router-dom";

import HomePage from "../../containers/Home/HomePage";
import RegistryPage from "../../containers/Dashboard/RegistryPage";
import Search from "../../containers/Search/SearchPage";
import AddItem from "../../containers/AddItem/AddItemPage";

const routerContent = (props) => {
	return (
		<Switch>
			<Route path="/" component={HomePage} exact />
			<Route path="/add/:transaction" component={AddItem} />
			<Route
				path="/items"
				render={() => (
					<RegistryPage removeHandler={props.removeHandler} />
				)}
			/>
			<Route
				path="/search"
				render={() => (
					<Search
						search={props.searchResult}
						removeHandler={props.removeHandler}
					/>
				)}
			/>
		</Switch>
	);
};

export default routerContent;
