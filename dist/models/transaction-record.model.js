"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const TransactionRecordSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Types.ObjectId,
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
    cashier: {
        type: String
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
});
const TransactionRecordModel = (0, mongoose_1.model)("transactionRecord", TransactionRecordSchema);
exports.default = TransactionRecordModel;
