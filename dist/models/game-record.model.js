"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const GameRecordSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "user",
    },
    gameName: {
        type: String
    },
    balance_before_game: {
        type: Number,
        default: 0
    },
    total_played: {
        type: Number,
        default: 0
    },
    total_win: {
        type: Number,
        default: 0
    },
    score: {
        type: Number,
        default: 0
    },
    recording_notes: {
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
const GameRecordModel = (0, mongoose_1.model)("gameRecord", GameRecordSchema);
exports.default = GameRecordModel;
