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
			name: action.name,
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

	return state;
};

export default authReducer;
