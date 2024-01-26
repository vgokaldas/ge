"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class ResponseHelper {
    responseHandler(res, statusCode, statusText, message, data) {
        return __awaiter(this, void 0, void 0, function* () {
            data = yield this.execTime(res, statusCode, data);
            res.status(statusCode).json({ status: statusCode, statusText, message: message, data: data });
        });
    }
    ok(res, message, data) {
        return __awaiter(this, void 0, void 0, function* () {
            data = yield this.execTime(res, 200, data);
            res.status(200).json({ status: 200, statusText: 'SUCCESS', message: message, data: data });
        });
    }
    badRequest(res, message, data = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            res.status(400).json({ status: 400, statusText: 'BAD_REQUEST', message: message, data: data });
        });
    }
    conflict(res, message, data = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            res.status(409).json({ status: 409, statusText: 'CONFLICT', message: message, data: data });
        });
    }
    unAuthenticated(res, message = null, data = {}, statusText) {
        return __awaiter(this, void 0, void 0, function* () {
            res.status(401).json({ status: 401, statusText: statusText ? statusText : 'UNAUTHORIZE', message: message ? message : "Un-authenticated Request!", data: data });
        });
    }
    expired(res, message = null, data = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            res.status(410).json({ status: 410, statusText: 'EXPIRED', message: message ? message : "Un-authenticated Request!", data: data });
        });
    }
    unAuthorize(res, message = null, data = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            res.status(403).json({ status: 403, statusText: 'FORBIDDEN', message: message ? message : "Un-authenticated Request!", data: data });
        });
    }
    serverError(res, message = null, data = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            res.status(500).json({ status: 500, message: message ? message : "Internal Server Error!", data: data });
        });
    }
    created(res, message = null, data = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            data = yield this.execTime(res, 201, data);
            res.status(201).json({ status: 201, statusText: 'CREATED', message: message ? message : "created!", data: data });
        });
    }
    forbidden(res, message = null, data = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            res.status(403).json({ status: 403, statusText: 'FORBIDDEN', message: message ? message : "Un-authenticated Request!", data: data });
        });
    }
    execTime(res, status, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const execTime = new Date().getTime() - res.logger.req.startTime;
            if (process.env.NODE_ENV === 'dev') {
                if (data)
                    data.execTime = execTime;
            }
            res.logger.success(res.logMsg, execTime);
            return data;
        });
    }
}
exports.default = new ResponseHelper();
