import mongoose, { Schema, Document } from 'mongoose';

const postSchema = new Schema({
    user_name: String,
    post_date: Date,
    content: String,
    avatar: String,
    like_count: { type: Number, default: 0 },
});

export interface Ipost extends Document {
    user_name: String;
    post_date: Date;
    avatar: String;
    content: String;
    like_count: Number;
}

export default mongoose.model<Ipost>('posts', postSchema, 'posts');
