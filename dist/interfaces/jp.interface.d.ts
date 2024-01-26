import { Document, ObjectId } from "mongoose";
export interface JackPortInterface extends Document {
    _id: ObjectId | string;
    GrandScore: number;
    MajorScore: number;
    MinorScore: number;
    MiniScore: number;
    MiniShareNum: number;
    MaxShareNum: number;
    createdAt?: Date;
    updated?: Date;
}
