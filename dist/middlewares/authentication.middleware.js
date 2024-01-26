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
const response_helper_1 = require("../helpers/response.helper");
const admin_model_1 = require("../models/admin.model");
const user_model_1 = require("../models/user.model");
const auth_util_1 = require("../utils/auth.util");
class Authentication {
    admin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let token;
                if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
                    token = req.headers.authorization.split(' ')[1];
                }
                if (!token) {
                    return response_helper_1.default.unAuthenticated(res, res.__('authentication_required'), {}, 'TOKEN_REQUIRED');
                }
                const decoded = yield new auth_util_1.Auth().decodeJwt(token);
                const admin = yield admin_model_1.default.findById(decoded.id);
                if (!admin) {
                    return response_helper_1.default.unAuthenticated(res, res.__('jwt_invalid_token'));
                }
                if (admin.passwordChangedAt && decoded.iat < admin.passwordChangedAt.getTime() / 1000) {
                    return response_helper_1.default.unAuthenticated(res, res.__('admin_changed_password_recently'), {}, 'OLD_PASSWORD');
                }
                req.admin = admin;
                next();
            }
            catch (err) {
                return next(err);
            }
        });
    }
    user(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let token;
                if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
                    token = req.headers.authorization.split(' ')[1];
                }
                if (!token) {
                    return response_helper_1.default.unAuthenticated(res, res.__('authentication_required'), {}, 'TOKEN_REQUIRED');
                }
                const decoded = yield new auth_util_1.Auth().decodeJwt(token);
                const user = yield user_model_1.default.findById(decoded.id);
                if (!user) {
                    return response_helper_1.default.unAuthenticated(res, res.__('jwt_invalid_token'));
                }
                if (user.passwordChangedAt && decoded.iat < user.passwordChangedAt.getTime() / 1000) {
                    return response_helper_1.default.unAuthenticated(res, res.__('user_changed_password_recently'), {}, 'OLD_PASSWORD');
                }
                req.user = user;
                next();
            }
            catch (err) {
                return next(err);
            }
        });
    }
}
exports.default = new Authentication();
