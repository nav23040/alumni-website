import axios from 'axios';
import { reqOptions, apiURL } from './common';

export const memberSearch = async (token: any) =>
	await axios.get(`${apiURL}/members`, reqOptions(token));

export const getMembers = async (q: string, token: any) =>
	await axios.get(`${apiURL}/members/all/:${q}`, reqOptions(token));

export const getAllComps = async (token: any) =>
	await axios.get(`${apiURL}/members/all_comps`, reqOptions(token));

export const getAllSkills = async (token: any) =>
	await axios.get(`${apiURL}/members/all_skills`, reqOptions(token));

export const getAllRoles = async (token: any) =>
	await axios.get(`${apiURL}/members/all_roles`, reqOptions(token));

export const exportMembers = async (payload:any, token: any) =>
	await axios.post(`${apiURL}/members/export`, payload, reqOptions(token));