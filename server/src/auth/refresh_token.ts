import express, { Request, Response } from 'express';
import User, { IUser } from '../models/user.model';
import * as jwt from 'jsonwebtoken';
import { jwtpayload } from './index';
import { genRefreshToken, genAccessToken, sendRefreshToken } from './tokens';

const app = express.Router();
app.use(express.json());

/**
 * @route           POST /refresh_token
 * @description     Refresh token to check for cookie and update the token in cookie as well as in database.
 * @access          Public
 */
app.post('/', async (req, res) => {
    try {
        const token = req.cookies.rid;
        if (!token) {
            throw new Error('Please login first!');
        } else {
            const payload: jwtpayload = jwt.verify(
                token,
                process.env.REFRESH_TOKEN_SECRET as jwt.Secret
            ) as jwtpayload;
            const user = await User.findOne({
                primary_email: payload.email,
            });
            if (!user) {
                throw new Error('Please login first! (user not in db)');
            } else {
                const pload: jwtpayload = {
                    _id: payload._id,
                    email: payload.email,
                    first_name: payload.first_name,
                    last_name: payload.last_name,
                } as jwtpayload;

                sendRefreshToken(res, genRefreshToken(pload));
                res.send({
                    email: payload.email,
                    first_name: payload.first_name,
                    last_name: payload.last_name,
                    token: genAccessToken(pload),
                    _id: user._id,
                });
            }
        }
    } catch (err) {
        res.send({ error: true, message: err.message });
    }
});

export default app;
