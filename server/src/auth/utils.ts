import { check } from 'express-validator';
import { Response } from 'express';
import User from '../models/user.model';
import pendingVerication from '../models/pendingVerification.model';
import passport from 'passport';

export const signupValidation = [
    check('email')
        .exists()
        .withMessage('Email is empty!')
        .isEmail()
        .withMessage('invalid email'),
    check('password')
        .exists()
        .withMessage('Empty Password')
        .isLength({ min: 8 })
        .withMessage('Password length must be more than 8'),
];

export const signinValidation = [
    check('email')
        .exists()
        .withMessage('Email is empty!')
        .isEmail()
        .withMessage('invalid email'),
    check('password')
        .exists()
        .withMessage('Empty Password')
        .isLength({ min: 5 })
        .withMessage('Password length must be more than 8'),
];

export async function createUser(body: any, password: string) {
    const newUser = new User();
    // basic info
    newUser.basic_info.salutation = body.salutation;
    newUser.basic_info.first_name = body.first_name;
    newUser.basic_info.last_name = body.last_name;
    newUser.basic_info.gender = body.gender;
    newUser.basic_info.date_of_birth = body.date_of_birth;
    // contact info
    newUser.location_contact_info.mobile_number = body.mobile_num;
    newUser.location_contact_info.current_city = body.current_city;

    newUser.primary_email = body.email;
    newUser.password = password;
    return await newUser.save();
}

export async function createPendingRequest(
    id: String,
    reqType?: String,
    data?: String
) {
    const newRequest = new pendingVerication();
    newRequest.userId = id;
    if (reqType) {
        newRequest.requestType = reqType;
    }
    if (data) {
        newRequest.data = data;
    }
    return newRequest.save();
}
