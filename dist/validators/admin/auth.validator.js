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
const Joi = require("joi");
const joi_validate_helper_1 = require("../../helpers/joi-validate.helper");
class AuthValidator {
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = Joi.object().keys({
                email: Joi.string().required(),
                password: Joi.string().required()
            });
            const isValid = yield (0, joi_validate_helper_1.validate)(req.body, res, schema);
            if (isValid) {
                next();
            }
        });
    }
    changePassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = Joi.object().keys({
                password: Joi.string().required(),
                passwordCurrent: Joi.string().required()
            });
            const isValid = yield (0, joi_validate_helper_1.validate)(req.body, res, schema);
            if (isValid) {
                next();
            }
        });
    }
    forgetPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = Joi.object().keys({
                email: Joi.string().required(),
            });
            const isValid = yield (0, joi_validate_helper_1.validate)(req.body, res, schema);
            if (isValid) {
                next();
            }
        });
    }
    verifyOTP(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = Joi.object().keys({
                email: Joi.string().required(),
                otp: Joi.string().required(),
            });
            const isValid = yield (0, joi_validate_helper_1.validate)(req.body, res, schema);
            if (isValid) {
                next();
            }
        });
    }
    resetPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = Joi.object().keys({
                email: Joi.string().required(),
                password: Joi.string()
                    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
                    .required()
                    .messages({
                    "string.pattern.base": `Password should be between 3 to 30 characters and contain letters or numbers only`,
                    "string.empty": `Password cannot be empty`,
                    "any.required": `Password is required`,
                }),
            });
            const isValid = yield (0, joi_validate_helper_1.validate)(req.body, res, schema);
            if (isValid) {
                next();
            }
        });
    }
    UserChangePassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = Joi.object().keys({
                passwordCurrent: Joi.string().required()
            });
            const isValid = yield (0, joi_validate_helper_1.validate)(req.body, res, schema);
            if (isValid) {
                next();
            }
        });
    }
}
exports.default = new AuthValidator();
