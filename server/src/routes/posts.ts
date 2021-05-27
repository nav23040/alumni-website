import { Router, Request, Response } from 'express';
import { jwtpayload } from '../auth';
import verifyToken from '../auth/verifyToken';
import User, { IUser } from '../models/user.model';

import Post, { Ipost } from '../models/post.model';

const app = Router();

app.post('/create_post', verifyToken, async (req, res) => {
    const newPost = new Post({
        user_name:
            res.locals.payload.first_name + ' ' + res.locals.payload.last_name,
        post_date: Date.now(),
        content: req.body.content,
        avatar:
            'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    });
    await newPost
        .save()
        .then((data) => res.send('success'))
        .catch((err) => res.send('error'));
});

app.get('/all_posts', verifyToken, async (req, res) => {
    Post.find({}, [], { sort: { post_date: 'descending' } }, (err, posts) => {
        res.json(posts);
    });
});

app.post('/add_likes', verifyToken, async (req, res) => {
    console.log(req.body._id);
    Post.findById(req.body._id, function (err: any, post: any) {
        if (err) res.json('post not found');
        else {
            post.like_count++;
            post.save()
                .then(res.json('success'))
                .catch((error: any) => res.json('failed'));
        }
    });
});

export default app;
