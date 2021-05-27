import express, { Request, Response } from 'express';
import User, { IUser } from '../models/user.model';
import bcrypt from 'bcryptjs';
import { genAccessToken, genRefreshToken, sendRefreshToken } from './tokens';
import verifyToken from './verifyToken';
import { validationResult } from 'express-validator';
import {
    signupValidation,
    signinValidation,
    createUser,
    createPendingRequest,
} from './utils';
import cookieParser from 'cookie-parser';

const app = express.Router();
app.use(cookieParser());
app.use(express.json());

export interface jwtpayload {
    _id?: String;
    email: String;
    first_name: String;
    last_name: String;
}

/**
 * @route           POST auth/check_email
 * @description     checks whether the email entered already exist in the DB
 * @access          Public
 */
app.post('/check_email', async (req: Request, res: Response) => {
    try {
        if (req.body.email === undefined) {
            throw new Error('Not valid Email ID!');
        }
        const instance = await User.findOne({
            $or: [
                { primary_email: req.body.email },
                {
                    'location_contact_info.alternative_email_id':
                        req.body.email,
                },
            ],
        });
        if (!instance) {
            res.send({ error: false, message: 'Unique Email' });
        } else {
            throw new Error('Not Unique Email ID!');
        }
    } catch (err) {
        res.send({ error: true, message: err.message });
    }
});

/**
 * @route           POST auth/signup
 * @description     register a user
 * @access          Public
 */
app.post('/signup', signupValidation, async (req: Request, res: Response) => {
    try {
        const validationError = validationResult(req);
        if (!validationError.isEmpty) {
            res.status(400).json({
                code: 400,
                errors: validationError.mapped(),
            });
        }
        if (req.body.email === undefined) {
            throw new Error('Not Unique Email ID!');
        }
        const instance = await User.findOne({
            $or: [
                { primary_email: req.body.email },
                {
                    'location_contact_info.alternative_email_id':
                        req.body.email,
                },
            ],
        });
        if (instance) {
            throw new Error(`User already exists!`);
        }
        const hashedPassword = await bcrypt.hash(
            req.body.password,
            await bcrypt.genSalt(6)
        );
        const user = await createUser(req.body, hashedPassword);
        await createPendingRequest(user._id);
        const payload: jwtpayload = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
        };
        const accessToken = genAccessToken(payload);
        res.send({
            message: `user:${
                req.body.first_name + ' ' + req.body.last_name
            }'s info successfully added into db!!`,
            accessToken: accessToken,
        });
    } catch (err) {
        res.send({ error: true, message: err.message });
    }
});

/**
 * @route           POST auth/signin
 * @description     signin a user
 * @access          Public
 */
app.post('/signin', signinValidation, async (req: Request, res: Response) => {
    try {
        const validationError = validationResult(req);
        if (!validationError.isEmpty) {
            res.status(400).json({
                code: 400,
                errors: validationError.mapped(),
            });
        }
        const instance = await User.findOne({
            primary_email: req.body.email,
        });
        if (!instance) {
            throw new Error(`User doesn't exist`);
        }
        const checkPass = await bcrypt.compare(
            req.body.password,
            instance.password as string
        );
        if (!checkPass) {
            throw new Error('email or password is invalid');
        }
        // if (instance.status !== 'verified') {
        //     throw new Error('user is not verified yet!');
        // }
        const payload: jwtpayload = {
            _id: instance._id,
            first_name: instance.basic_info.first_name,
            last_name: instance.basic_info.last_name,
            email: instance.primary_email,
        };
        // login successful
        // send access and refresh tokens
        sendRefreshToken(res, genRefreshToken(payload));
        res.send({
            first_name: instance.basic_info.first_name,
            last_name: instance.basic_info.last_name,
            email: instance.primary_email,
            token: genAccessToken(payload),
            _id: instance._id,
        });
    } catch (err) {
        res.send({ error: true, message: err.message });
    }
});

/**
 * @route           POST auth/logout
 * @description     Logout request: removes cookie and saved token in Database.
 * @access          Public
 */
app.post('/logout', verifyToken, async (req, res) => {
    res.clearCookie('rid');
    // remove token from database
    // email is sent from the client
    try {
        await User.updateOne(
            { primary_email: res.locals.email },
            { token: undefined }
        );
        res.send({ error: false, message: 'logged out!' });
    } catch (err) {
        res.send({ error: true, message: err.message });
    }
});

export default app;
