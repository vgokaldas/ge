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
class ProductValidator {
    addStage1(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = Joi.object().keys({
                name: Joi.string().required(),
                price: Joi.number().required(),
                discountPercent: Joi.number().optional(),
                description: Joi.string().optional(),
                gender: Joi.string().required(),
                productId: Joi.string().optional()
            });
            const isValid = yield (0, joi_validate_helper_1.validate)(Object.assign(Object.assign({}, req.body), req.files), res, schema);
            if (isValid) {
                next();
            }
        });
    }
    addStage2(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = Joi.object().keys({
                categoryId: Joi.string().required(),
                subcategoryId: Joi.string().required(),
                productcategoryId: Joi.string().required(),
                attributes: Joi.any().required()
            });
            const isValid = yield (0, joi_validate_helper_1.validate)(Object.assign(Object.assign({}, req.body), req.files), res, schema);
            if (isValid) {
                next();
            }
        });
    }
    addStage3(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = Joi.object().keys({
                productId: Joi.string().required(),
                images: Joi.any().required(),
            });
            const isValid = yield (0, joi_validate_helper_1.validate)(Object.assign(Object.assign({}, req.body), req.files), res, schema);
            if (isValid) {
                next();
            }
        });
    }
    editStage1(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = Joi.object().keys({
                name: Joi.string().required(),
                price: Joi.number().required(),
                discountPercent: Joi.number().optional(),
                description: Joi.string().optional(),
                gender: Joi.string().required(),
                categoryId: Joi.string().required(),
                subcategoryId: Joi.string().required(),
                productcategoryId: Joi.string().required(),
                attributes: Joi.any().required()
            });
            const isValid = yield (0, joi_validate_helper_1.validate)(Object.assign(Object.assign({}, req.body), req.files), res, schema);
            if (isValid) {
                next();
            }
        });
    }
}
exports.default = new ProductValidator();
