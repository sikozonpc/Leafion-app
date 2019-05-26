import { ActionTypes } from "../actions/actionTypes";

const initialState = {
	walletModeOn: false,
	balance: 0,
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

	return state;
};

export default walletReducer;
