import { ActionTypes } from "./actionTypes";
import axios from "axios";

export const authSignin = (email, password, name) => {
	return (dispatch) => {
		// For loading purporses I send an action for setting loading to true
		dispatch(authStart());

		const authData = {
			email: email,
			password: password,
			returnSecureToken: true,
		};

		const token = "AIzaSyCopYnaTX31la6M8fOtfnIyNOpk71AlNGM";
		// Endpoint URL for firebase API signin request
		const url =
			"https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=" +
			token;

		axios
			.post(url, authData)
			.then((res) => {
				const expirationDate = new Date(
					new Date().getTime() + res.data.expiresIn * 1000
				);
				// Set the token and expiriration to localStorage
				localStorage.setItem("userName", name);
				localStorage.setItem("token", res.data.token);
				localStorage.setItem("email", email);
				localStorage.setItem("userId", res.data.localId);
				localStorage.setItem("expirationDate", expirationDate);

				dispatch(authSuccess(res.data, email, name));
				dispatch(checkAuthTimeout(res.data.expiresIn));
			})
			.catch((error) => {
				dispatch(authFailed(error.response.data.error.message));
			});
	};
};
export const authLogin = (email, password) => {
	return (dispatch) => {
		// For loading purporses I send an action for setting loading to true
		dispatch(authStart());

		const authData = {
			email: email,
			password: password,
			returnSecureToken: true,
		};

		const token = "AIzaSyCopYnaTX31la6M8fOtfnIyNOpk71AlNGM";
		// Endpoint URL for firebase API signin request
		const url =
			"https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=" +
			token;

		axios
			.post(url, authData)
			.then((res) => {
				const expirationDate = new Date(
					new Date().getTime() + res.data.expiresIn * 1000
				);
				const name = localStorage.getItem("userName");
				localStorage.setItem("token", res.data.token);
				localStorage.setItem("email", email);
				localStorage.setItem("userId", res.data.localId);
				localStorage.setItem("expirationDate", expirationDate);

				dispatch(authSuccess(res.data, email, name));
				dispatch(checkAuthTimeout(res.data.expiresIn));
			})
			.catch((error) => {
				dispatch(authFailed(error.response.data.error.message));
			});
	};
};
export const authStart = () => {
	return {
		type: ActionTypes.AUTH_START,
	};
};
export const authSuccess = (authData, userEmail, name) => {
	return {
		type: ActionTypes.AUTH_START_SUCCESS,
		email: userEmail,
		token: authData.idToken,
		localId: authData.localId,
		name: name,
	};
};
export const authFailed = (error) => {
	return {
		type: ActionTypes.AUTH_START_FAILED,
		error: error,
	};
};
export const checkAuthTimeout = (expirationTime) => {
	return (dispatch) => {
		console.log(expirationTime);
		setTimeout(() => {
			dispatch(logout());
		}, expirationTime * 1000); // expirationTime cames in seconds
	};
};
export const logout = () => {
	localStorage.removeItem("token");
	localStorage.removeItem("expirationDate");
	localStorage.removeItem("email");
	localStorage.removeItem("userId");
	localStorage.removeItem("userName");
	return {
		type: ActionTypes.AUTH_LOGOUT,
	};
};
