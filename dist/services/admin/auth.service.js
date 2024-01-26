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
const admin_model_1 = require("../../models/admin.model");
const auth_util_1 = require("../../utils/auth.util");
const response_helper_1 = require("../../helpers/response.helper");
class AuthService {
    createAdmin() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const encryptedPassword = yield new auth_util_1.Auth().encryptPassword('Admin@1234');
                const isAdminExist = yield admin_model_1.default.exists({ email: 'admin@cachoo.com' });
                if (isAdminExist) {
                    console.log('Admin Exists');
                }
                else {
                    yield admin_model_1.default.create({
                        email: 'admin@cachoo.com',
                        password: encryptedPassword,
                        name: 'Cachoo'
                    });
                    console.log('Admin created');
                }
                return;
            }
            catch (error) {
                console.log('error', error);
            }
        });
    }
    /**
     *
     * @param email {String} user email
     * @param password {Password} user password
     * @param res {ResInterface}
     * @param next {NextFunction} next function
     * @return {Promise<{admin: AdminInterface, token: string}>}
     */
    login(email, password, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const admin = yield admin_model_1.default.findOne({ email });
                if (!admin) {
                    return response_helper_1.default.badRequest(res, res.__('account_not_found.'));
                }
                const isPasswordCorrect = yield new auth_util_1.Auth().comparePassword(password, admin.password);
                if (!isPasswordCorrect) {
                    return response_helper_1.default.badRequest(res, res.__('invalid_email_password'));
                }
                const payload = {
                    id: admin._id,
                    email: admin.email,
                };
                const token = yield new auth_util_1.Auth().getToken(payload, '1d', next);
                admin.password = undefined;
                return {
                    admin,
                    token
                };
            }
            catch (error) {
                next(error);
            }
        });
    }
    changePassword(passwordCurrent, password, adminId, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const admin = yield admin_model_1.default.findById(adminId);
            const isPasswordCurrentCorrect = yield new auth_util_1.Auth().comparePassword(passwordCurrent, admin.password);
            if (!isPasswordCurrentCorrect) {
                return response_helper_1.default.badRequest(res, res.__('incorrect_password'));
            }
            const encryptedPassword = yield new auth_util_1.Auth().encryptPassword(password);
            admin.password = encryptedPassword;
            yield admin.save();
            return { admin };
        });
    }
}
exports.default = new AuthService();
