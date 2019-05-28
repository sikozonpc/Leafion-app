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

export const addItemWallet = (item) => {
	return {
		type: ActionTypes.ADD_ITEM_WALLET,
		item: item,
	};
};

export const removeItemWallet = (item) => {
	return {
		type: ActionTypes.REMOVE_ITEM_WALLET,
		item: item,
	};
};
