import { Router, Request, Response } from 'express';
import verifyToken from '../auth/verifyToken';
import User, {
    e_profile_role,
    IUserAttachments,
    IUserEducationalInfo,
} from '../models/user.model';
import { e_request_admin } from '../models/pendingVerification.model';
import { createPendingRequest } from '../auth/utils';
import * as dotenv from 'dotenv';
import { ObjectId } from 'mongodb';

const app = Router();
dotenv.config();

/**
 * @route           GET user/me
 * @description     returns basic info of current user
 * @access          Private
 */
app.get('/me', verifyToken, async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({
            primary_email: res.locals.payload.email,
        });
        res.json({ user: user });
    } catch (err) {
        res.send({ error: true, message: err.message });
    }
});

/**
 * @route           GET user/me
 * @description     returns basic info of current user
 * @access          Private
 */
app.get('/myBasic', verifyToken, async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({
            primary_email: res.locals.payload.email,
        });
        const basic: any = {
            name:
                user?.basic_info.first_name + ' ' + user?.basic_info.last_name,
            stream: user?.educational_info[0],
        };
        res.json({ user: user });
    } catch (err) {
        res.send({ error: true, message: err.message });
    }
});

/**
 * @route           PUT user/my_pimage
 * @description     update profile image
 * @access          Private
 */
app.put('/my_pimage', verifyToken, async (req: Request, res: Response) => {
    try {
        let user = await User.findOne({
            primary_email: res.locals.payload.email,
        });
        if (!user) {
            throw new Error('User does not exist');
        } else {
            user.profileImg = {
                name: req.body.name,
                file_type: req.body.file_type,
                data: req.body.data,
                size: req.body.size,
            };
            await user.save();
            res.status(200).send();
        }
    } catch (err) {
        res.send({ error: true, message: err.message });
    }
});

/**
 * @route           POST user/init_me_std
 * @description     initialize batch information of the students and alumnus profile type.
 * @access          Private
 */
app.post('/init_me_std', verifyToken, async (req: Request, res: Response) => {
    try {
        let user = await User.findOne({
            primary_email: res.locals.payload.email,
        });
        if (!user) {
            throw new Error('No User exist with given credentials!');
        } else {
            user.basic_info.profile_role = req.body.profile_role;
            const edInfo: IUserEducationalInfo = {
                id: new ObjectId() as unknown as String,
                editable: false,
                name_of_organization: 'IIT Ropar',
                start_date: req.body.start_date,
                end_date: req.body.end_date,
                degree_name: req.body.course,
                stream_name: req.body.stream,
            };
            user.educational_info.push(edInfo);
            await user.save();
            res.send({
                error: false,
                message: 'Successfully Added details into DB!',
            });
        }
    } catch (err) {
        res.send({ error: true, message: err.message });
    }
});

/**
 * @route           PUT user/update_basic
 * @description     update basic information of user.
 * @access          Private
 */
app.put('/update_basic', verifyToken, async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({
            primary_email: res.locals.payload.email,
        });
        await User.updateOne(
            { primary_email: res.locals.payload.email },
            {
                'basic_info.first_name':
                    req.body.first_name ?? user?.basic_info.first_name,
                'basic_info.salutation':
                    req.body.salutation ?? user?.basic_info.salutation,
                'basic_info.last_name':
                    req.body.last_name ?? user?.basic_info?.last_name,
                'basic_info.gender': req.body.gender ?? user?.basic_info.gender,
                'basic_info.date_of_birth':
                    req.body.date_of_birth ?? user?.basic_info.date_of_birth,
                'location_contact_info.mobile_number': req.body.mobile_number,
                'location_contact_info.current_city':
                    req.body.current_city ??
                    user?.location_contact_info.current_city,
            }
        );
        res.status(201).send();
    } catch (err) {
        res.send({ error: true, message: err.message });
    }
});

/**
 * @route           POST user/update_contacts
 * @description     update contact and location information of the user
 * @access          Private
 */
app.put(
    '/update_contacts',
    verifyToken,
    async (req: Request, res: Response) => {
        try {
            let user = await User.findOne({
                primary_email: res.locals.payload.email,
            });
            if (!user) {
                res.status(403).send({ message: 'User email does not exist' });
            } else {
                // location and contact infor
                user.location_contact_info.current_city = req.body.current_city;
                user.location_contact_info.home_town =
                    req.body.home_town ?? user?.location_contact_info.home_town;
                user.location_contact_info.correspondance_address =
                    req.body.corrs_address ??
                    user.location_contact_info.correspondance_address;
                user.location_contact_info.correspondance_location =
                    req.body.corrs_location ??
                    user.location_contact_info.correspondance_location;
                user.location_contact_info.correspondance_postal_code =
                    req.body.corrs_postal_code ??
                    user.location_contact_info.correspondance_postal_code;
                user.location_contact_info.mobile_number =
                    req.body.mobile_num ??
                    user.location_contact_info.mobile_number;
                user.location_contact_info.home_phone_number =
                    req.body.home_phone_number ??
                    user.location_contact_info.home_phone_number;
                user.location_contact_info.work_phone_number =
                    req.body.work_phone_num ??
                    user.location_contact_info.work_phone_number;

                if (req.body.alternate_email) {
                    user.location_contact_info.alternative_email_id.push(
                        req.body.alternate_email
                    );
                }

                // contact social information
                user.location_contact_info.social_profiles.website =
                    req.body.website ??
                    user.location_contact_info.social_profiles.website;
                user.location_contact_info.social_profiles.facebook =
                    req.body.facebook ??
                    user.location_contact_info.social_profiles.facebook;
                user.location_contact_info.social_profiles.linkedin =
                    req.body.linkedin ??
                    user.location_contact_info.social_profiles.linkedin;
                user.location_contact_info.social_profiles.twitter =
                    req.body.twitter ??
                    user.location_contact_info.social_profiles.twitter;
                user.location_contact_info.social_profiles.youtube =
                    req.body.youtube ??
                    user.location_contact_info.social_profiles.youtube;
                user.location_contact_info.social_profiles.instagram =
                    req.body.instagram ??
                    user.location_contact_info.social_profiles.instagram;

                await user.save();
                res.status(201).send();
            }
        } catch (err) {
            res.send({ error: true, message: err.message });
        }
    }
);

/**
 * @route           GET user/edu_info
 * @description     get all educational information of the user
 * @access          Private
 */
app.get('/edu_info', verifyToken, async (_req: Request, res: Response) => {
    try {
        const user = await User.findOne({
            primary_email: res.locals.payload.email,
        });
        if (!user) {
            res.status(403).send({ message: 'User does not exist' });
        } else {
            res.send({ edu_info: user.educational_info });
        }
    } catch (err) {
        res.send({ error: true, message: err.message });
    }
});

/**
 * @route           PUT user/add_edu
 * @description     add educational information of the user
 * @access          Private
 */
app.put('/edu_info', verifyToken, async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({
            primary_email: res.locals.payload.email,
        });
        if (!user) {
            res.status(403).send({ message: 'User does not exist' });
        } else {
            const newEdu: IUserEducationalInfo = {
                id: new ObjectId() as unknown as String,
                editable: true,
                name_of_organization: req.body.name_of_organization,
                start_date: req.body.start_date,
                end_date: req.body.end_date,
                degree_name: req.body.degree_name,
                stream_name: req.body.stream_name,
            };
            user.educational_info.push(newEdu);
            await user.save();
            res.status(201).send();
        }
    } catch (err) {
        res.send({ error: true, message: err.message });
    }
});

/**
 * @route           PUT user/update_edu
 * @description     update educational information of the user
 * @access          Private
 */
app.put('/update_edu', verifyToken, async (req: Request, res: Response) => {
    try {
        let user = await User.findOne({
            primary_email: res.locals.payload.email,
        });
        if (!user) {
            res.status(403).send({ message: 'User does not exist' });
        } else {
            const idx = user.educational_info.findIndex(
                (element) => element.id === req.body.id
            );
            if (idx !== -1 && user.educational_info[idx].editable) {
                user.educational_info[idx].name_of_organization =
                    req.body.name_of_organization;
                user.educational_info[idx].start_date = req.body.start_date;
                user.educational_info[idx].end_date = req.body.end_date;
                user.educational_info[idx].degree_name = req.body.degree_name;
                user.educational_info[idx].stream_name = req.body.stream_name;
                await user.save();
                res.status(201).send();
            } else {
                res.status(400).send({
                    message: 'Cant update the education entry',
                });
            }
        }
    } catch (err) {
        res.send({ error: true, message: err.message });
    }
});

/**
 * @route           DELETE user/update_edu
 * @description     remove educational information with {id} of the user
 * @access          Private
 */
app.delete(
    '/update_edu/:id',
    verifyToken,
    async (req: Request, res: Response) => {
        try {
            // delete only the editable entries
            await User.updateOne(
                { primary_email: res.locals.payload.email },
                {
                    $pull: {
                        educational_info: { id: req.params.id, editable: true },
                    },
                }
            );
            res.send();
        } catch (err) {
            res.send({ error: true, message: err.message });
        }
    }
);

/**
 * @route           POST user/profess_head
 * @description     get all educational information of the user
 * @access          Private
 */
app.put('/profess_head', verifyToken, async (req: Request, res: Response) => {
    try {
        await User.updateOne(
            { primary_email: res.locals.payload.email },
            { 'professional_info.prof_head': req.body.prof_head }
        );
        res.status(201).send();
    } catch (err) {
        res.send({ error: true, message: err.message });
    }
});

/**
 * @route           GET user/profess_head
 * @description     get the professional headline of the user
 * @access          Private
 */
app.get('/profess_head', verifyToken, async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({
            primary_email: res.locals.payload.email,
        });
        if (!user) {
            res.status(403).send({ message: 'User email does not exist' });
        } else {
            res.send({ prof_head: user?.professional_info.prof_head });
        }
    } catch (err) {
        res.send({ error: true, message: err.message });
    }
});

/**
 * @route           PUT user/overall_exp
 * @description     update the overall experience of the user
 * @access          Private
 */
app.put('/overall_exp', verifyToken, async (req: Request, res: Response) => {
    try {
        let user = await User.findOne({
            primary_email: res.locals.payload.email,
        });
        if (!user) {
            res.status(403).send({ message: 'User email does not exist' });
        } else {
            user.professional_info.total_exp = req.body.total_exp;
            let roles_set = new Set(user.professional_info.roles);
            req.body.roles.forEach((role: String) => roles_set.add(role));
            user.professional_info.roles = [...roles_set];
            let skills_set = new Set(user.professional_info.skills);
            req.body.skills.forEach((skill: String) => skills_set.add(skill));
            user.professional_info.skills = [...skills_set];
            await user.save();
            res.status(201).send();
        }
    } catch (err) {
        res.send({ error: true, message: err.message });
    }
});

/**
 * @route           POST user/work_exp
 * @description     Add work experience of the user
 * @access          Private
 */
app.post('/work_exp', verifyToken, async (req: Request, res: Response) => {
    try {
        let user = await User.findOne({
            primary_email: res.locals.payload.email,
        });
        if (!user) {
            res.status(403).send({ message: 'User email does not exist' });
        } else {
            const work_exp = {
                role: req.body.role,
                company: req.body.company,
                exp: req.body.exp,
                curr: false,
                industry: req.body.industry,
            };
            user.professional_info.orgs?.push(work_exp);
            await user.save();
            res.status(201).send();
        }
    } catch (err) {
        res.send({ error: true, message: err.message });
    }
});

/**
 * @route           GET user/attach
 * @description     get all the attachments of the user
 * @access          Private
 */
app.get('/attach', verifyToken, async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({
            primary_email: res.locals.payload.email,
        });
        if (!user) {
            res.status(403).send({ message: 'User email does not exist' });
        } else {
            res.send({ attachs: user.attachments });
        }
    } catch (err) {
        res.send({ error: true, message: err.message });
    }
});

/**
 * @route           POST user/attach
 * @description     Add attachments of the user
 * @access          Private
 */
app.post('/attach', verifyToken, async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({
            primary_email: res.locals.payload.email,
        });
        if (!user) {
            res.status(403).send({ message: 'User email does not exist' });
        } else {
            const attach: IUserAttachments = {
                id: new ObjectId() as unknown as String,
                title: req.body.title,
                attachment_type: req.body.attach_type,
                attachement: req.body.attachment,
            };
            user.attachments.push(attach);
            await user.save();
            res.status(201).send();
        }
    } catch (err) {
        res.send({ error: true, message: err.message });
    }
});

/**
 * @route           DELETE user/attach
 * @description     Remove an attachment of the user
 * @access          Private
 */
app.delete('/attach/:id', verifyToken, async (req: Request, res: Response) => {
    try {
        // delete only the editable entries
        await User.updateOne(
            { primary_email: res.locals.payload.email },
            { $pull: { attachments: { id: req.params.id } } }
        );
        res.send();
    } catch (err) {
        res.send({ error: true, message: err.message });
    }
});

/**
 * @route           POST user/change_pe
 * @description     change primary email of the user (send a verification req to admin)
 * @access          Private
 */
app.post('/change_pe', verifyToken, async (req: Request, res: Response) => {
    try {
        const existUser = await User.findOne({
            $or: [
                { primary_email: req.body.email },
                { 'location_contact_info.alternate_email': req.body.email },
            ],
        });
        if (!existUser) {
            res.status(400).send({ message: 'Not a unique email Id' });
        } else {
            await createPendingRequest(
                res.locals.payload._id,
                e_request_admin.changePrimaryEmail,
                req.body.email
            );
            res.status(204).send();
        }
    } catch (err) {
        res.send({ error: true, message: err.message });
    }
});

/**
 * @route           POST user/change_pass
 * @description     change primary email of the user (send a verification req to admin)
 * @access          Private
 */
app.put('/change_pass', verifyToken, async (req: Request, res: Response) => {
    try {
        let user = await User.findOne({
            primary_email: res.locals.payload.email,
        });
        if (!user) {
            res.status(403).send({ message: 'User email does not exist' });
        } else {
            user.password = req.body.password;
            await user.save();
            res.status(201).send();
        }
    } catch (err) {
        res.send({ error: true, message: err.message });
    }
});

/**
 * @route           POST user/remove_me
 * @description     Raise a request to admin to remove account
 * @access          Private
 */
app.post('/remove_me', verifyToken, async (req: Request, res: Response) => {
    try {
        const payload = res.locals.payload;
        await createPendingRequest(payload.id, e_request_admin.accountDeletion);
    } catch (err) {
        res.send({ error: true, message: err.message });
    }
});

app.get('/:userid', verifyToken, async (req: Request, res: Response) => {
    try {
        const users = User.find({});
        res.send(users);
    } catch (err) {
        res.send({ error: true, message: err.message });
    }
});

export default app;
