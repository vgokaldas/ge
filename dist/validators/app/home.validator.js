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
const Joi = require("joi");
const joi_validate_helper_1 = require("../../helpers/joi-validate.helper");
class HomeValidator {
    nearBuinesses(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = Joi.object().keys({
                lat: Joi.string().required(),
                lng: Joi.string().required(),
                page: Joi.any().required(),
                limit: Joi.any().optional(),
                search: Joi.any().optional()
            });
            const isValid = yield (0, joi_validate_helper_1.validate)(req.query, res, schema);
            if (isValid) {
                next();
            }
        });
    }
}
exports.default = new HomeValidator();
