
import { Schema, model,Types } from "mongoose";
import { JackPortRecordInterface } from "../interfaces/jp-record.interface";

const JpRecordSchema = new Schema({

    userId: {
        type: Types.ObjectId,
        ref: 'user',
    },
    jpType:{
      type:String
    },
    jpScore:{
        type:Number,
        default:0
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    timestamps: {
        type: String,
        default: Math.round(new Date().getTime()),
    },
}
);
const JpRecordModel = model<JackPortRecordInterface>("jackPortRecord", JpRecordSchema);
export default JpRecordModel;
