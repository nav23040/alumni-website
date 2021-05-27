import axios from 'axios';
import { reqOptions, apiURL } from './common';

export const getPendingEvents = async (token: any) =>
	await axios.get(`${apiURL}/events/pending`, reqOptions(token));

export const getConfRecentEvents = async () =>
	await axios.get(`${apiURL}/events/conf_recent`, reqOptions(null));

export const getAllConfEvents = async (token: any, cat?: any) =>
	await axios.get(`${apiURL}/events/confirmed?cat=${cat}`, reqOptions(token));

export const updateEvent = async (payload: any, token: any) =>
	await axios.post(`${apiURL}/events/update`, payload, reqOptions(token));

export const createNewEvent = async (payload: any, token: any) =>
	await axios.post(`${apiURL}/events/create`, payload, reqOptions(token));

export const getAnEvent = async (id: any, token: any) =>
	await axios.get(`${apiURL}/events/e/${id}`, reqOptions(token));

export const getMyEvents = async (token: any) =>
	await axios.get(`${apiURL}/events/myevents`, reqOptions(token));

// admin apis

export const cancelEvent = async (token: any, eventid: any) =>
	await axios.post(
		`${apiURL}/events/cancel_event`,
		{ id: eventid },
		reqOptions(token)
	);

export const confirmEvent = async (token: any, eventid: any) =>
	await axios.post(
		`${apiURL}/events/confirm_event`,
		{ id: eventid },
		reqOptions(token)
	);
