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
const api_features_util_1 = require("../../utils/api-features.util");
const mongoose_1 = require("mongoose");
const game_record_model_1 = require("../../models/game-record.model");
class UserController {
    add(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userName, nickName, password, roleType, balance } = req.body;
            try {
                const parentId = req.user.id;
                if (yield user_model_1.default.exists({ roleType, userName }))
                    return response_helper_1.default.conflict(res, res.__("user_already_exist"));
                const parentUser = yield user_model_1.default.findOne({ _id: parentId });
                if ((parentUser === null || parentUser === void 0 ? void 0 : parentUser.balance) < balance)
                    return response_helper_1.default.forbidden(res, res.__("you_have_insufficient_amount_to_recharge_user"));
                parentUser.balance = parentUser.balance - Number(balance);
                yield parentUser.save();
                const encryptedPassword = yield new auth_util_1.Auth().encryptPassword(password);
                user_model_1.default.create({
                    roleType,
                    parentId,
                    balance,
                    userName,
                    nickName,
                    password: encryptedPassword,
                    userId: yield new auth_util_1.Auth().generateUserId(),
                });
                return response_helper_1.default.created(res, res.__("user_added_successfully"), {});
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
                return response_helper_1.default.ok(res, res.__("user edited successfully"), {
                    user,
                });
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
                return response_helper_1.default.ok(res, res.__("user status change successfully"), user);
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
                const page = queryString.page * 1 || 1;
                const limit = queryString.limit * 1 || 10;
                const roleType = queryString.roleType;
                const parentId = req.user.id;
                // let skip = (page - 1) * limit;
                const countQuery = user_model_1.default.find({ roleType, parentId });
                const sorting = queryString.sort || "-createdAt";
                const countFeature = new api_features_util_1.ApiFeatures(countQuery, queryString)
                    .filtering()
                    .searching(["userName", "userId"])
                    .sorting(sorting)
                    .getCount();
                const lisQuery = user_model_1.default.find({ roleType, parentId });
                const listFeature = new api_features_util_1.ApiFeatures(lisQuery, queryString)
                    .filtering()
                    .searching(["userName", "userId"])
                    .sorting(sorting)
                    .fieldsLimiting()
                    .pagination();
                const count = yield countFeature.query;
                const list = yield listFeature.query;
                return response_helper_1.default.ok(res, res.__("user_list"), {
                    list,
                    page,
                    limit,
                    count,
                });
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
                    res.logMsg = "User password changed successfully";
                    return response_helper_1.default.ok(res, res.__("user password changed"), {});
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
                const getbalance = yield user_model_1.default.findOne({ _id: req.user.id });
                if (getbalance.balance < amount) {
                    return response_helper_1.default.forbidden(res, res.__("you_have_insufficient_amount_to_recharge_user"));
                }
                const user = yield user_model_1.default.findOne({ _id: userId });
                const rechargeAmount = Number((user === null || user === void 0 ? void 0 : user.balance) + amount);
                user.balance = rechargeAmount;
                yield user.save();
                yield transaction_record_model_1.default.create({
                    userId,
                    before: currentBalance,
                    recharge: amount,
                    after: rechargeAmount,
                });
                return response_helper_1.default.ok(res, res.__("user_recharge_successfully"), {
                    user,
                });
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
                yield transaction_record_model_1.default.create({
                    userId,
                    before: currentBalance,
                    redeem: amount,
                    after: redeemAmount,
                });
                return response_helper_1.default.ok(res, res.__("user_redeem_successfully"), {
                    user,
                });
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
                return response_helper_1.default.ok(res, res.__("user_game_records"), gameRecord);
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
                return response_helper_1.default.ok(res, res.__("transaction_game_records"), gameRecord);
            }
            catch (error) {
                next(error);
            }
        });
    }
    transactionRecordsub(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.query.userId ? req.query.userId : req.user.id;
                console.log(userId, "userId---------");
                const page = req.query.page * 1 || 1;
                const limit = req.query.limit * 1 || 10;
                let skip = (page - 1) * limit;
                let match = {};
                if (req.query.search) {
                    match = {
                        "userData.userId": { $regex: `${req.query.search}`, $options: 'i' }
                    };
                }
                const agg = [
                    {
                        $lookup: {
                            from: "users",
                            localField: "userId",
                            foreignField: "_id",
                            as: "userData",
                        },
                    },
                    {
                        $unwind: {
                            path: "$userData",
                            preserveNullAndEmptyArrays: true,
                        },
                    },
                    {
                        $lookup: {
                            from: "users",
                            localField: "userData.parentId",
                            foreignField: "_id",
                            as: "userParentData",
                        },
                    },
                    {
                        $unwind: {
                            path: "$userParentData",
                            preserveNullAndEmptyArrays: true,
                        },
                    },
                    {
                        $match: {
                            $or: [
                                { "userData.parentId": new mongoose_1.Types.ObjectId(userId) },
                                { "userParentData.parentId": new mongoose_1.Types.ObjectId(userId) },
                            ],
                        },
                    },
                    {
                        $match: match
                    },
                    {
                        $facet: {
                            count: [
                                {
                                    $count: "count",
                                },
                            ],
                            list: [
                                {
                                    $sort: {
                                        createdAt: -1,
                                    },
                                },
                                {
                                    $skip: skip,
                                },
                                {
                                    $limit: limit,
                                },
                            ],
                        },
                    },
                    {
                        $project: {
                            count: {
                                $first: "$count.count",
                            },
                            list: 1,
                        },
                    },
                ];
                const transactionData = yield transaction_record_model_1.default.aggregate(agg);
                const list = transactionData[0].list;
                const count = transactionData[0].count;
                return response_helper_1.default.ok(res, res.__("transaction_list"), {
                    list,
                    count,
                    page,
                    limit,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    gameRecordsub(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.query.userId ? req.query.userId : req.user.id;
                console.log(userId, "userId---------");
                const page = req.query.page * 1 || 1;
                const limit = req.query.limit * 1 || 10;
                let skip = (page - 1) * limit;
                let match = {};
                if (req.query.search) {
                    match = {
                        "userData.userId": { $regex: `${req.query.search}`, $options: 'i' }
                    };
                }
                const agg = [
                    {
                        $lookup: {
                            from: "users",
                            localField: "userId",
                            foreignField: "_id",
                            as: "userData",
                        },
                    },
                    {
                        $unwind: {
                            'path': '$userData',
                            'preserveNullAndEmptyArrays': true
                        }
                    },
                    {
                        $lookup: {
                            from: "users",
                            localField: "userData.parentId",
                            foreignField: "_id",
                            as: "userParentData",
                        },
                    },
                    {
                        $unwind: {
                            'path': '$userParentData',
                            'preserveNullAndEmptyArrays': true
                        }
                    },
                    {
                        $match: {
                            $or: [
                                { "userData.parentId": new mongoose_1.Types.ObjectId(userId) },
                                { "userParentData.parentId": new mongoose_1.Types.ObjectId(userId) }
                            ]
                        },
                    },
                    {
                        $match: match
                    },
                    {
                        $facet: {
                            count: [
                                {
                                    $count: "count",
                                },
                            ],
                            list: [
                                {
                                    $sort: {
                                        createdAt: -1,
                                    },
                                },
                                {
                                    $skip: skip,
                                },
                                {
                                    $limit: limit,
                                },
                            ],
                        },
                    },
                    {
                        $project: {
                            count: {
                                $first: "$count.count",
                            },
                            list: 1,
                        },
                    },
                ];
                const transactionData = yield game_record_model_1.default.aggregate(agg);
                const list = transactionData[0].list;
                const count = transactionData[0].count;
                return response_helper_1.default.ok(res, res.__("transaction_list"), {
                    list,
                    count,
                    page,
                    limit,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = new UserController();
