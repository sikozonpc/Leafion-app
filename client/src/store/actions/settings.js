import { ActionTypes } from "./actionTypes";
//import axios from "axios";

export const saveChanges = (monthlyIncome, monthlyExpense, currency) => {
	return (dispatch) => {
		localStorage.setItem("monthlyIncome", monthlyIncome);

		localStorage.setItem("monthlyExpense", monthlyExpense);

		localStorage.setItem("currency", currency);

		dispatch(saveChangesSuccess(monthlyIncome, monthlyExpense, currency));
		/*
		axios
			.post(
				"https://leafion-budget-app.firebaseio.com/Settings.json",
				userSettings
			)
			.then((res) => {
				dispatch(
					saveChangesSuccess(monthlyIncome, monthlyExpense, currency)
				);
				console.log(res);
			})
			.catch((error) =>
				dispatch(saveChangesFailed(error.response.data.error.message))
			);
			*/
	};
};

export const saveChangesSuccess = (monthlyIncome, monthlyExpense, currency) => {
	return {
		type: ActionTypes.SAVE_CHANGES_SUCCESS,
		monthlyIncome: monthlyIncome,
		currency: currency,
		monthlyExpense: monthlyExpense,
	};
};
export const saveChangesFailed = (error) => {
	return {
		type: ActionTypes.SAVE_CHANGES_FAILED,
		error: error,
	};
};

//
// Fetch settings from Firebase
//

export const fetchSettings = () => {
	return (dispatch) => {
		dispatch(fetchChangesInit());
		/*
		const queryParams = 'orderBy="email"&equalTo="' + email + '"';
		axios
			.get(
				"https://leafion-budget-app.firebaseio.com/Settings.json" +
					queryParams
			)
			.then((res) => {
				let data;
				console.log(res.data);
				dispatch(fetchSettingsSuccess(data));
			})
			.catch((error) => dispatch(fetchSettingsFailed(error)));
		*/
		const data = {
			monthlyIncome: localStorage.getItem("monthlyIncome"),
			monthlyExpense: localStorage.getItem("monthlyExpense"),
			currency: localStorage.getItem("currency"),
		};

		if (data) dispatch(fetchSettingsSuccess(data));
		else dispatch(fetchSettingsFailed("Data is empty"));
	};
};
export const fetchChangesInit = () => {
	return {
		type: ActionTypes.FETCH_SETTINGS_INIT,
	};
};
export const fetchSettingsSuccess = (userSettings) => {
	return {
		type: ActionTypes.FETCH_SETTINGS_SUCCESS,
		currency: userSettings.currency,
		monthlyIncome: userSettings.monthlyIncome,
		monthlyExpense: userSettings.monthlyExpense,
	};
};
export const fetchSettingsFailed = (error) => {
	return {
		type: ActionTypes.FETCH_SETTINGS_FAILED,
		error: error,
	};
};
