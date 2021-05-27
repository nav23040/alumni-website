import { Router, Request, Response } from 'express';
import verifyToken from 'src/auth/verifyToken';
import Job, { IJob } from '../models/job.model';

const app = Router();

app.get('/', async (_req: Request, res: Response) => {
    try {
        const allJobs = await Job.find(
            { application_deadline: { $gte: new Date(Date.now()) } },
            [],
            {
                sort: {
                    application_deadline: 1, // asc on event date
                },
            }
        );
        if (!allJobs) {
            throw new Error('No jobs.');
        }
        const copyJobs = [...allJobs];
        res.send({ jobs: copyJobs });
    } catch (err) {
        res.send({ error: true, message: err.message });
    }
});

app.post('/create', async (req, res) => {
    try {
        await createjob(req.body);
        res.send({
            error: false,
            message: 'Successfully created job.',
        });
    } catch (err) {
        res.send({ error: true, message: err.message });
    }
});

async function createjob(jobInfo: any) {
    const jobentry: IJob = new Job({
        title: jobInfo.title,
        company_name: jobInfo.company_name,
        job_type: jobInfo.job_type,
        experience_level: jobInfo.experience_level,
        job_location: jobInfo.location,
        contact_email: jobInfo.contact_email,
        skills: jobInfo.skills,
        job_desc: jobInfo.job_desc,
        application_deadline: jobInfo.application_deadline,
    } as IJob);
    return await jobentry.save();
}

app.get('/all_jobs', async (req, res) => {
    await Job.find((err, jobs) => {
        if (err) return res.send('Error');
        else {
            return res.send(jobs);
        }
    });
});

app.get('/recent_jobs', async (req, res) => {
    try {
        const jobs = await Job.find(
            { application_deadline: { $gte: new Date(Date.now()) } },
            [],
            {
                limit: 6,
                sort: {
                    date_created: 0, // asc on event date
                },
            }
        );
        const copy_jobs: any = [...jobs];
        res.send({ jobs: copy_jobs });
    } catch (err) {
        res.send({ error: true, message: err.message });
    }
});

app.get('/search', async (req: Request, res: Response) => {
    try {
        const job_keywords = req.query.keywords as string;
        if (req.query.keywords || req.query.location || req.query.company) {
            if (
                req.query.keywords !== '' &&
                req.query.location !== '' &&
                req.query.company !== ''
            ) {
                const q: any = {
                    application_deadline: { $gte: new Date(Date.now()) },
                    title: {
                        $regex: req.query.keywords as string,
                        $options: 'i',
                    },
                    job_location: req.query.location as string,
                    company_name: req.query.company as string,
                };
                await Job.find(q, (err: any, job: any) => {
                    res.send({ job });
                });
            } else if (
                req.query.keywords === '' &&
                req.query.location !== '' &&
                req.query.company !== ''
            ) {
                await Job.find(
                    {
                        application_deadline: { $gte: new Date(Date.now()) },
                        job_location: req.query.location as string,
                        company_name: req.query.company as string,
                    },
                    (err: any, job: any) => {
                        res.send({ job });
                    }
                );
            } else if (
                req.query.keywords !== '' &&
                req.query.location === '' &&
                req.query.company !== ''
            ) {
                await Job.find(
                    {
                        application_deadline: { $gte: new Date(Date.now()) },
                        title: req.query.keywords as string,
                        company_name: req.query.company as string,
                    },
                    (err: any, job: any) => {
                        res.send({ job });
                    }
                );
            } else if (
                req.query.keywords !== '' &&
                req.query.location !== '' &&
                req.query.company === ''
            ) {
                await Job.find(
                    {
                        application_deadline: { $gte: new Date(Date.now()) },
                        title: req.query.keywords as string,
                        job_location: req.query.location as string,
                    },
                    (err: any, job: any) => {
                        res.send({ job });
                    }
                );
            } else if (
                req.query.keywords === '' &&
                req.query.location === '' &&
                req.query.company !== ''
            ) {
                console.log('Entered');

                await Job.find(
                    {
                        application_deadline: { $gte: new Date(Date.now()) },
                        company_name: req.query.company as string,
                    },
                    (err: any, job: any) => {
                        res.send({ job });
                    }
                );
            } else if (
                req.query.keywords === '' &&
                req.query.location !== '' &&
                req.query.company === ''
            ) {
                await Job.find(
                    {
                        application_deadline: { $gte: new Date(Date.now()) },
                        job_location: req.query.location as string,
                    },
                    (err: any, job: any) => {
                        res.send({ job });
                    }
                );
            } else if (
                req.query.keywords !== '' &&
                req.query.location === '' &&
                req.query.company === ''
            ) {
                await Job.find(
                    {
                        application_deadline: { $gte: new Date(Date.now()) },
                        title: req.query.keywords as string,
                    },
                    (err: any, job: any) => {
                        res.send({ job });
                    }
                );
            }
        }
    } catch {
        console.log('Error');
    }
});

app.post('/get_job_details', async (req, res) => {
    const job = await Job.findById(req.body.jobid);
    res.send(job);
});

export default app;
