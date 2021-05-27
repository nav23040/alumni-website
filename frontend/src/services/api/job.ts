import axios from 'axios';
import { reqOptions, apiURL } from './common';

export const postJob = async (jobData: any, token: any) => {
	return await axios.post(
		`${apiURL}/jobs/create`,
		jobData,
		reqOptions(token)
	);
};

export const getJob = async (token: any) => {
	return await axios.get(`${apiURL}/jobs/`, reqOptions(token));
};

export const getRecJob = async (token: any) => {
	return await axios.get(`${apiURL}/jobs/recent_jobs`, reqOptions(token));
};

export const searchJob = async (
	token: any,
	keywords: any,
	location: any,
	company: any
) => {
	return await axios.get(
		`${apiURL}/jobs/search?keywords=` +
			keywords +
			`&location=` +
			location +
			`&company=` +
			company,
		reqOptions(token)
	);
};
