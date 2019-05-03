import { ActionTypes } from "../actions/actionTypes";

const initialState = {
	currency: "€",
	monthlyIncome: null,
	monthlyExpense: null,
	error: null,
	loading: false,
};

const settingsReducer = (state = initialState, action) => {
	//TODO: Using local storage to store the settings
	// but maybe in future store the local storage data in database on save

	if (action.type === ActionTypes.SAVE_CHANGES_SUCCESS) {
		return {
			...state,
			currency: action.currency,
			monthlyIncome: action.monthlyIncome,
			monthlyExpense: action.monthlyExpense,
		};
	}

	if (action.type === ActionTypes.FETCH_SETTINGS_INIT) {
		return {
			...state,
			loading: true,
		};
	}
	if (action.type === ActionTypes.FETCH_SETTINGS_SUCCESS) {
		return {
			...state,
			currency: action.currency,
			monthlyIncome: action.monthlyIncome,
			monthlyExpense: action.monthlyExpense,
			loading: false,
		};
	}
	if (action.type === ActionTypes.FETCH_SETTINGS_FAILED) {
		return {
			...state,
			error: action.error,
		};
	}

	return state;
};

export default settingsReducer;
