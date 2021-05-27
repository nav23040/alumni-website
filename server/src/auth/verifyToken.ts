import * as jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { jwtpayload } from '.';

function verifyToken(req: Request, res: Response, next: any) {
    try {
        const auth = req.headers['authorization'] as String;
        if (!auth.split(' ')[1]) {
            throw new Error('please login first! (Not Authenticated)');
        } else {
            const payload: jwtpayload = jwt.verify(
                auth.split(' ')[1],
                process.env.ACCESS_TOKEN_SECRET as jwt.Secret
            ) as jwtpayload;
            res.locals.payload = payload;
            return next();
        }
    } catch (err) {
        return res.send({ error: true, message: err.message });
    }
}

export default verifyToken;
