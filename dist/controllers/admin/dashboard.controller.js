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
const game_model_1 = require("../../models/game.model");
const jack_port_records_model_1 = require("../../models/jack-port-records.model");
const transaction_record_model_1 = require("../../models/transaction-record.model");
const user_model_1 = require("../../models/user.model");
const response_helper_1 = require("../../helpers/response.helper");
const mongoose_1 = require("mongoose");
const game_record_model_1 = require("../../models/game-record.model");
class DashboardController {
    getAdminDashboard(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const totalUser = yield user_model_1.default.find({
                    roleType: "USER",
                }).countDocuments();
                const totalVendor = yield user_model_1.default.find({
                    roleType: "VENDOR",
                }).countDocuments();
                const totalStore = yield user_model_1.default.find({
                    roleType: "STORE",
                }).countDocuments();
                const totalGames = yield game_model_1.default.find({}).countDocuments();
                const totalJackportRecord = yield jack_port_records_model_1.default.find().countDocuments();
                const totalTransactionRecord = yield transaction_record_model_1.default.find().countDocuments();
                const getTransaction = yield transaction_record_model_1.default.aggregate([
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
                        $lookup: {
                            from: "users",
                            localField: "userParentData.parentId",
                            foreignField: "_id",
                            as: "vendorData",
                        },
                    },
                    {
                        $unwind: {
                            'path': '$vendorData',
                            'preserveNullAndEmptyArrays': true
                        }
                    },
                    {
                        $sort: {
                            createdAt: -1
                        }
                    },
                    {
                        $limit: 10
                    }
                ]);
                const getGameRecords = yield game_record_model_1.default.aggregate([
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
                        $lookup: {
                            from: "users",
                            localField: "userParentData.parentId",
                            foreignField: "_id",
                            as: "vendorData",
                        },
                    },
                    {
                        $unwind: {
                            'path': '$vendorData',
                            'preserveNullAndEmptyArrays': true
                        }
                    },
                    {
                        $sort: {
                            createdAt: -1
                        }
                    },
                    {
                        $limit: 10
                    }
                ]);
                return response_helper_1.default.ok(res, res.__("dashboard_count"), {
                    totalGames,
                    totalJackportRecord,
                    totalStore,
                    totalTransactionRecord,
                    totalUser,
                    totalVendor,
                    getTransaction,
                    getGameRecords
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    getSubAdminDashboard(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.user.id;
                // const getUser = await UserModel.findOne({_id:userId})
                const totalVendor = yield user_model_1.default.find({
                    roleType: "VENDOR",
                    parentId: userId,
                }).countDocuments();
                const totalStore = yield user_model_1.default.find({
                    roleType: "STORE",
                    parentId: userId,
                }).countDocuments();
                const totalUserStore = yield user_model_1.default.find({
                    roleType: "USER",
                    parentId: userId,
                }).countDocuments();
                const agg = [
                    {
                        $match: {
                            parentId: new mongoose_1.Types.ObjectId(userId),
                            roleType: "USER",
                        },
                    },
                    {
                        $lookup: {
                            from: "users",
                            localField: "_id",
                            foreignField: "parentId",
                            as: "usersss",
                        },
                    },
                    {
                        $addFields: {
                            totalUsers: {
                                $size: "$usersss",
                            },
                        },
                    },
                    {
                        $group: {
                            _id: "$_id",
                            totalUserCount: {
                                $sum: "$totalUsers",
                            },
                        },
                    },
                ];
                const findUser = yield user_model_1.default.aggregate(agg);
                const totalUser = findUser;
                const totalJackportRecord = yield jack_port_records_model_1.default.find({
                    userId: userId,
                }).countDocuments();
                const totalTransactionRecord = yield transaction_record_model_1.default.aggregate([
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
                        '$count': 'totalTransaction'
                    }
                ]);
                const totalGame = yield game_model_1.default.find({}).countDocuments();
                const getTransaction = yield transaction_record_model_1.default.aggregate([
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
                        $sort: {
                            createdAt: -1
                        }
                    },
                    {
                        $limit: 10
                    }
                ]);
                const getGameRecords = yield game_record_model_1.default.aggregate([
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
                        $sort: {
                            createdAt: -1
                        }
                    },
                    {
                        $limit: 10
                    }
                ]);
                return response_helper_1.default.ok(res, res.__("dashboard_count"), {
                    totalJackportRecord,
                    totalStore,
                    totalTransactionRecord,
                    totalUser,
                    totalVendor,
                    totalUserStore,
                    totalGame,
                    getTransaction,
                    getGameRecords
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = new DashboardController();
