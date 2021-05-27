import axios from 'axios';
import { reqOptions, apiURL } from './common';

export const initDetailsStd = async (payload: any, token: string) => {
	return await axios.post(
		`${apiURL}/user/init_me_std`,
		payload,
		reqOptions(token)
	);
};

export const initDetailsFaculty = async (payload: any, token: string) => {
	return await axios.post(
		`${apiURL}/user/init_me_faculty`,
		payload,
		reqOptions(token)
	);
};

export const uploadPImage = async (payload: any, token: any) =>
	await axios.put(`${apiURL}/user/my_pimage`, payload, reqOptions(token));

export const getMyInfo = async (token: any) =>
	await axios.get(`${apiURL}/user/me`, reqOptions(token));

export const updateBasic = async (payload: any, token: any) =>
	await axios.put(`${apiURL}/user/update_basic`, payload, reqOptions(token));

export const updateContacts = async (payload: any, token: any) =>
	await axios.put(
		`${apiURL}/user/update_contacts`,
		payload,
		reqOptions(token)
	);

export const getMyEduInfo = async (token: any) =>
	await axios.get(`${apiURL}/user/edu_info`, reqOptions(token));

export const addEduInfo = async (payload: any, token: any) =>
	await axios.put(`${apiURL}/user/edu_info`, payload, reqOptions(token));

export const updateEduInfo = async (payload: any, token: any) =>
	await axios.put(`${apiURL}/user/update_edu`, payload, reqOptions(token));

export const deleteEduInfo = async (id: any, token: any) =>
	await axios.delete(`${apiURL}/user/update_edu/${id}`, reqOptions(token));

export const getProfessHeadline = async (token: any) =>
	await axios.get(`${apiURL}/user/profess_head`, reqOptions(token));

export const updateProfessHeadline = async (payload: any, token: any) =>
	await axios.put(`${apiURL}/user/profess_head`, payload, reqOptions(token));

export const updateOverallExp = async (payload: any, token: any) =>
	await axios.put(`${apiURL}/user/overall_exp`, payload, reqOptions(token));

export const addWorkExp = async (payload: any, token: any) =>
	await axios.post(`${apiURL}/user/work_exp`, payload, reqOptions(token));

export const getAllAttach = async (token: any) =>
	await axios.get(`${apiURL}/user/attach`, reqOptions(token));

export const postAttach = async (payload: any, token: any) =>
	await axios.post(`${apiURL}/user/attach`, payload, reqOptions(token));

export const deleteAttach = async (id: any, token: any) =>
	await axios.delete(`${apiURL}/user/attach/${id}`, reqOptions(token));

export const changePE = async (payload: any, token: any) =>
	await axios.post(`${apiURL}/user/change_pe`, payload, reqOptions(token));

export const changePass = async (payload: any, token: any) =>
	await axios.post(`${apiURL}/user/change_pass`, payload, reqOptions(token));

export const removeMe = async (payload: any, token: any) =>
	await axios.post(`${apiURL}/user/remove_me`, payload, reqOptions(token));

export const getUser = async (id: any, token: any) =>
	await axios.get(`${apiURL}/user/${id}`, reqOptions(token));

export const profile = async (
	endpoint: string,
	token: string,
	req_type: string,
	payload?: any
) => {
	switch (req_type) {
		case 'post':
			return await axios.post(
				`${apiURL}/user/${endpoint}`,
				payload,
				reqOptions(token)
			);

		case 'put':
			return await axios.put(
				`${apiURL}/user/${endpoint}`,
				payload,
				reqOptions(token)
			);

		case 'get':
			return await axios.get(
				`${apiURL}/user/${endpoint}`,
				reqOptions(token)
			);

		case 'delete':
			return await axios.delete(
				`${apiURL}/user/${endpoint}`,
				reqOptions(token)
			);
	}
};
