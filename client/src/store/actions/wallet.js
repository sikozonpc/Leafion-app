import { ActionTypes } from "./actionTypes";

export const activateWalletMode = () => {
	return {
		type: ActionTypes.ACTIVATE_WALLET_MODE,
	};
};

export const deactivateWalletMode = () => {
	return {
		type: ActionTypes.DEACTIVATE_WALLET_MODE,
	};
};

export const removeItemWallet = (item) => {
	return {
		type: ActionTypes.REMOVE_ITEM_WALLET,
		item: item,
	};
};

// Adds to local storage balance variable
export const addItemWallet = (item) => {
	return (dispatch) => {
		let newBal = localStorage.getItem("bal");

		if (newBal) {
			// add the value
			newBal = Number(newBal) - Number(item.price);
			localStorage.setItem("bal", newBal);

			dispatch(addItemWalletSuccess(item));
		} else {
			// create a new localstorage property

			localStorage.setItem("bal", item.price);
			dispatch(walletCreateNewProperty());
		}
	};
};

const addItemWalletSuccess = (item) => {
	return {
		type: ActionTypes.ADD_ITEM_WALLET_SUCCESS,
		item: item,
	};
};
const walletCreateNewProperty = () => {
	return {
		type: ActionTypes.ADD_ITEM_WALLET_CREATING_NEW_PROPERTY,
	};
};

// Fetches from local storage
export const fetchBalance = () => {
	return (dispatch) => {
		const bal = localStorage.getItem("bal");

		if (bal) {
			dispatch(fetchBalanceSucess(bal));
		} else {
			localStorage.setItem("bal", 0);
			dispatch(walletCreateNewProperty());
		}
	};
};

const fetchBalanceSucess = (bal) => {
	return {
		type: ActionTypes.FETCH_BAL_SUCCESS,
		bal: bal,
	};
};

export const addFunds = (ammount) => {
	return (dispatch) => {
		let newBal = localStorage.getItem("bal");

		if (newBal) {
			newBal = Number(newBal) + Number(ammount);
			localStorage.setItem("bal", newBal);

			dispatch(addFundsSuccess());
		} else {
			localStorage.setItem("bal", ammount);
			dispatch(walletCreateNewProperty());
		}
	};
};

const addFundsSuccess = () => {
	return {
		type: ActionTypes.ADD_FUNDS_SUCCESS,
	};
};
