import { Document, ObjectId } from "mongoose";
export interface JackPortRecordInterface extends Document {
    _id: ObjectId | string;
    userId: ObjectId | string;
    jpType: string;
    jpScore: number;
    createdAt?: Date;
    updated?: Date;
}
