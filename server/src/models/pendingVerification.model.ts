import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IPendingVerification extends Document {
    userId: String;
    dateCreated: Number;
    requestType: String;
    data?: String;
}

export enum e_request_admin {
    accountRegisteration = 'register_account',
    accountDeletion = 'delete_account',
    createEvent = 'create_event',
    createNews = 'create_news',
    changePrimaryEmail = 'change_primary_email',
}

const pendingVericationSchema: Schema = new Schema({
    userId: { type: String, required: true },
    dateCreated: { type: Number, default: Date.now() },
    requestType: {
        type: String,
        enum: Object.values(e_request_admin),
        default: e_request_admin.accountRegisteration,
    },
    data: {
        type: String,
    },
});

export default mongoose.model<IPendingVerification>(
    'PendingVerification',
    pendingVericationSchema
);
