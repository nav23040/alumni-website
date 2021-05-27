import mongoose, { Document, Schema } from 'mongoose';

export interface IEvent extends Document {
    event_start: Number;
    event_end: Number;
    event_name: String;
    event_venue: String;
    event_description?: String;
    date_created: Number;
    created_by: String;
    created_by_id?: String;
    pending_req_id?: String;
    event_category: String;
    address: String;
    pending: Boolean;
}

const eventSchema: Schema = new Schema({
    event_start: { type: Number, required: true },
    event_end: { type: Number, required: true },
    event_name: { type: String, required: true },
    event_venue: { type: String, required: true },
    event_description: String,
    date_created: { type: Number, required: true, default: Date.now() },
    created_by: { type: String, required: true },
    created_by_id: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    event_category: { type: String },
    address: { type: String },
    pending: { type: Boolean, default: true },
});

export default mongoose.model<IEvent>('events', eventSchema, 'events');
