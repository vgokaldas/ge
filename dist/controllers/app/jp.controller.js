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
class JackPortController {
    /**
       * @api {get} /api/app/jp/get-jack-port-detail Jack Port Details
       * @apiHeader {String} App-Version Version Code 1.0.0.
       * @apiVersion 1.0.0
       * @apiName get-jack-port-detail
       * @apiGroup App-Jackport
       * @apiSuccessExample {json} Success-Response:
         {"status":200,"statusText":"SUCCESS","message":"game list","data":{"execTime":1510}}
  */
    getJackPortDetail(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const jp = yield jack_port_model_1.default.findOne({ userId: req.user.parentId });
                return response_helper_1.default.ok(res, res.__('jack port detail'), jp);
            }
            catch (error) {
                next(error);
            }
        });
    }
    chooseJP(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { jpType, jpScore } = req.body;
            try {
                const userId = req.user.id;
                yield jack_port_records_model_1.default.create({ userId, jpType, jpScore });
                return response_helper_1.default.ok(res, res.__('jack port recorded'), {});
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = new JackPortController();
