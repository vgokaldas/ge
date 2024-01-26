"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const SessionSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Types.ObjectId,
        ref: 'user'
    },
    vendor: {
        type: mongoose_1.Types.ObjectId,
        ref: 'vendor'
    },
    isActive: {
        type: Boolean,
        default: true
    },
    deviceType: {
        type: String,
    },
    deviceToken: {
        type: String,
    },
    deviceId: {
        type: String
    },
    deviceName: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });
const SessionModel = (0, mongoose_1.model)('session', SessionSchema);
exports.default = SessionModel;
