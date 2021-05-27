import express, { Request, Response } from 'express';
import User from '../models/user.model';
import Events, { IEvent } from '../models/events.model';
import verifyToken from '../auth/verifyToken';
import { createPendingRequest } from '../auth/utils';
import pendingVerificationModel, {
    e_request_admin,
} from '../models/pendingVerification.model';

const app = express.Router();

// create a new event
app.post('/create', verifyToken, async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({
            primary_email: res.locals.payload.email,
        });
        if (!user) {
            throw new Error('User does not exist!');
        }
        if (user.isAdmin) {
            const event = new Events({
                event_name: req.body.event_name,
                event_venue: req.body.event_venue,
                event_description: req.body.event_description,
                created_by:
                    `${user.basic_info.first_name} ${user.basic_info.last_name}` as String,
                created_by_id: user._id,
                event_category: req.body.event_category,
                event_start: req.body.event_start,
                event_end: req.body.event_end,
                address: req.body.address,
                pending: false,
            } as unknown as IEvent);
            event.save(async (err, _doc) => {
                if (err) {
                    throw new Error(err.message);
                } else {
                    user.news?.push(event._id);
                    await user.save();
                }
            });
        } else {
            const pending_req = await createPendingRequest(
                user._id,
                e_request_admin.createEvent
            );
            const event = new Events({
                event_start: req.body.event_start,
                event_end: req.body.event_end,
                event_name: req.body.event_name,
                event_venue: req.body.event_venue,
                event_description: req.body.event_description,
                created_by:
                    `${user.basic_info.first_name} ${user.basic_info.last_name}` as String,
                created_by_id: user._id,
                pending_req_id: pending_req._id,
                event_category: req.body.event_category,
                address: req.body.address,
            } as IEvent);
            event.save(async (err, _doc) => {
                if (err) {
                    throw new Error(err.message);
                } else {
                    user.news?.push(event._id);
                    await user.save();
                }
            });
        }
        res.send({ error: false, message: 'successfully added event!' });
    } catch (err) {
        res.send({ error: true, message: err.message });
    }
});

// return all the events created by user
app.get('/myevents', verifyToken, async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({
            primary_email: res.locals.payload.email,
        }).populate('events');
        if (!user) {
            throw new Error('Invalid user');
        } else {
            const copy_events: any = [...(user?.events as IEvent[])];
            copy_events.forEach((event: IEvent) => {
                delete event.created_by_id;
                delete event.pending_req_id;
            });
            res.send({ events: copy_events });
        }
    } catch (err) {
        res.send({ error: true, message: err.message });
    }
});

// get an event details
app.get('/e/:id', verifyToken, async (req: Request, res: Response) => {
    try {
        const event = await Events.findById(req.params.id);
        if (!event) {
            throw new Error(`No event available with id=${req.params.id}`);
        } else {
            const copy_events: any = event;
            delete copy_events.created_by_id;
            delete copy_events.pending_req_id;
            res.send({ event: copy_events });
        }
    } catch (err) {
        res.send({ error: true, message: err.message });
    }
});

// return only 3 confirmed events.
app.get('/conf_recent', async (_req: Request, res: Response) => {
    try {
        const events = await Events.find({ pending: false }, [], {
            limit: 3,
            sort: {
                event_date: 0, // asc on event date
            },
        });
        const copy_events: any = [...events];
        copy_events.forEach((event: any) => {
            delete event.created_by_id;
            delete event.pending_req_id;
        });
        res.send({ events: copy_events });
    } catch (err) {
        res.send({ error: true, message: err.message });
    }
});

// return all the confirmed events.
app.get('/confirmed', async (req: Request, res: Response) => {
    try {
        const query: any = {
            pending: false,
            event_category: {
                $regex:
                    req.query.cat === 'all_events'
                        ? '.*'
                        : (req.query.cat as string)?.replace('_', ' '),
                $options: 'i',
            },
        };
        const events = await Events.find(query);
        const copy_events = [...events];
        copy_events.forEach((event) => {
            delete event.created_by_id;
            delete event.pending_req_id;
        });
        res.send({ events: copy_events });
    } catch (err) {
        res.send({ error: true, message: err.message });
    }
});

// return all the pending events.
app.get('/pending', verifyToken, async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({
            primary_email: res.locals.payload.email,
            isAdmin: true,
        });
        if (!user) {
            throw new Error('Not Accessible by Moderator');
        }
        /* const query: any = {
            pending: true,
            event_category: { $regex: req.query.cat, $options: 'i' },
        };*/
        const events = await Events.find({ pending: true });
        const copy_events = [...events];
        res.send({ events: copy_events });
    } catch (err) {
        res.send({ error: true, message: err.message });
    }
});

// update a particular event.
app.post('/update', verifyToken, async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({
            primary_email: res.locals.payload.email,
        });
        if (!user) {
            throw new Error('User does not exist!');
        }
        const event_p = await Events.findOne({
            pending: true,
            _id: req.body._id,
        });
        if (!event_p) {
            const event_c = await Events.findOne({
                pending: false,
                _id: req.body._id,
            });
            if (!event_c) {
                throw new Error(`No event with id: ${req.body._id}`);
            } else {
                if (user.isAdmin) {
                    await Events.findOneAndUpdate(
                        { pending: false, _id: req.body._id },
                        {
                            event_start:
                                req.body.event_start ?? event_c.event_start,
                            event_end: req.body.event_end ?? event_c.event_end,
                            event_name:
                                req.body.event_name ?? event_c.event_name,
                            event_venue:
                                req.body.event_venue ?? event_c.event_venue,
                            event_description:
                                req.body.event_description ??
                                event_c.event_description,
                            created_by:
                                `${user.basic_info.first_name} ${user.basic_info.last_name}` as String,
                            created_by_id: user._id,
                            event_category:
                                req.body.event_category ??
                                event_c.event_category,
                            pending: false,
                        }
                    );
                    res.send({
                        error: false,
                        message: 'successfully updated event!',
                    });
                } else {
                    const pendingReq = await createPendingRequest(
                        user._id,
                        e_request_admin.createEvent
                    );
                    await Events.findByIdAndDelete(req.body._id);
                    const newEvent = new Events({
                        event_start:
                            req.body.event_start ?? event_c.event_start,
                        event_end: req.body.event_end ?? event_c.event_end,
                        event_name: req.body.event_name ?? event_c.event_name,
                        event_venue:
                            req.body.event_venue ?? event_c.event_venue,
                        event_description:
                            req.body.event_description ??
                            event_c.event_description,
                        created_by:
                            `${user.basic_info.first_name} ${user.basic_info.last_name}` as String,
                        created_by_id: user._id,
                        event_category:
                            req.body.event_category ?? event_c.event_category,
                        pending_req_id: pendingReq._id,
                        pending: true,
                    } as unknown as IEvent);
                    await newEvent.save();
                    res.send({
                        error: false,
                        message: 'successfully updated event!',
                    });
                }
            }
        } else {
            if (user.isAdmin) {
                const newEvent = new Events({
                    pending: false,
                    event_start: req.body.event_start ?? event_p.event_start,
                    event_end: req.body.event_end ?? event_p.event_end,
                    event_name: req.body.event_name ?? event_p.event_name,
                    event_venue: req.body.event_venue ?? event_p.event_venue,
                    event_description:
                        req.body.event_description ?? event_p.event_description,
                    created_by:
                        `${user.basic_info.first_name} ${user.basic_info.last_name}` as String,
                    created_by_id: user._id,
                } as unknown as IEvent);
                await newEvent.save();
                await Events.deleteOne({ pending: true, _id: event_p._id });
                res.send({
                    error: false,
                    message: 'successfully updated event!',
                });
            } else {
                await pendingVerificationModel.deleteOne({
                    _id: event_p.pending_req_id,
                });
                const pendingReq = await createPendingRequest(
                    user._id,
                    e_request_admin.createEvent
                );
                await Events.findOneAndUpdate(
                    { pending: true, _id: req.body._id },
                    {
                        event_start:
                            req.body.event_start ?? event_p.event_start,
                        event_end: req.body.event_end ?? event_p.event_end,
                        event_name: req.body.event_name ?? event_p.event_name,
                        event_venue:
                            req.body.event_venue ?? event_p.event_venue,
                        event_description:
                            req.body.event_description ??
                            event_p.event_description,
                        created_by:
                            `${user.basic_info.first_name} ${user.basic_info.last_name}` as String,
                        created_by_id: user._id,
                        pending_req_id: pendingReq._id,
                    }
                );
                res.send({
                    error: false,
                    message: 'successfully updated event!',
                });
            }
        }
        if (!user) {
            throw new Error('User does not exist!');
        }
    } catch (err) {
        res.send({ error: true, message: err.message });
    }
});

app.post('/confirm_event', verifyToken, async (req, res) => {
    console.log(req.body.id);
    Events.findById(req.body.id, (err: any, event: any) => {
        if (err) {
            res.send('Error in getting event details');
        } else {
            event.pending = false;
            event
                .save()
                .then((_response: any) => res.send('success'))
                .catch((_err: any) => res.send('error'));
        }
    });
});

app.post('/cancel_event', verifyToken, async (req, res) => {
    Events.findByIdAndDelete(req.body.id, [], (err: any, _event: any) => {
        if (err) res.send('Error in getting event details');
        else {
            res.send('success');
        }
    });
});

export default app;
