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
class AttributeValidator {
    add(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = Joi.object().keys({
                categoryId: Joi.string().trim().required(),
                name: Joi.string().trim().required(),
                description: Joi.string().trim().required(),
                addAccess: Joi.boolean().optional(),
                values: Joi.array().items(Joi.string().required())
            });
            const isValid = yield (0, joi_validate_helper_1.validate)(req.body, res, schema);
            if (isValid) {
                next();
            }
        });
    }
    updateAttributeValue(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const schema = Joi.object().keys({
                    name: Joi.string().required()
                });
                const isValid = yield (0, joi_validate_helper_1.validate)(req.body, res, schema);
                if (isValid) {
                    next();
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = new AttributeValidator();
