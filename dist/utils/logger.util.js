"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const winston = require("winston");
const path = require("path");
const { combine, timestamp, prettyPrint } = winston_1.format;
class DataDog {
    constructor(req) {
        try {
            this.req = req;
            if (req.hasOwnProperty('originalUrl')) {
                this.api = req.originalUrl;
            }
            else {
                this.api = req.url;
            }
            this.source = "NodeJS";
            const logDirectoryPath = path.resolve(process.cwd() + '/logs');
            this.logger = (0, winston_1.createLogger)({
                // level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
                format: combine(timestamp(), winston_1.format.json(), prettyPrint(), winston_1.format.metadata({ fillExcept: ['message', 'level', 'timestamp'] })),
                transports: [
                    //
                    // - Write to all logs with level `info` and below to `combined.log` 
                    // - Write all logs error (and below) to `error.log`.
                    //
                    new winston.transports.Console(),
                    new winston.transports.File({ filename: `${logDirectoryPath}/error.log`, level: 'error' }),
                    new winston.transports.File({ filename: `${logDirectoryPath}/combined.log`, level: 'info' }),
                    new winston.transports.File({ filename: `${logDirectoryPath}/warn.log`, level: 'warn' }),
                    new winston.transports.File({ filename: `${logDirectoryPath}/debug.log`, level: 'debug' }),
                ],
            });
        }
        catch (error) {
            console.log("error in constructing logger", error);
        }
    }
    /**
     * @description log errors
     * @param message
     * @param error
     * @returns void
     */
    error(message, error = {}) {
        var _a, _b, _c, _d;
        if (!this.logger) {
            console.log(message, error);
            return;
        }
        if (error.hasOwnProperty('message')) {
            this.logger.error({
                api: this.api,
                message: message,
                error: error
            });
            return;
        }
        this.logger.error({
            api: this.api,
            user: ((_b = (_a = this.req) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b._id) || 'guest',
            session: ((_d = (_c = this.req) === null || _c === void 0 ? void 0 : _c.session) === null || _d === void 0 ? void 0 : _d._id) || 'guest',
            message: message,
            error: error
        });
    }
    /**
     * @description log information
     * @param message
     * @param data
     * @returns void
     */
    info(message, data = {}) {
        if (!this.logger) {
            console.log(message, data);
            return;
        }
        this.logger.info({
            api: this.api,
            message: message,
            data: data
        });
    }
    /**
     * @description log warnings
     * @param message
     * @param data
     * @returns void
     */
    warn(message, data = {}) {
        if (!this.logger) {
            console.log(message, data);
            return;
        }
        this.logger.warn({
            api: this.api,
            message: message,
            data: data
        });
    }
    /**
     * @description debug logs
     * @param message
     * @param data
     * @returns void
     */
    debug(message, data = {}) {
        if (!this.logger) {
            console.log(message, data);
            return;
        }
        this.logger.debug({
            api: this.api,
            message: message,
            data: data
        });
    }
    /**
     * @description success logs
     * @param message
     * @param execTime
     * @returns void
     */
    success(message, execTime) {
        if (!this.logger) {
            console.log(message);
            return;
        }
        this.logger.info({
            api: this.api,
            message: message,
            execTime,
        });
    }
}
exports.default = DataDog;
