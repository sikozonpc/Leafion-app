import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import HomePage from "../../containers/Home/HomePage";
import RegistryPage from "../../containers/Dashboard/RegistryPage";
import Search from "../../containers/Search/SearchPage";
import AddItem from "../../containers/AddItem/AddItemPage";
import Auth from "../../containers/Auth/Auth";
import SignLogin from "../../containers/Auth/SignLogin";
import Login from "../../containers/Auth/Login";
import Portal from "../../containers/Auth/Portal";

const routerContent = (props) => {
	return (
		<Switch>
			<Route path="/" component={Auth} exact />
			<Route path="/home" component={HomePage} exact />
			<Route path="/signin" component={SignLogin} exact />
			<Route path="/portal" component={Portal} exact />
			<Route path="/login" component={Login} exact />
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

			{/* Redirect UNKOWN PAGES TO / */}
			<Redirect to="/" />
		</Switch>
	);
};

export default routerContent;
