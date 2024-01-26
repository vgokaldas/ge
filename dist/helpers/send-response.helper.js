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
exports.sendResponse = void 0;
/**
 *
 * @param req {ReqInterface} req Object
 * @param res {ResInterface} res Object
 * @param status  {number} response status code
 * @param message {string} status message
 * @param data {any} data object send to response
 */
const sendResponse = (req, res, status, message, data = null) => __awaiter(void 0, void 0, void 0, function* () {
    const respObj = {
        status,
        message: res.__(message),
    };
    const execTime = new Date().getTime() - req.startTime;
    if (process.env.NODE_ENV === 'dev') {
        respObj.execTime = execTime;
    }
    if (data) {
        respObj.data = data;
    }
    res.status(status).json(respObj);
});
exports.sendResponse = sendResponse;
