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
const auth_util_1 = require("../../utils/auth.util");
const response_helper_1 = require("../../helpers/response.helper");
const user_model_1 = require("../../models/user.model");
class AuthService {
    /**
     *
     * @param email {String} user email
     * @param password {Password} user password
     * @param res {ResInterface}
     * @param next {NextFunction} next function
     * @return {Promise<{admin: AdminInterface, token: string}>}
     */
    login(userName, password, type, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user;
                if (type == "USER") {
                    user = yield user_model_1.default.findOne({ userName, roleType: type });
                }
                else {
                    user = yield user_model_1.default.findOne({ userName });
                }
                if (!user) {
                    return response_helper_1.default.badRequest(res, res.__("account_not_found."));
                }
                const isPasswordCorrect = yield new auth_util_1.Auth().comparePassword(password, user.password);
                if (!isPasswordCorrect) {
                    return response_helper_1.default.badRequest(res, res.__("invalid_user_or_password"));
                }
                const payload = {
                    id: user._id,
                    userName: user.userName,
                };
                const token = yield new auth_util_1.Auth().getToken(payload, "1d", next);
                user.lastLogin = new Date();
                yield user.save();
                user.password = undefined;
                return {
                    user,
                    token,
                };
            }
            catch (error) {
                next(error);
            }
        });
    }
    changePassword(passwordCurrent, password, adminId, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.default.findById(adminId);
            const isPasswordCurrentCorrect = yield new auth_util_1.Auth().comparePassword(passwordCurrent, user.password);
            if (!isPasswordCurrentCorrect) {
                return response_helper_1.default.badRequest(res, res.__("incorrect_password"));
            }
            const encryptedPassword = yield new auth_util_1.Auth().encryptPassword(password);
            user.password = encryptedPassword;
            yield user.save();
            return { user };
        });
    }
}
exports.default = new AuthService();
