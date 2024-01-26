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
const user_model_1 = require("../../models/user.model");
const auth_util_1 = require("../../utils/auth.util");
const user_service_1 = require("../../services/admin/user.service");
const transaction_record_model_1 = require("../../models/transaction-record.model");
class UserController {
    add(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userName, nickName, password, roleType, balance } = req.body;
            try {
                if (yield user_model_1.default.exists({ userName }))
                    return response_helper_1.default.conflict(res, res.__('user_already_exist'));
                const encryptedPassword = yield new auth_util_1.Auth().encryptPassword(password);
                user_model_1.default.create({ roleType, userName, nickName, balance, password: encryptedPassword, userId: yield new auth_util_1.Auth().generateUserId() });
                return response_helper_1.default.created(res, res.__('user_added_successfully'), {});
            }
            catch (error) {
                next(error);
            }
        });
    }
    edit(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userName, nickName } = req.body;
            const userId = req.params.id;
            try {
                const user = yield user_model_1.default.findOne({ _id: userId });
                user.userName = userName ? userName : user.userName;
                user.nickName = nickName ? nickName : user.nickName;
                user.save();
                return response_helper_1.default.ok(res, res.__('user edited successfully'), { user });
            }
            catch (error) {
                next(error);
            }
        });
    }
    status(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.id;
                const user = yield user_model_1.default.findOne({ _id: userId });
                user.isActive = !user.isActive;
                user.save();
                return response_helper_1.default.ok(res, res.__('user status change successfully'), user);
            }
            catch (error) {
                next(error);
            }
        });
    }
    list(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const queryString = req.query;
                const user = yield user_service_1.default.list(queryString);
                res.logMsg = `User list fetched successfully`;
                return response_helper_1.default.ok(res, res.__('user_list'), user);
            }
            catch (error) {
                next(error);
            }
        });
    }
    changePassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { passwordCurrent } = req.body;
            try {
                const userId = req.params.id;
                const data = yield user_service_1.default.changePassword(passwordCurrent, userId, res);
                if (data) {
                    res.logMsg = 'User password changed successfully';
                    return response_helper_1.default.ok(res, res.__('user password changed'), {});
                }
            }
            catch (err) {
                next(err);
            }
        });
    }
    recharge(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { amount, userId, currentBalance } = req.body;
                const user = yield user_model_1.default.findOne({ _id: userId });
                const rechargeAmount = Number((user === null || user === void 0 ? void 0 : user.balance) + amount);
                user.balance = rechargeAmount;
                yield user.save();
                yield transaction_record_model_1.default.create({ userId, before: currentBalance, recharge: amount, after: rechargeAmount });
                return response_helper_1.default.ok(res, res.__('user_recharge_successfully'), { user });
            }
            catch (error) {
                next(error);
            }
        });
    }
    redeem(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { amount, userId, currentBalance } = req.body;
                const user = yield user_model_1.default.findOne({ _id: userId });
                const redeemAmount = Number((user === null || user === void 0 ? void 0 : user.balance) - amount);
                user.balance = redeemAmount;
                yield user.save();
                yield transaction_record_model_1.default.create({ userId, before: currentBalance, redeem: amount, after: redeemAmount });
                return response_helper_1.default.ok(res, res.__('user_redeem_successfully'), { user });
            }
            catch (error) {
                next(error);
            }
        });
    }
    gameRecords(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const queryString = req.query;
                // if(!queryString.userId) return ResponseHelper.forbidden(res,res.__('userId_required'))
                const gameRecord = yield user_service_1.default.gameRecords(queryString);
                res.logMsg = `User game record fetched successfully`;
                return response_helper_1.default.ok(res, res.__('user_game_records'), gameRecord);
            }
            catch (error) {
                next(error);
            }
        });
    }
    transactionRecords(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const queryString = req.query;
                // need to work on transaction summary count object
                const gameRecord = yield user_service_1.default.transactionRecords(queryString);
                res.logMsg = `transaction record fetched successfully`;
                return response_helper_1.default.ok(res, res.__('transaction_game_records'), gameRecord);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = new UserController();
