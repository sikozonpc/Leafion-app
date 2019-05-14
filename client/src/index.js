import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import "./index.css";
import App from "./containers/App";
import * as serviceWorker from "./serviceWorker";
import appDataReducer from "./store/reducers/appData.reducer";
import settingsReducer from "./store/reducers/settings.reducer";
import authReducer from "./store/reducers/auth.reducer";

// Setting up the reducer
const rootReducer = combineReducers({
	appData: appDataReducer,
	settings: settingsReducer,
	auth: authReducer,
});

// Middleware
const composeEnhancers = process.env.NODE_ENV === "development" ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__: null  || compose  ;

// Setting up the Redux Store
const store = createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(thunk))
);

// Subscription
//store.subscribe(() => console.log("[Subscription]: " + store.getState()));

const app = (
	<Provider store={store}>
		<App />
	</Provider>
);

ReactDOM.render(app, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
