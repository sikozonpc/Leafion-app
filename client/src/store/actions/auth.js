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
				localStorage.setItem("token", res.data.idToken);
				localStorage.setItem("email", email);
				localStorage.setItem("userId", res.data.localId);
				localStorage.setItem("expirationDate", expirationDate);

				// Store username on db to link to the email
				axios
					.post(
						"https://leafion-budget-app.firebaseio.com/User.json",
						{ email: email, name: name }
					)
					.then((res) => {
						console.log("added to db");
						dispatch(getUserNameByEmail(email));
					})
					.catch((error) => {
						console.log(error);
					});

				dispatch(authSuccess(res.data, email));

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
				localStorage.setItem("token", res.data.idToken);
				localStorage.setItem("email", email);
				localStorage.setItem("userId", res.data.localId);
				localStorage.setItem("expirationDate", expirationDate);

				dispatch(authSuccess(res.data, email));
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
export const authSuccess = (authData, userEmail) => {
	return {
		type: ActionTypes.AUTH_START_SUCCESS,
		email: userEmail,
		token: authData.idToken,
		localId: authData.localId,
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
	return {
		type: ActionTypes.AUTH_LOGOUT,
	};
};
export const authCheckState = () => {
	return (dispatch) => {
		const token = localStorage.getItem("token");
		if (!token) {
			dispatch(logout());
		} else {
			const expirationDate = new Date(
				localStorage.getItem("expirationDate")
			);
			if (expirationDate > new Date()) {
				const userId = localStorage.getItem("userId");
				const email = localStorage.getItem("email");

				dispatch(
					authSuccess({ idToken: token, localId: userId }, email)
				);
				dispatch(
					checkAuthTimeout(
						(expirationDate.getTime() - new Date().getTime()) / 1000 // in miliseconds so divide
					)
				);
			} else {
				dispatch(logout());
			}
		}
	};
};

export const getUserNameSucces = (userName) => {
	return {
		type: ActionTypes.USER_NAME_SUCCESS,
		userName: userName,
	};
};
export const getUserNameFailed = (error) => {
	return {
		type: ActionTypes.USER_NAME_FAILED,
		error: error,
	};
};

export const getUserNameByEmail = (email) => {
	return (dispatch) => {
		let userName = "";
		const queryParams = 'orderBy="email"&equalTo="' + email + '"';
		axios
			.get(
				"https://leafion-budget-app.firebaseio.com/User.json?" +
					queryParams
			)
			.then((res) => {
				let users = [];
				for (let key in res.data) {
					users.push(res.data[key]);
				}
				userName = users[0].name;
				dispatch(getUserNameSucces(userName));
			})
			.catch((error) => {
				dispatch(getUserNameFailed(error));
				console.log("Failed to get user", error);
			});
	};
};

export const clearError = () => {
	return {
		type: ActionTypes.CLEAR_ERROR,
	};
};
