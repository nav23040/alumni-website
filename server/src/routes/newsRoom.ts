import express, { Request, Response } from 'express';
import User from '../models/user.model';
import verifyToken from '../auth/verifyToken';
import News, { INews } from '../models/news.model';
import pendingVerificationModel, {
    e_request_admin,
} from '../models/pendingVerification.model';
import { createPendingRequest } from '../auth/utils';

const app = express.Router();

// create a new news/story entry
app.post('/create', verifyToken, async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({
            primary_email: res.locals.payload.email,
        });
        if (!user) {
            throw new Error('User does not exist!');
        }
        if (user.isAdmin) {
            const news = new News({
                title: req.body.title,
                overview: req.body.overview,
                created_by:
                    `${user.basic_info.first_name} ${user.basic_info.last_name}` as String,
                created_by_id: user._id,
                thumbnail: req.body.thumbnail,
                body: req.body.body,
                tags: req.body.tags,
                pending: false,
            } as unknown as INews);
            news.save(async (err, _doc) => {
                if (err) {
                    throw new Error(err.message);
                } else {
                    user.news?.push(news._id);
                    await user.save();
                }
            });
        } else {
            const pending_req = await createPendingRequest(
                user._id,
                e_request_admin.createNews
            );
            const news = new News({
                title: req.body.title,
                overview: req.body.overview,
                created_by:
                    `${user.basic_info.first_name} ${user.basic_info.last_name}` as String,
                created_by_id: user._id,
                thumbnail: req.body.thumbnail,
                body: req.body.body,
                tags: req.body.tags,
                pending: true,
                pending_req_id: pending_req._id,
            } as unknown as INews);
            news.save(async (err, _doc) => {
                if (err) {
                    throw new Error(err.message);
                } else {
                    user.news?.push(news._id);
                    await user.save();
                }
            });
        }
        res.send({ error: false, message: 'successfully added event!' });
    } catch (err) {
        res.send({ error: true, message: err.message });
    }
});

// get news(with given id) details
app.get('/n/:id', verifyToken, async (req: Request, res: Response) => {
    try {
        const news = await News.findById(req.params.id);
        if (!news) {
            throw new Error(`No news available with id=${req.params.id}`);
        } else {
            const copy_news: any = news;
            res.send({ news: copy_news });
        }
    } catch (err) {
        res.send({ error: true, message: err.message });
    }
});

// remove news(with given id) details
app.delete('/remove/:id', verifyToken, async (req: Request, res: Response) => {
    try {
        await News.findByIdAndDelete(
            req.params.id,
            [],
            (err: any, _doc: any) => {
                if (err) {
                    throw new Error('Error in getting event details');
                } else {
                    res.send('success');
                }
            }
        );
    } catch (err) {
        res.send({ error: true, message: err.message });
    }
});

app.get('/conf_recent', async (_req: Request, res: Response) => {
    try {
        const news = await News.find({ pending: false }, [], {
            limit: 3,
            sort: {
                date_created: -1, // asc on event date
            },
        });
        res.send({ news: news });
    } catch (err) {
        res.send({ error: true, message: err.message });
    }
});

// return all the confirmed news items.
app.get('/confirmed', async (_req: Request, res: Response) => {
    try {
        const news = await News.find({ pending: false });
        res.send({ news: news });
    } catch (err) {
        res.send({ error: true, message: err.message });
    }
});

// return all the pending news.
app.get('/pending', verifyToken, async (_req: Request, res: Response) => {
    try {
        const user = await User.findOne({
            primary_email: res.locals.payload.email,
            isAdmin: true,
        });
        if (!user) {
            throw new Error('Not Accessible by Moderator');
        }
        const news = await News.find({ pending: true });
        res.send({ news: news });
    } catch (err) {
        res.send({ error: true, message: err.message });
    }
});

// update a particular news.
app.post('/update', verifyToken, async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({
            primary_email: res.locals.payload.email,
        });
        if (!user) {
            throw new Error('User does not exist!');
        }
        const news_p = await News.findOne({
            pending: true,
            _id: req.body._id,
        });
        if (!news_p) {
            const news_c = await News.findOne({
                pending: false,
                _id: req.body._id,
            });
            if (!news_c) {
                throw new Error(`No news with id: ${req.body._id}`);
            } else {
                if (user.isAdmin) {
                    await News.findOneAndUpdate(
                        { pending: false, _id: req.body._id },
                        {
                            title: req.body.title ?? news_c.title,
                            overview: req.body.overview ?? news_c.overview,
                            created_by:
                                `${user.basic_info.first_name} ${user.basic_info.last_name}` as String,
                            created_by_id: user._id,
                            thumbnail: req.body.thumbnail ?? news_c.thumbnail,
                            body: req.body.body ?? news_c.body,
                            tags: req.body.tags ?? news_c.tags,
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
                    await News.findByIdAndDelete(req.body._id);
                    const news = new News({
                        _id: req.body._id,
                        title: req.body.title,
                        overview: req.body.overview,
                        created_by:
                            `${user.basic_info.first_name} ${user.basic_info.last_name}` as String,
                        created_by_id: user._id,
                        thumbnail: req.body.thumbnail,
                        body: req.body.body,
                        tags: req.body.tags,
                        pending_req_id: pendingReq?._id,
                        pending: true,
                    } as unknown as INews);
                    await news.save();
                    res.send({
                        error: false,
                        message: 'successfully updated event!',
                    });
                }
            }
        } else {
            if (user.isAdmin) {
                const news = new News({
                    title: req.body.title ?? news_p.title,
                    overview: req.body.overview ?? news_p.overview,
                    created_by:
                        `${user.basic_info.first_name} ${user.basic_info.last_name}` as String,
                    created_by_id: user._id,
                    thumbnail: req.body.thumbnail ?? news_p.thumbnail,
                    body: req.body.body ?? news_p.body,
                    tags: req.body.tags ?? news_p.tags,
                    pending: false,
                } as unknown as INews);
                await news.save();
                await News.deleteOne({ pending: true, _id: news_p._id });
                res.send({
                    error: false,
                    message: 'successfully updated event!',
                });
            } else {
                await pendingVerificationModel.deleteOne({
                    _id: news_p.pending_req_id,
                });
                const pendingReq = await createPendingRequest(
                    user._id,
                    e_request_admin.createEvent
                );
                await News.findOneAndUpdate(
                    { pending: true, _id: req.body._id },
                    {
                        title: req.body.title ? news_p.title : req.body.title,
                        overview: req.body.overview
                            ? news_p.overview
                            : req.body.overview,
                        created_by:
                            `${user.basic_info.first_name} ${user.basic_info.last_name}` as String,
                        thumbnail: req.body.thumbnail
                            ? news_p.thumbnail
                            : req.body.thumbnail,
                        body: req.body.body ? news_p.body : req.body.body,
                        tags: req.body.tags ? news_p.tags : req.body.tags,
                        pending: true,
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
    } catch (err) {
        res.send({ error: true, message: err.message });
    }
});

app.post('/confirm_news', verifyToken, async (req, res) => {
    console.log(req.body.id);
    News.findById(req.body.id, (err: any, news: any) => {
        if (err) res.send('Error in getting event details');
        else {
            news.pending = false;
            news.save()
                .then((_response: any) => res.send('success'))
                .catch((_err: any) => res.send('error'));
        }
    });
});

export default app;
