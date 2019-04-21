import { ActionTypes } from "../actions/actionTypes";

const initialState = {
	items: null,
	categoryFrequency: {},
	months: {
		January: "jan",
		February: "feb",
		March: "mar",
		April: "apr",
		May: "may",
		June: "jun",
		July: "jul",
		August: "aug",
		September: "sep",
		October: "oct",
		November: "nov",
		December: "dec",
	},
	error: false,
	success: false,
};

// TODO: Handle ERROR on app
const appDataReducer = (state = initialState, action) => {
	if (action.type === ActionTypes.FETCH_ITEMS_FAILED) {
		return {
			...state,
			error: true,
		};
	}

	if (action.type === ActionTypes.FETCH_ITEMS_SUCCESS) {
		// Create a map of frequency of the categories
		let categories = {};
		for (let item of action.items) {
			let cat = item.post.category;
			categories[cat] = categories[cat] ? categories[cat] + 1 : 1;
		}
		let categoriesArr = [];
		for (let cat in categories) {
			categoriesArr.push({
				category: cat,
				val: categories[cat],
			});
		}
		return {
			...state,
			items: action.items,
			categoryFrequency: categoriesArr,
		};
	}

	if (action.type === ActionTypes.ADD_ITEM_SUCCESS) {
		return {
			...state,
			success: true,
		};
	}
	if (action.type === ActionTypes.REMOVE_ITEM_SUCCESS) {
		return {
			...state,
			error: false,
		};
	}
	if (action.type === ActionTypes.REMOVE_ITEM_FAILED) {
		return {
			...state,
			error: action.error,
		};
	}

	return state;
};

export default appDataReducer;
