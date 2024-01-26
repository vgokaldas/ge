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
exports.validate = void 0;
const response_constant_1 = require("../constants/response.constant");
const validate = (body, res, schema) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validation = yield schema.validate(body, { abortEarly: false });
        if (validation.error) {
            const error = validation.error.details.map((e) => e = e.message);
            res.status(response_constant_1.RESPONSE.HTTP_BAD_REQUEST).json({
                status: response_constant_1.RESPONSE.HTTP_BAD_REQUEST,
                message: 'Validation failed',
                data: { error }
            });
            return false;
        }
        return true;
    }
    catch (err) {
        console.log(err);
    }
});
exports.validate = validate;
