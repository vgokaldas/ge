"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    userName: {
        type: String
    },
    parentId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "user",
    },
    nickName: {
        type: String
    },
    password: {
        type: String
    },
    userId: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        default: 0
    },
    roleType: {
        type: String,
        enum: ['VENDOR', 'STORE', 'USER']
    },
    profilePic: {
        type: String
    },
    verification_code: {
        type: String
    },
    totalGame: {
        type: Number,
        default: 0
    },
    totalWin: {
        type: Number,
        default: 0
    },
    totalLost: {
        type: Number,
        default: 0
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    lastLogin: {
        type: Date,
        default: Date.now,
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
UserSchema.index({ userId: 1 });
const UserModel = (0, mongoose_1.model)("user", UserSchema);
exports.default = UserModel;
