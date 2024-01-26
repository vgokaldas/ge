
import { Schema, model, Types } from "mongoose";
import { TransactionRecordInterface } from "../interfaces/transaction-record.interface";

const TransactionRecordSchema = new Schema({

    userId: {
        type: Types.ObjectId,
        ref: 'user',
    },
    before: {
        type: Number
    },
    recharge: {
        type: Number,
        default: 0
    },
    redeem: {
        type: Number,
        default: 0
    },
    after: {
        type: Number,
        default: 0
    },
    cashier:{
        type:String
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
const TransactionRecordModel = model<TransactionRecordInterface>("transactionRecord", TransactionRecordSchema);
export default TransactionRecordModel;
