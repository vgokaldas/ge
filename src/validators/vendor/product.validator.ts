import { NextFunction } from "express";
import Joi = require("joi");
import { validate } from "../../helpers/joi-validate.helper";
import { ReqInterface, ResInterface } from "../../interfaces/req.interface";

class ProductValidator {

    async addStage1(req: ReqInterface, res: ResInterface, next: NextFunction) {
        const schema = Joi.object().keys({
            name: Joi.string().required(),
            price: Joi.number().required(),
            discountPercent: Joi.number().optional(),
            description: Joi.string().optional(),
            gender: Joi.string().required(),
            productId:Joi.string().optional()
        })
        const isValid = await validate({ ...req.body, ...req.files }, res, schema);
        if (isValid) {
            next();
        }
    }
    async addStage2(req: ReqInterface, res: ResInterface, next: NextFunction) {
        const schema = Joi.object().keys({
            categoryId: Joi.string().required(),
            subcategoryId: Joi.string().required(),
            productcategoryId: Joi.string().required(),
            attributes: Joi.any().required()
        })
        const isValid = await validate({ ...req.body, ...req.files }, res, schema);
        if (isValid) {
            next();
        }
    }
    async addStage3(req: ReqInterface, res: ResInterface, next: NextFunction) {
        const schema = Joi.object().keys({
            productId:Joi.string().required(),
            images: Joi.any().required(),
        })
        const isValid = await validate({ ...req.body, ...req.files }, res, schema);
        if (isValid) {
            next();
        }
    }

    async editStage1(req: ReqInterface, res: ResInterface, next: NextFunction) {
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
        })
        const isValid = await validate({ ...req.body, ...req.files }, res, schema);
        if (isValid) {
            next();
        }
    }

}

export default new ProductValidator()