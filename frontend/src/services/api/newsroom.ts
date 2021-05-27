import axios from 'axios';
import { reqOptions, apiURL } from './common';

export const getRandomImage = async () =>
	await axios.get(`http://source.unsplash.com/1600x900/?beach`, reqOptions());

export const getConfPosts = async (token: any) =>
	await axios.get(`${apiURL}/newsroom/confirmed`, reqOptions(token));

export const getRecentPosts = async () =>
	await axios.get(`${apiURL}/newsroom/conf_recent`, reqOptions(null));

export const getPendPosts = async (token: any) =>
	await axios.get(`${apiURL}/newsroom/pending`, reqOptions(token));

export const getAPost = async (id: string, token: any) =>
	await axios.get(`${apiURL}/newsroom/n/${id}`, reqOptions(token));

export const submitAPost = async (payload: any, token: any) =>
	await axios.post(`${apiURL}/newsroom/create`, payload, reqOptions(token));

export const updateAPost = async (payload: any, token: any) =>
	await axios.post(`${apiURL}/newsroom/update`, payload, reqOptions(token));

//Admin 

export const cancelNews = async (id: any, token: any) =>
	await axios.delete(`${apiURL}/newsroom/remove/${id}`, reqOptions(token));



export const confirmNews = async (newsid: any, token: any) =>
	await axios.post(`${apiURL}/newsroom/confirm_news`,{id:newsid} ,reqOptions(token));
