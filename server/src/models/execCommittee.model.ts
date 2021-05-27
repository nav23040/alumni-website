import mongoose, { Schema, Document } from 'mongoose';

export interface IImage {
    name: String;
    size: Number;
    data: String;
    file_type: String;
}

export interface IExecCommittee extends Document {
    image: IImage;
    first_name: String;
    last_name?: String;
    category: String;
    info: String;
    position: String;
    email: String;
    linkedIn?: String;
    facebook?: String;
    website?: String;
}

const execCommittee: Schema = new Schema({
    image: {
        name: { type: String, required: true },
        size: { type: Number, required: true },
        data: { type: String, required: true },
        file_type: String,
    },
    first_name: { type: String, required: true },
    last_name: { type: String },
    category: { type: String, required:true },
    info: { type: String, required: true },
    position: { type: String, required: true },
    email: { type: String, required: true },
    linkedIn: String,
    facebook: String,
    website: String,
});

export default mongoose.model<IExecCommittee>('execCommittee', execCommittee);
