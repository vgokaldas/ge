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
const auth_service_1 = require("../../services/app/auth.service");
const user_model_1 = require("../../models/user.model");
const auth_util_1 = require("../../utils/auth.util");
class AuthController {
    /**
         * @api {post} /api/app/auth/login Login
         * @apiHeader {String} App-Version Version Code 1.0.0.
         * @apiVersion 1.0.0
         * @apiName login
         * @apiGroup App-Auth
         * @apiBody {String} userName ankit
         * @apiBody {String} password sbckjdchkdsjc
         * @apiParamExample {json} Request-Body:
         * {
             "userName":"test",
              "password":"test@123"
           }
         * @apiSuccessExample {json} Success-Response:
           {"status":200,"statusText":"SUCCESS","message":"login successfully","data":{"user":{"_id":"64b9157e6dd0eb94c9ee09a2","userName":"afreen","nickName":"affa","userId":"UI20584","isActive":false,"isDeleted":false,"timestamps":"1689851257946","lastLogin":"2023-07-20T11:26:53.542Z","createdAt":"2023-07-20T11:07:42.371Z","updatedAt":"2023-07-20T11:07:42.371Z","__v":0},"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YjkxNTdlNmRkMGViOTRjOWVlMDlhMiIsInVzZXJOYW1lIjoiYWZyZWVuIiwiaWF0IjoxNjg5ODUyNDEzLCJleHAiOjE2ODk5Mzg4MTN9.RMX5onnNzOflACStQiQ7sazGBZW7UFyeNNwjME2jvWQ","execTime":735}}
    */
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userName, password, type } = req.body;
            try {
                const data = yield auth_service_1.default.login(userName, password, type, res, next);
                if (data) {
                    res.logMsg = `*${data.user.id}* login successfully`;
                    return response_helper_1.default.ok(res, res.__('login_successfully'), data);
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    /**
       * @api {post} /api/app/auth/change-password Change Password
       * @apiHeader {String} App-Version Version Code 1.0.0.
       * @apiVersion 1.0.0
       * @apiHeader {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYmZlMGNmMTdiYmU2ZjY2NzI3MzlmMyIsImVtYWlsIjoiYWRtaW5Ad2VmdW5kdXMuY29tIiwiaWF..........
       * @apiName change-password
       * @apiGroup App-Auth
       * @apiBody {String} passwordCurrent ankit
       * @apiBody {String} password sbckjdchkdsjc
       * @apiParamExample {json} Request-Body:
       * {
             "passwordCurrent":"test@123",
             "password":"1234567"
          }
       * @apiSuccessExample {json} Success-Response:
         {"status":200,"statusText":"SUCCESS","message":"user_password_changed","data":{"execTime":1157}}
  */
    changePassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { passwordCurrent, password } = req.body;
            try {
                const userId = req.user.id;
                const data = yield auth_service_1.default.changePassword(passwordCurrent, password, userId, res);
                if (data) {
                    res.logMsg = 'User password changed successfully';
                    return response_helper_1.default.ok(res, res.__('user_password_changed'), {});
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
                const userId = req.user.id;
                const data = yield user_model_1.default.findOne({ _id: userId });
                if (data) {
                    res.logMsg = 'GetProfile';
                    return response_helper_1.default.ok(res, res.__('GetProfile'), data);
                }
            }
            catch (err) {
                next(err);
            }
        });
    }
    updateProfile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userName, nickName } = req.body;
            try {
                let getUser = yield user_model_1.default.findOne({
                    _id: req.user.id,
                });
                if (!getUser) {
                    return response_helper_1.default.badRequest(res, res.__('account_not_found.'));
                }
                getUser.userName = userName ? userName : getUser.userName,
                    getUser.nickName = nickName ? nickName : getUser.nickName,
                    // getUser.p = profilePic ? profilePic :getUser.profilePic,
                    getUser.save();
                return response_helper_1.default.ok(res, res.__('update_profile'), getUser);
            }
            catch (error) {
                next(error);
            }
        });
    }
    forgotPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userName = req.body.userName;
            try {
                let user = yield user_model_1.default.findOne({ userName: userName });
                if (!user) {
                    return response_helper_1.default.badRequest(res, res.__('account_not_found.'));
                }
                //   const otp = await Auth.generateOtp();
                user.verification_code = "1000";
                user.save();
                return response_helper_1.default.ok(res, res.__('send_otp'), {});
            }
            catch (error) {
                next(error);
            }
        });
    }
    verifyOtp(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userName, otp } = req.body;
            try {
                let user = yield user_model_1.default.findOne({ userName: userName });
                if (!user) {
                    return response_helper_1.default.badRequest(res, res.__('account_not_found.'));
                }
                if (user.verification_code != otp) {
                    return response_helper_1.default.badRequest(res, "Invalid OTP");
                }
                user.verification_code = null;
                user.save();
                return response_helper_1.default.ok(res, "Verify OTP please reset the password", {});
            }
            catch (error) {
                next(error);
            }
        });
    }
    resetPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userName, password } = req.body;
            try {
                let user = yield user_model_1.default.findOne({ userName: userName });
                if (!user) {
                    return response_helper_1.default.badRequest(res, res.__('account_not_found.'));
                }
                user.password = yield new auth_util_1.Auth().encryptPassword(password);
                yield user.save();
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
