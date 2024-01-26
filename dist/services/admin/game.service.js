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
const api_features_util_1 = require("../../utils/api-features.util");
class GameService {
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
            // let skip = (page - 1) * limit;
            const countQuery = game_model_1.default.find({});
            const sorting = queryString.sort || '-createdAt';
            const countFeature = new api_features_util_1.ApiFeatures(countQuery, queryString)
                .filtering()
                .searching(['name'])
                .sorting(sorting)
                .getCount();
            const lisQuery = game_model_1.default.find({});
            const listFeature = new api_features_util_1.ApiFeatures(lisQuery, queryString)
                .filtering()
                .searching(['name'])
                .sorting(sorting)
                .fieldsLimiting()
                .pagination();
            const count = yield countFeature.query;
            const list = yield listFeature.query;
            return { list, page, limit, count };
        });
    }
}
exports.default = new GameService();
