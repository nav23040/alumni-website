import mongoose, { Schema, Document } from 'mongoose';

const job: Schema = new Schema({
    title: { type: String, required: true },
    job_type: { type: String, required: true },
    company_name: { type: String, required: true },
    experience_level: { type: Number },
    job_location: { type: String, required: true },
    contact_email: { type: String, required: true },
    skills: { type: String, required: true },
    job_desc: { type: String, required: true },
    application_deadline: { type: Date, required: true },
    date_created: { type: Date, default: Date.now(), required: true },
});

export interface IJob extends Document {
    title: String;
    job_type: String;
    company_name: String;
    experience_level: Number;
    job_location: String;
    contact_email: String;
    skills: String;
    job_desc: String;
    application_deadline: Date;
    date_created: Date;
}

export default mongoose.model<IJob>('Job', job);
