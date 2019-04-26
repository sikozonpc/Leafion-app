import { ActionTypes } from "./actionTypes";

//// Fetch Items ////
// Async fetch with redux-thunk
export const fetchItems = (email) => {
	return (dispatch) => {
		fetch("/items/all")
			.then((res) => res.json())
			.then((db) => {
				const userItems = db.filter((e) => {
					return e.post.email === email;
				});
				dispatch(setItemsSucces(userItems));
			})
			.catch((error) => dispatch(fetchItemsFailed()));
	};
};
export const setItemsSucces = (items) => {
	return {
		type: ActionTypes.FETCH_ITEMS_SUCCESS,
		items: items,
	};
};
export const fetchItemsFailed = () => {
	return {
		type: ActionTypes.FETCH_ITEMS_FAILED,
	};
};

//// Add Item ////
export const addItem = (item) => {
	return (dispatch) => {
		fetch("/items/add", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: item,
		})
			.then((e) => dispatch(addItemSucess()))
			.catch((error) => dispatch(addItemFailed()));
	};
};

export const removeItem = (itemId) => {
	return (dispatch) => {
		fetch("/items/remove", {
			method: "delete",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				id: itemId,
			}),
		})
			.then((res) => {
				if (res.ok) return res.json();
			})
			.then((data) => {
				dispatch(removeItemSuccess());
			})
			.catch((err) => removeItemFailed(err));
	};
};
export const addItemSucess = () => {
	return {
		type: ActionTypes.ADD_ITEM_SUCCESS,
	};
};
export const addItemFailed = () => {
	return {
		type: ActionTypes.ADD_ITEM_FAILED,
	};
};
export const removeItemSuccess = () => {
	return {
		type: ActionTypes.REMOVE_ITEM_SUCCESS,
	};
};
export const removeItemFailed = (error) => {
	return {
		type: ActionTypes.REMOVE_ITEM_FAILED,
		error: error,
	};
};

export const sortItems = () => {
	return {
		type: ActionTypes.SORT_ITEMS,
	};
};
