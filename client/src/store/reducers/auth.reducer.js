import { ActionTypes } from "../actions/actionTypes";

const initialState = {
	token: null,
	localId: null,
	email: null,
	error: null,
	prettyError: null,
	loading: false,
	name: null,
	tutorial: false,
};

const authReducer = (state = initialState, action) => {
	if (action.type === ActionTypes.AUTH_START) {
		return {
			...state,
			loading: true,
			error: null,
			prettyError: null,
		};
	}
	if (action.type === ActionTypes.AUTH_START_SUCCESS) {
		return {
			...state,
			loading: false,
			error: null,
			prettyError: null,
			token: action.token,
			localId: action.localId,
			email: action.email,
		};
	}
	if (action.type === ActionTypes.AUTH_START_FAILED) {
		// Parse error message to pretty one
		const prettyErrorMsg = parseErrorMessage(action.error);

		return {
			...state,
			loading: false,
			error: action.error,
			prettyError: prettyErrorMsg,
		};
	}
	if (action.type === ActionTypes.AUTH_LOGOUT) {
		return {
			...state,
			loading: false,
			error: null,
			prettyError: null,
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
	if (action.type === ActionTypes.CLEAR_ERROR) {
		return {
			...state,
			error: null,
			prettyError: null,
		};
	}
	if (action.type === ActionTypes.PLAY_TUTORIAL) {
		return {
			...state,
			tutorial: true,
		};
	}
	if (action.type === ActionTypes.END_TUTORIAL) {
		return {
			...state,
			tutorial: false,
		};
	}

	return state;
};

//
// Parses the error message from Firebase into a user friendly message
//
function parseErrorMessage(errorMsg) {
	switch (errorMsg) {
		case "EMAIL_EXISTS":
			return "This email address is already connected to an account";

		case "WEAK_PASSWORD : Password should be at least 6 characters":
			return "Password should be at least 6 characters";
		case "INVALID_PASSWORD":
			return "Invalid Password";
		case "EMAIL_NOT_FOUND":
			return "This email address is not registred to a valid account";
		case "MISSING_PASSWORD":
			return "You forgot to write the password";
		case "TOO_MANY_ATTEMPTS_TRY_LATER : Too many unsuccessful login attempts. Please include reCaptcha verification or try again later":
			return "Too many unsuccessful login attempts, try again later";
		default:
			return null;
	}
}

export default authReducer;
