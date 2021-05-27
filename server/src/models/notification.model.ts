import mongoose, { Schema, Document, Types } from 'mongoose';

export enum notifyType {
    admin_post = 'admin_post',
    user_post = 'user_post',
    admin_event = 'admin_event',
    admin_news = 'admin_news',
}

export interface INotify extends Document {
    type: String;
    date_created: String;
    read: Boolean;
    
}

const notifySchema = new Schema({});

export default mongoose.model<INotify>('Notify', notifySchema, 'notify');
