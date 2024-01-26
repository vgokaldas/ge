import { Document, ObjectId } from "mongoose";
export interface TransactionRecordInterface extends Document {
    _id: ObjectId | string;
    userId: ObjectId | string;
    before?: number;
    recharge?: number;
    redeem?: number;
    cashier?: string;
    after?: number;
    createdAt?: Date;
    updated?: Date;
}
