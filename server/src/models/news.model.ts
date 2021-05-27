import mongoose, { Document, Schema } from 'mongoose';

export interface INews extends Document {
    date_created?: Number;
    created_by: String;
    created_by_id?: String;
    pending: Boolean;
    pending_req_id?: String;
    title: String;
    overview: String;
    thumbnail: String;
    body: String;
    tags: String;
}

const newsSchema: Schema = new Schema({
    date_created: { type: Number, required: true, default: Date.now() },
    created_by: { type: String, required: true },
    created_by_id: { type: String, required: true },
    pending: { type: Boolean, default: true, required: true },
    title: { type: String, required: true },
    overview: { type: String, required: true },
    thumbnail: { type: String },
    body: { type: String, required: true },
    tags: String,
});

export default mongoose.model<INews>('newsroom', newsSchema, 'newsroom');
