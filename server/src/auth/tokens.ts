import * as jwt from 'jsonwebtoken';
import { Response } from 'express';
import User from '../models/user.model';
import { jwtpayload } from '../auth/index';


export function genAccessToken(payload: jwtpayload) {
	return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET! as jwt.Secret, {
		expiresIn: '10 day',
	});
}


export function genRefreshToken(payload: jwtpayload) {
	return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET! as jwt.Secret, {
		expiresIn: '30 days',
	});
}


export async function updateRefreshInDB(refreshToken: any, dbInstance: any) {
	await User.updateOne(
		{ email: dbInstance[0].email },
		{ token: refreshToken }
	);
}


export function sendRefreshToken(res: Response, refreshToken: any) {
	res.cookie('rid', refreshToken, {
		httpOnly: true,
		// path: '/refresh_token'
	});
}