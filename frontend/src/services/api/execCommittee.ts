import axios from 'axios';
import { reqOptions, apiURL } from './common';

export const getExecCommittee = async () => {
	return await axios.get(`${apiURL}/execCommittee/members`, {
		withCredentials: true,
	});
};

export const updateExecCommittee = async (payload: any, token: string) => {
	return await axios.post(
		`${apiURL}/execCommittee/members`,
		payload,
		reqOptions(token)
	);
};
