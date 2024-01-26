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
class BusinessValidator {
    addBusiness(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = Joi.object().keys({
                name: Joi.string().required(),
                url: Joi.string().required(),
                type: Joi.string().required(),
                address: Joi.string().required(),
                email: Joi.string().required(),
                phoneNumber: Joi.string().required(),
                description: Joi.string().required(),
                openingTiming: Joi.string().required(),
                logo: Joi.any().required(),
                longitude: Joi.number().required(),
                latitude: Joi.number().required(),
                workingDays: Joi.any().required(),
                video: Joi.any().required()
            });
            const isValid = yield (0, joi_validate_helper_1.validate)(Object.assign(Object.assign({}, req.body), req.files), res, schema);
            if (isValid) {
                next();
            }
        });
    }
}
exports.default = new BusinessValidator();
