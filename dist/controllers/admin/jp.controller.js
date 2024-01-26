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
const jack_port_model_1 = require("../../models/jack-port.model");
const jack_port_records_model_1 = require("../../models/jack-port-records.model");
const api_features_util_1 = require("../../utils/api-features.util");
class JackPortController {
    updateJP(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { GrandScore, MajorScore, MinorScore, MiniScore, MiniShareNum, MaxShareNum } = req.body;
            try {
                if (GrandScore < 1500 || GrandScore > 5000)
                    return response_helper_1.default.forbidden(res, res.__('Range 1500 to 5000 '));
                if (MajorScore < 500 || MajorScore > 2500)
                    return response_helper_1.default.forbidden(res, res.__('Range 1500 to 5000 '));
                if (MinorScore < 100 || MinorScore > 200)
                    return response_helper_1.default.forbidden(res, res.__('Range 1500 to 5000 '));
                if (MiniScore < 20 || MiniScore > 50)
                    return response_helper_1.default.forbidden(res, res.__('Range 1500 to 5000 '));
                if (MiniShareNum < 1 || MiniShareNum > 6)
                    return response_helper_1.default.forbidden(res, res.__('Range 1500 to 5000 '));
                if (MaxShareNum < 7 || MaxShareNum > 10)
                    return response_helper_1.default.forbidden(res, res.__('Range 1500 to 5000 '));
                const getJp = yield jack_port_model_1.default.findOne({ userId: req.user.id });
                if (getJp) {
                    yield jack_port_model_1.default.findOneAndUpdate({ userId: req.user.id }, { GrandScore, MajorScore, MinorScore, MiniScore, MiniShareNum, MaxShareNum });
                }
                else {
                    yield jack_port_model_1.default.create({ GrandScore, MajorScore, MinorScore, MiniScore, MiniShareNum, MaxShareNum, userId: req.user.id });
                }
                return response_helper_1.default.ok(res, res.__('jack port updated successfully'), {});
            }
            catch (error) {
                next(error);
            }
        });
    }
    jpRecord(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const queryString = req.query;
                const page = queryString.page * 1 || 1;
                const limit = queryString.limit * 1 || 10;
                const userId = req.query.userId;
                // let skip = (page - 1) * limit;
                const countQuery = userId ? jack_port_records_model_1.default.find({ userId }) : jack_port_records_model_1.default.find().populate("userId");
                const sorting = queryString.sort || '-createdAt';
                const countFeature = new api_features_util_1.ApiFeatures(countQuery, queryString)
                    .filtering()
                    .searching(['jpType'])
                    .sorting(sorting)
                    .getCount();
                const lisQuery = userId ? jack_port_records_model_1.default.find({ userId }).populate("userId") : jack_port_records_model_1.default.find().populate("userId");
                const listFeature = new api_features_util_1.ApiFeatures(lisQuery, queryString)
                    .filtering()
                    .searching(['jpType'])
                    .sorting(sorting)
                    .fieldsLimiting()
                    .pagination();
                const count = yield countFeature.query;
                const list = yield listFeature.query;
                return response_helper_1.default.ok(res, res.__('jack port records'), { list, page, limit, count });
            }
            catch (error) {
                next(error);
            }
        });
    }
    getJackPortDetail(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const jp = yield jack_port_model_1.default.findOne({ userId: req.user.id });
                return response_helper_1.default.ok(res, res.__('jack port detail'), jp);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = new JackPortController();
