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
	refetch: false,
};

const appDataReducer = (state = initialState, action) => {
	if (action.type === ActionTypes.FETCH_ITEMS_FAILED) {
		return {
			...state,
			error: true,
			refetch: false,
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
			refetch: false,
		};
	}

	if (action.type === ActionTypes.ADD_ITEM_SUCCESS) {
		return {
			...state,
			success: true,
			refetch: true,
		};
	}
	if (action.type === ActionTypes.REMOVE_ITEM_SUCCESS) {
		return {
			...state,
			error: false,
			refetch: true,
		};
	}
	if (action.type === ActionTypes.REMOVE_ITEM_FAILED) {
		return {
			...state,
			error: action.error,
			refetch: false,
		};
	}
	if (action.type === ActionTypes.SORT_ITEMS) {
		let sortedItems = [...state.items];
		console.log(sortedItems);
		sortedItems.sort((a, b) => {
			console.log(
				a.post.name[0].toLowerCase(),
				b.post.name[0].toLowerCase()
			);
			if (a.post.name[0].toLowerCase() < b.post.name[0].toLowerCase()) {
				return -1;
			}
			if (a.post.name[0].toLowerCase() > b.post.name[0].toLowerCase()) {
				return 1;
			}
			return 0;
		});
		console.log(sortedItems);
		return {
			...state,
			items: sortedItems,
			refetch: false,
		};
	}

	return state;
};

export default appDataReducer;
