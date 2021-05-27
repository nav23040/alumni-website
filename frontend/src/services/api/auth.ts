import axios from 'axios';
import { reqOptions, apiURL } from './common';

export const verifyEmail = async (payload: any) =>
	await axios.post(`${apiURL}/auth/check_email`, payload, reqOptions());

export const registerUser = async (payload: any) =>
	await axios.post(`${apiURL}/auth/signup`, payload, reqOptions());

export const loginUser = async (payload: any) =>
	await axios.post(`${apiURL}/auth/signin`, payload, reqOptions());

export const logoutUser = async (token: string) =>
	await axios.post(`${apiURL}/auth/logout`, {}, reqOptions(token));

export const refreshToken = async () =>
	await axios.post(`${apiURL}/refresh_token`, {}, reqOptions());
