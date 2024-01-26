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
const response_helper_1 = require("../../helpers/response.helper");
const auth_service_1 = require("../../services/admin/auth.service");
const admin_model_1 = require("../../models/admin.model");
const auth_util_1 = require("../../utils/auth.util");
class AuthController {
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                const data = yield auth_service_1.default.login(email, password, res, next);
                if (data) {
                    res.logMsg = `*${data.admin._id}* login successfully`;
                    return response_helper_1.default.ok(res, res.__('login_successfully'), data);
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield auth_service_1.default.createAdmin();
            }
            catch (error) {
                next(error);
            }
        });
    }
    changePassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { passwordCurrent, password } = req.body;
            try {
                const adminId = req.admin._id;
                const data = yield auth_service_1.default.changePassword(passwordCurrent, password, adminId, res);
                if (data) {
                    res.logMsg = 'Admin password changed successfully';
                    return response_helper_1.default.ok(res, res.__('admin_password_changed'), {});
                }
            }
            catch (err) {
                next(err);
            }
        });
    }
    getProfile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let getAdmin = yield admin_model_1.default.findOne({
                    _id: req.admin._id,
                });
                return response_helper_1.default.ok(res, res.__('get_profile'), getAdmin);
            }
            catch (err) {
                next(err);
            }
        });
    }
    updateProfile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, name, profilePic } = req.body;
            try {
                let getAdmin = yield admin_model_1.default.findOne({
                    _id: req.admin._id,
                });
                if (!getAdmin) {
                    return response_helper_1.default.badRequest(res, res.__('account_not_found.'));
                }
                getAdmin.name = name ? name : getAdmin.name,
                    getAdmin.email = email ? email : getAdmin.email,
                    getAdmin.profilePic = profilePic ? profilePic : getAdmin.profilePic,
                    getAdmin.save();
                return response_helper_1.default.ok(res, res.__('update_profile'), getAdmin);
            }
            catch (error) {
                next(error);
            }
        });
    }
    forgotPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = req.body.email;
            try {
                let admin = yield admin_model_1.default.findOne({ email: email });
                if (!admin) {
                    return response_helper_1.default.badRequest(res, res.__('account_not_found.'));
                }
                //   const otp = await Auth.generateOtp();
                admin.verification_code = "1000";
                admin.save();
                return response_helper_1.default.ok(res, res.__('send_otp'), {});
            }
            catch (error) {
                next(error);
            }
        });
    }
    verifyOtp(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, otp } = req.body;
            try {
                let admin = yield admin_model_1.default.findOne({ email: email });
                if (!admin) {
                    return response_helper_1.default.badRequest(res, res.__('account_not_found.'));
                }
                if (admin.verification_code != otp) {
                    return response_helper_1.default.badRequest(res, "Invalid OTP");
                }
                admin.verification_code = null;
                admin.save();
                return response_helper_1.default.ok(res, "Verify OTP please reset the password", {});
            }
            catch (error) {
                next(error);
            }
        });
    }
    resetPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                let admin = yield admin_model_1.default.findOne({ email });
                if (!admin) {
                    return response_helper_1.default.badRequest(res, res.__('account_not_found.'));
                }
                admin.password = yield new auth_util_1.Auth().encryptPassword(password);
                yield admin.save();
                let msg = "Password changed successfully.";
                return response_helper_1.default.ok(res, msg, {});
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = new AuthController();
