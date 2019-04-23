import { ActionTypes } from "../actions/actionTypes";

const initialState = {
	token: null,
	localId: null,
	email: null,
	error: null,
	loading: false,
	name: null,
};

const authReducer = (state = initialState, action) => {
	if (action.type === ActionTypes.AUTH_START) {
		return {
			...state,
			loading: true,
			error: null,
		};
	}
	if (action.type === ActionTypes.AUTH_START_SUCCESS) {
		return {
			...state,
			loading: false,
			error: null,
			token: action.token,
			localId: action.localId,
			email: action.email,
		};
	}
	if (action.type === ActionTypes.AUTH_START_FAILED) {
		return {
			...state,
			loading: false,
			error: action.error,
		};
	}
	if (action.type === ActionTypes.AUTH_LOGOUT) {
		return {
			...state,
			loading: false,
			error: null,
			token: null,
			localId: null,
			email: null,
			name: null,
		};
	}
	if (action.type === ActionTypes.USER_NAME_SUCCESS) {
		return {
			...state,
			name: action.userName,
		};
	}
	if (action.type === ActionTypes.USER_NAME_FAILED) {
		return {
			...state,
			error: action.error,
		};
	}

	return state;
};

export default authReducer;
