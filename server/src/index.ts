import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import auth from './auth/index';
import refreshToken from './auth/refresh_token';
import user from './routes/user';
import execCommittee from './routes/execCommittee';
import events from './routes/events';
import newsRoom from './routes/newsRoom';
import members from './routes/members';
import connectDB from './db/index';
import job from './routes/job';
import posts from './routes/posts';
import path from 'path';

dotenv.config();
const app = express();
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'build')));

// middleware
app.use(
    cors({
        origin: true,
        credentials: true,
    })
);

app.use(express.json({ limit: '50mb' }));
// Bodyparser middleware
app.use(
    express.urlencoded({
        extended: true,
        limit: '50mb',
    })
);

// connect db
connectDB(process.env.DBURL as string);

// auth routes
app.use('/api/auth', auth);
// refresh_token route
app.use('/api/refresh_token', refreshToken);
// user routes
app.use('/api/user', user);
// exec committee view routes
app.use('/api/execCommittee', execCommittee);
// events view routes
app.use('/api/events', events);
// newsroom view routes
app.use('/api/newsroom', newsRoom);
// jobs view routes
app.use('/api/jobs', job);
// members view routes
app.use('/api/members', members);

app.use('/api/posts', posts);

// 404-page not found
app.get('/api/*', (_req: Request, res: Response) => {
    res.status(404).send("Can't find that for webapp");
});

app.get('*', (_req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, 'build/index.html'));
});

app.listen(process.env.PORT ?? 3000, () => {
    console.log(`server is running at port:${process.env.PORT ?? 3000}`);
});
