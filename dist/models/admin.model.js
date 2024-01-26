"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const AdminSchema = new mongoose_1.Schema({
    email: {
        type: String,
        lowercase: true,
        trim: true,
        default: null
    },
    password: {
        type: String,
    },
    name: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    profilePic: {
        type: String
    },
    verification_code: {
        type: String
    }
}, { timestamps: true });
const AdminModel = (0, mongoose_1.model)('admin', AdminSchema);
exports.default = AdminModel;
