"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidObjetId = void 0;
const mongoose_1 = require("mongoose");
const isValidObjetId = (id) => {
    if (mongoose_1.Types.ObjectId.isValid(id)) {
        return true;
    }
    return false;
};
exports.isValidObjetId = isValidObjetId;
