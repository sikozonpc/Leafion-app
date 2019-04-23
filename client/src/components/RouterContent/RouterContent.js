import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import HomePage from "../../containers/Home/HomePage";
import RegistryPage from "../../containers/Dashboard/RegistryPage";
import Search from "../../containers/Search/SearchPage";
import AddItem from "../../containers/AddItem/AddItemPage";
import Auth from "../../containers/Auth/Auth";
import Signin from "../../containers/Auth/Signin";
import Login from "../../containers/Auth/Login";
import Settings from "../../containers/Settings/Settings";

const routerContent = (props) => {
	let router = (
		<Switch>
			<Route path="/" component={Auth} exact />
			<Route path="/signin" component={Signin} exact />
			<Route path="/login" component={Login} exact />
			{/* Redirect UNKOWN PAGES TO / */}
			<Redirect to="/" />
		</Switch>
	);
	if (props.isAuth) {
		router = (
			<Switch>
				<Route path="/" component={HomePage} exact />
				<Route path="/settings" component={Settings} exact />
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
	}
	return <>{router}</>;
};

export default routerContent;
