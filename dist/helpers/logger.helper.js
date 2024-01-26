"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const logger_util_1 = require("../utils/logger.util");
const logger = (req, res, next) => {
    const logger = new logger_util_1.default(req);
    res.logger = logger;
    next();
};
exports.logger = logger;
