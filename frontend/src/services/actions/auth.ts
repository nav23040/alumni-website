import { Dispatch } from 'redux';
import { loginUser, logoutUser, refreshToken } from '../api/auth';
import { LOGIN_SUCCESS, LOGOUT_SUCCESS, SET_LOADING_F } from './actionTypes';

export interface signInPayload {
	email: String;
	password: String;
}

export const checkAuthAction = () => async (dispatch: Dispatch) => {
	try {
		const res = await refreshToken();
		if (res?.data?.error === true) {
			throw new Error(res.data.message);
		}
		dispatch({ type: LOGIN_SUCCESS, payload: res.data });
		dispatch({ type: SET_LOADING_F });
	} catch (error) {
		dispatch({ type: SET_LOADING_F, error: error.message });
		console.log(error.message);
	}
};

export const signInAction = (payload: signInPayload) => async (
	dispatch: Dispatch
) => {
	try {
		const res = await loginUser(payload);
		if (res?.data?.error === true) {
			throw new Error(res.data.message);
		}
		dispatch({ type: LOGIN_SUCCESS, payload: res.data });
	} catch (error) {
		console.log(error.message);
	}
};

export const logoutAction = (token: string) => async (dispatch: Dispatch) => {
	try {
		const res = await logoutUser(token);
		console.log(res);
		if (res?.data?.error === true) {
			throw new Error(res.data.message);
		}
		console.log('/');
		dispatch({ type: LOGOUT_SUCCESS, payload: undefined });
	} catch (error) {
		console.log(error.message);
	}
};
