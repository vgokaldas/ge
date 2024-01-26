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
const game_record_model_1 = require("../../models/game-record.model");
const transaction_record_model_1 = require("../../models/transaction-record.model");
const user_model_1 = require("../../models/user.model");
const api_features_util_1 = require("../../utils/api-features.util");
const auth_util_1 = require("../../utils/auth.util");
class UserService {
    /**
     * @description listing of user
     * @param queryString req query object
     * @params User id of user
     * @returns
     */
    list(queryString) {
        return __awaiter(this, void 0, void 0, function* () {
            const page = queryString.page * 1 || 1;
            const limit = queryString.limit * 1 || 10;
            const roleType = queryString.roleType;
            // let skip = (page - 1) * limit;
            const countQuery = user_model_1.default.find({ roleType });
            const sorting = queryString.sort || "-createdAt";
            const countFeature = new api_features_util_1.ApiFeatures(countQuery, queryString)
                .filtering()
                .searching(["userName", "userId"])
                .sorting(sorting)
                .getCount();
            const lisQuery = user_model_1.default.find({ roleType });
            const listFeature = new api_features_util_1.ApiFeatures(lisQuery, queryString)
                .filtering()
                .searching(["userName", "userId"])
                .sorting(sorting)
                .fieldsLimiting()
                .pagination();
            const count = yield countFeature.query;
            const list = yield listFeature.query;
            return { list, page, limit, count };
        });
    }
    gameRecords(queryString) {
        return __awaiter(this, void 0, void 0, function* () {
            const page = queryString.page * 1 || 1;
            const limit = queryString.limit * 1 || 10;
            const userId = queryString.userId;
            console.log(userId, "user--->");
            console.log(userId !== "null" ? true : false);
            // let skip = (page - 1) * limit;
            const countQuery = userId !== "null"
                ? game_record_model_1.default.find({ userId })
                : game_record_model_1.default.find();
            const sorting = queryString.sort || "-createdAt";
            const countFeature = new api_features_util_1.ApiFeatures(countQuery, queryString)
                .searching(["gameName"])
                .sorting(sorting)
                .getCount();
            const lisQuery = userId !== "null"
                ? game_record_model_1.default.find({ userId }).populate("userId", "userName userId")
                : game_record_model_1.default.find().populate("userId", "userName userId");
            const listFeature = new api_features_util_1.ApiFeatures(lisQuery, queryString)
                .searching(["gameName"])
                .sorting(sorting)
                .fieldsLimiting()
                .pagination();
            const count = yield countFeature.query;
            const list = yield listFeature.query;
            return { list, page, limit, count };
        });
    }
    transactionRecords(queryString) {
        return __awaiter(this, void 0, void 0, function* () {
            const page = queryString.page * 1 || 1;
            const limit = queryString.limit * 1 || 10;
            const userId = queryString.userId;
            // let skip = (page - 1) * limit;
            const countQuery = userId
                ? transaction_record_model_1.default.find({ userId })
                : transaction_record_model_1.default.find();
            const sorting = queryString.sort || "-createdAt";
            const countFeature = new api_features_util_1.ApiFeatures(countQuery, queryString)
                .searching([""])
                .sorting(sorting)
                .getCount();
            const lisQuery = userId
                ? transaction_record_model_1.default.find({ userId }).populate("userId", "userName userId")
                : transaction_record_model_1.default.find().populate("userId", "userName userId");
            const listFeature = new api_features_util_1.ApiFeatures(lisQuery, queryString)
                .searching([""])
                .sorting(sorting)
                .fieldsLimiting()
                .pagination();
            const count = yield countFeature.query;
            const list = yield listFeature.query;
            return { list, page, limit, count };
        });
    }
    changePassword(passwordCurrent, adminId, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.default.findById(adminId);
            // const isPasswordCurrentCorrect = await new Auth().comparePassword(passwordCurrent, user.password);
            // if (!isPasswordCurrentCorrect) {
            //   return ResponseHelper.badRequest(res, res.__('incorrect_password'));
            // }
            const encryptedPassword = yield new auth_util_1.Auth().encryptPassword(passwordCurrent);
            user.password = encryptedPassword;
            yield user.save();
            return { user };
        });
    }
    /**
     * @description get user by id
     * @param id {String} user id for fetching user
     * @returns {Promise<UserInterface>} user data by id
     */
    findUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const userData = yield user_model_1.default.findById(id);
            return userData;
        });
    }
}
exports.default = new UserService();
