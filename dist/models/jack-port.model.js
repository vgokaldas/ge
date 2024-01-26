"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const JPSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "user",
    },
    GrandScore: {
        type: Number,
        default: 0
    },
    MajorScore: {
        type: Number,
        default: 0
    },
    MinorScore: {
        type: Number,
        default: 0
    },
    MiniScore: {
        type: Number,
        default: 0
    },
    MiniShareNum: {
        type: Number,
        default: 0
    },
    MaxShareNum: {
        type: Number,
        default: 0
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
const JPModel = (0, mongoose_1.model)("jackPort", JPSchema);
exports.default = JPModel;
