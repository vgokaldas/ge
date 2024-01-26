import { NextFunction } from "express";
import * as Joi from 'joi';
import { validate } from "../../helpers/joi-validate.helper";
import { ReqInterface, ResInterface } from "../../interfaces/req.interface";


class AttributeValidator {
    async add(req: ReqInterface, res: ResInterface, next: NextFunction) {
        const schema = Joi.object().keys({
            categoryId: Joi.string().trim().required(),
            name: Joi.string().trim().required(),
            description: Joi.string().trim().required(),
            addAccess: Joi.boolean().optional(),
            values: Joi.array().items(
                Joi.string().required()
            )
        });
        const isValid = await validate(req.body, res, schema);
        if (isValid) {
            next();
        }
    }


    async updateAttributeValue(req: ReqInterface, res: ResInterface, next: NextFunction) {
        try {
            const schema = Joi.object().keys({
                name: Joi.string().required()
            });
            const isValid = await validate(req.body, res, schema);
            if (isValid) {
                next();
            }
        } catch (error) {
            next(error);
        }
    }

}

export default new AttributeValidator();