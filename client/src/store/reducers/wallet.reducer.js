import { ActionTypes } from "../actions/actionTypes";

const initialState = {
	walletModeOn: false,
	balance: 0,
	items: [],
};

const walletReducer = (state = initialState, action) => {
	if (action.type === ActionTypes.ACTIVATE_WALLET_MODE) {
		return {
			...state,
			walletModeOn: true,
		};
	}

	if (action.type === ActionTypes.DEACTIVATE_WALLET_MODE) {
		return {
			...state,
			walletModeOn: false,
		};
	}

	if (action.type === ActionTypes.ADD_ITEM_WALLET_SUCCESS) {
		return {
			...state,
			items: state.items.concat(action.item),
		};
	}

	if (action.type === ActionTypes.REMOVE_ITEM_WALLET) {
		const newBal = state.balance + parseFloat(action.item.price);
		const newItems = state.items.filter((item) => {
			return (
				item.name !== action.item.name &&
				item.price !== action.item.price
			);
		});

		return {
			...state,
			balance: newBal,
			items: newItems,
		};
	}

	if (action.type === ActionTypes.FETCH_BAL_SUCCESS) {
		return {
			...state,
			balance: action.bal,
		};
	}

	return state;
};

export default walletReducer;
