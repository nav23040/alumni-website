import express, { Request, Response } from 'express';
import verifyToken from '../auth/verifyToken';
import User, { IUser } from '../models/user.model';
import { IExportMember } from '../models/member.export';
import { writeToString } from '@fast-csv/format';
import moment from 'moment';

const app = express.Router();

app.get('/all/:page', verifyToken, async (req: Request, res: Response) => {
    try {
        const resultsPerPage = 20;
        const page: number = (
            (req.params.page as unknown as number) >= 0 ? req.params.page : 0
        ) as number;
        const users = await User.find({}, [], {
            limit: resultsPerPage,
            skip: resultsPerPage * page,
        });

        res.send({ users: filterUserData(users) });
    } catch (err) {
        res.send({ error: true, message: err.message });
    }
});

// location wise
app.get('/all_loc', verifyToken, async (_req: Request, res: Response) => {
    try {
        const locs = await User.distinct('location_contact_info.current_city');
        res.send({ locs });
    } catch (err) {
        res.send({ error: true, message: err.messagee });
    }
});

app.get('/search_by_loc', verifyToken, async (req: Request, res: Response) => {
    try {
        const users: Array<IUser> = await User.find({
            'location_contact_info.current_city': req.body.current_city,
        });
        res.send({ users: filterUserData(users) });
    } catch (err) {
        res.send({ error: true, message: err.message });
    }
});

// institute wise
app.get('/all_inst', verifyToken, async (_req: Request, res: Response) => {
    try {
        const institutes = await User.distinct(
            'educational_info.name_of_organization'
        );
        res.send({ institutes });
    } catch (err) {
        res.send({ error: true, message: err.messagee });
    }
});

app.get('/search_by_inst', verifyToken, async (req: Request, res: Response) => {
    try {
        const users: Array<IUser> = await User.find({
            'professional_info.company': req.body.company,
        });
        res.send({ users: filterUserData(users) });
    } catch (err) {
        res.send({ error: true, message: err.message });
    }
});

// company wise
app.get('/all_comps', verifyToken, async (_req: Request, res: Response) => {
    try {
        const comps = await User.distinct('professional_info.orgs.company');
        res.send({ comps });
    } catch (err) {
        res.send({ error: true, message: err.messagee });
    }
});

app.get('/search_by_comp', verifyToken, async (req: Request, res: Response) => {
    try {
        const users: Array<IUser> = await User.find({
            'professional_info.orgs.company': req.body.company,
        });
        res.send({ users: filterUserData(users) });
    } catch (err) {
        res.send({ error: true, message: err.message });
    }
});

// industry wise
app.get('/all_inds', verifyToken, async (_req: Request, res: Response) => {
    try {
        const inds = await User.distinct('professional_info.orgs.industry');
        res.send({ inds });
    } catch (err) {
        res.send({ error: true, message: err.messagee });
    }
});

app.get('/search_by_inds', verifyToken, async (req: Request, res: Response) => {
    try {
        const users: Array<IUser> = await User.find({
            'professional_info.orgs.industry': req.body.industry,
        });
        res.send({ users: filterUserData(users) });
    } catch (err) {
        res.send({ error: true, message: err.message });
    }
});

app.get('/all_skills', verifyToken, async (_req: Request, res: Response) => {
    try {
        const skills = await User.distinct('professional_info.skills');
        res.send({ skills });
    } catch (err) {
        res.send({ error: true, message: err.messagee });
    }
});

app.get('/all_roles', verifyToken, async (_req: Request, res: Response) => {
    try {
        const roles = await User.distinct('professional_info.roles');
        res.send({ roles });
    } catch (err) {
        res.send({ error: true, message: err.messagee });
    }
});

// generale filter in searching at homepage of members
app.get('/search', verifyToken, async (req: Request, res: Response) => {
    try {
        if (req.query.name || req.query.email) {
            if (req.query.name !== '' && req.query.email !== '') {
                const q_name = (req.query.name as string).trim();
                const user = await User.find({
                    $or: [
                        {
                            'basic_info.first_name': {
                                $regex: q_name.split(' ')[0],
                                $options: 'i',
                            },
                        },
                        {
                            'basic_info.second_name': {
                                $regex:
                                    q_name.split(' ').length > 1
                                        ? q_name.split(' ')[1]
                                        : q_name,
                                $options: 'i',
                            },
                        },
                    ],
                    primary_email: req.query.email as string,
                });
                res.send({ user });
            } else if (req.query.name === '' && req.query.email !== '') {
                const user = await User.find({
                    primary_email: req.query.email as string,
                });
                res.send({ user });
            } else if (req.query.name !== '' && req.query.email === '') {
                const q_name = (req.query.name as string).trim();
                const user = await User.find({
                    $or: [
                        {
                            'basic_info.first_name': {
                                $regex: q_name.split(' ')[0],
                                $options: 'i',
                            },
                        },
                        {
                            'basic_info.second_name': {
                                $regex:
                                    q_name.split(' ').length > 1
                                        ? q_name.split(' ')[1]
                                        : q_name,
                                $options: 'i',
                            },
                        },
                    ],
                });
                res.send({ user });
            }
        }
        // course and year
        else if (req.query.course || req.query.year || req.query.stream) {
            if (
                req.query.course !== '' &&
                req.query.year !== '' &&
                req.query.stream !== ''
            ) {
                const user = await User.find({
                    'educational_info.name_of_organization': 'IIT Ropar',
                    'educational_info.degree_name': {
                        $regex: req.query.course,
                        $options: 'i',
                    },
                    'educational_info.end_date': {
                        $regex: req.query.year,
                        $options: 'i',
                    },
                    'educational_info.stream_name': {
                        $regex: req.query.stream,
                        $options: 'i',
                    },
                });
                res.send({ user });
            } else if (
                req.query.course === '' &&
                req.query.year !== '' &&
                req.query.stream !== ''
            ) {
                const user = await User.find({
                    'educational_info.name_of_organization': 'IIT Ropar',
                    'educational_info.end_date': {
                        $regex: req.query.year,
                        $options: 'i',
                    },
                    'educational_info.stream_name': {
                        $regex: req.query.stream,
                        $options: 'i',
                    },
                });
                res.send({ user });
            } else if (
                req.query.course !== '' &&
                req.query.year === '' &&
                req.query.stream !== ''
            ) {
                const user = await User.find({
                    'educational_info.name_of_organization': 'IIT Ropar',
                    'educational_info.degree_name': {
                        $regex: req.query.course,
                        $options: 'i',
                    },

                    'educational_info.stream_name': {
                        $regex: req.query.stream,
                        $options: 'i',
                    },
                });
                res.send({ user });
            } else if (
                req.query.course !== '' &&
                req.query.year !== '' &&
                req.query.stream === ''
            ) {
                const user = await User.find({
                    'educational_info.name_of_organization': 'IIT Ropar',
                    'educational_info.degree_name': {
                        $regex: req.query.course,
                        $options: 'i',
                    },

                    'educational_info.end_date': {
                        $regex: req.query.year,
                        $options: 'i',
                    },
                });
                res.send({ user });
            } else if (
                req.query.course === '' &&
                req.query.year === '' &&
                req.query.stream !== ''
            ) {
                const user = await User.find({
                    'educational_info.name_of_organization': 'IIT Ropar',
                    'educational_info.stream_name': {
                        $regex: req.query.stream,
                        $options: 'i',
                    },
                });
                res.send({ user });
            } else if (
                req.query.course === '' &&
                req.query.year !== '' &&
                req.query.stream === ''
            ) {
                const user = await User.find({
                    'educational_info.name_of_organization': 'IIT Ropar',
                    'educational_info.end_date': {
                        $regex: req.query.year,
                        $options: 'i',
                    },
                });
                res.send({ user });
            } else if (
                req.query.course !== '' &&
                req.query.year === '' &&
                req.query.stream === ''
            ) {
                const user = await User.find({
                    'educational_info.name_of_organization': 'IIT Ropar',
                    'educational_info.degree_name': {
                        $regex: req.query.course,
                        $options: 'i',
                    },
                });
                res.send({ user });
            }
        }
        // roles
        else if (req.query.roles || req.query.industries || req.query.skills) {
            if (
                req.query.roles !== '' &&
                req.query.industries !== '' &&
                req.query.skills !== ''
            ) {
                const user = await User.find({
                    'educational_info.name_of_organization': 'IIT Ropar',
                    'professional_info.skills': {
                        $regex: req.query.skills,
                        $options: 'i',
                    },
                    'professional_info.roles': {
                        $regex: req.query.roles,
                        $options: 'i',
                    },
                    'professional_info.industries': {
                        $regex: req.query.industries,
                        $options: 'i',
                    },
                });
                res.send({ user });
            } else if (
                req.query.roles === '' &&
                req.query.industries !== '' &&
                req.query.skills !== ''
            ) {
                const user = await User.find({
                    'educational_info.name_of_organization': 'IIT Ropar',
                    'professional_info.industries': {
                        $regex: req.query.industries,
                        $options: 'i',
                    },
                    'professional_info.skills': {
                        $regex: req.query.skills,
                        $options: 'i',
                    },
                });
                res.send({ user });
            } else if (
                req.query.roles !== '' &&
                req.query.industries === '' &&
                req.query.skills !== ''
            ) {
                const user = await User.find({
                    'educational_info.name_of_organization': 'IIT Ropar',
                    'professional_info.roles': {
                        $regex: req.query.roles,
                        $options: 'i',
                    },

                    'professional_info.skills': {
                        $regex: req.query.skills,
                        $options: 'i',
                    },
                });
                res.send({ user });
            } else if (
                req.query.roles !== '' &&
                req.query.industries !== '' &&
                req.query.skills === ''
            ) {
                const user = await User.find({
                    'educational_info.name_of_organization': 'IIT Ropar',
                    'professional_info.roles': {
                        $regex: req.query.roles,
                        $options: 'i',
                    },

                    'professional_info.industries': {
                        $regex: req.query.industries,
                        $options: 'i',
                    },
                });
                res.send({ user });
            } else if (
                req.query.roles !== '' &&
                req.query.industries === '' &&
                req.query.skills === ''
            ) {
                const user = await User.find({
                    'educational_info.name_of_organization': 'IIT Ropar',
                    'professional_info.roles': {
                        $regex: req.query.roles,
                        $options: 'i',
                    },
                });
                res.send({ user });
            } else if (
                req.query.roles === '' &&
                req.query.industries !== '' &&
                req.query.skills === ''
            ) {
                const user = await User.find({
                    'educational_info.name_of_organization': 'IIT Ropar',
                    'professional_info.industries': {
                        $regex: req.query.industries,
                        $options: 'i',
                    },
                });
                res.send({ user });
            } else if (
                req.query.roles === '' &&
                req.query.industries === '' &&
                req.query.skills !== ''
            ) {
                const user = await User.find({
                    'educational_info.name_of_organization': 'IIT Ropar',
                    'professional_info.skills': {
                        $regex: req.query.skills,
                        $options: 'i',
                    },
                });
                res.send({ user });
            } else if (
                req.query.roles === '' &&
                req.query.industries !== '' &&
                req.query.skills === ''
            ) {
                const user = await User.find({
                    'educational_info.name_of_organization': 'IIT Ropar',
                    'professional_info.industries': {
                        $regex: req.query.industries as string,
                        $options: 'i',
                    },
                });
                res.send({ user });
            }
        }
        // location
        else if (req.query.city || req.query.state || req.query.country) {
            const user = await User.find({
                'location_contact_info.current_city': {
                    $regex: req.query.city,
                    $options: 'i',
                },
            });
            res.send({ user });
        }
        // company
        else if (req.query.company) {
            const user = await User.find({
                'professional_info.orgs.company': {
                    $regex: req.query.company,
                    $options: 'i',
                },
            });
            res.send({ user });
        } else if (req.query.role) {
            const user = await User.find({
                'professional_info.roles': {
                    $regex: req.query.role,
                    $options: 'i',
                },
            });
            res.send({ user });
        } else if (req.query.skill) {
            const user = await User.find({
                'professional_info.skills': {
                    $regex: req.query.skill,
                    $options: 'i',
                },
            });
            res.send({ user });
        } else if (req.query.institute) {
            const user = await User.find({
                'educational_info.name_of_organization': {
                    $regex: req.query.institute,
                    $options: 'i',
                },
            });
            res.send({ user });
        }
        // work experience
        else if (req.query.work_ex) {
            const user = await User.find({
                'professional_info.total_exp': { $gte: req.query.work_ex },
            });
            res.send({ user });
        }
    } catch (err) {
        res.send({ error: true, message: err.message });
    }
});

app.post('/export', verifyToken, async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({
            _id: res.locals.payload._id,
            isAdmin: true,
        });
        if (!user) {
            res.send({ error: true, message: 'Not Allowed' });
        } else {
            const q = req.body.ids;
            let users: IExportMember[] = [];
            for (let i = 0; i < q?.length; i++) {
                await User.findById(q[i], (err: any, doc: IUser) => {
                    if (err) {
                        return;
                    } else {
                        users.push(c(doc));
                    }
                });
            }
            let result = '';
            await writeToString(users, { headers: true, delimiter: '\t' }).then(
                (data) => (result += data + '\n')
            );
            res.status(200).attachment(`members.csv`).send(result);
        }
    } catch (err) {
        res.send({ error: true, message: err.message });
    }
});

export default app;

const filterUserData = (users: IUser[]) => users;

const c = (user: IUser) => {
    const formatUser: IExportMember = {
        Salutation: user?.basic_info.salutation,
        Name: user?.basic_info.first_name + ' ' + user?.basic_info.last_name,
        Gender: user?.basic_info.gender,
        'Date of Birth': moment
            .unix((user?.basic_info.date_of_birth as number) / 1000)
            .format('DD-MM-YYYY'),
        'Profile Type': user?.basic_info.profile_role,
        Course: user?.educational_info[0].degree_name,
        Stream: user?.educational_info[0].stream_name,
        'Course Start Year':
            user &&
            moment
                .unix((user.educational_info[0].start_date as number) / 1000)
                .format('YYYY'),
        'Course End Year':
            user &&
            moment
                .unix((user.educational_info[0].end_date as number) / 1000)
                .format('YYYY'),
        'Primary Email': user?.primary_email,
        'Secondary Email': user?.location_contact_info.alternative_email_id[0],
        'Mobile Phone No.': user?.location_contact_info.mobile_number,
        'Home Phone No.': user?.location_contact_info.home_phone_number,
        'Office Phone No.': user?.location_contact_info.work_phone_number,
        'Current Location': user?.location_contact_info.current_city,
        'Home Town': user?.location_contact_info.home_town,
        'Correspondence Address':
            user?.location_contact_info.correspondance_address,
        'Correspondence Locality':
            user?.location_contact_info.correspondance_location,
        'Correspondence Pincode': user?.location_contact_info
            .correspondance_postal_code as unknown as String,
        Company: user?.professional_info.orgs
            ?.map((e: any) => e.company ?? '--')
            .join(' | '),
        Position: user?.professional_info.orgs
            ?.map((e: any) => e.role ?? '--')
            .join(' | '),
        'Work Experience(in years)': user?.professional_info
            .total_exp as unknown as String,
        'Educational Course': user?.educational_info
            ?.map((e: any) => e.degree_name)
            .join(' | '),
        'Educational Institute': user?.educational_info
            ?.map((e: any) => e.name_of_organization)
            .join(' | '),
        'Start Year': user?.educational_info
            ?.map((e: any) =>
                moment.unix((e.start_date as number) / 1000).format('YYYY')
            )
            .join(' | '),
        'End Year': user?.educational_info
            ?.map((e: any) =>
                moment.unix((e.end_date as number) / 1000).format('YYYY')
            )
            .join(' | '),
        'Facebook Link': user?.location_contact_info.social_profiles.facebook,
        'LinkedIn Link': user?.location_contact_info.social_profiles.linkedin,
        'Twitter Link': user?.location_contact_info.social_profiles.twitter,
        'Website Link': user?.location_contact_info.social_profiles.website,
    };
    return formatUser;
};
