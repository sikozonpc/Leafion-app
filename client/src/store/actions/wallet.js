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
