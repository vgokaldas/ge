import { NextFunction } from "express";
import Joi = require("joi");
import { validate } from "../../helpers/joi-validate.helper";
import { ReqInterface, ResInterface } from "../../interfaces/req.interface";

class BusinessValidator{

    async addBusiness(req:ReqInterface,res:ResInterface,next:NextFunction){
        const schema = Joi.object().keys({
           name:Joi.string().required(),
           url:Joi.string().required(),
           type:Joi.string().required(),
           address:Joi.string().required(),
           email:Joi.string().required(),
           phoneNumber:Joi.string().required(),
           description:Joi.string().required(),
           openingTiming:Joi.string().required(),
           logo:Joi.any().required(),
           longitude:Joi.number().required(),
           latitude:Joi.number().required(),
           workingDays:Joi.any().required(),
           video:Joi.any().required()
        })
        const isValid = await validate({ ...req.body, ...req.files }, res, schema);
        if (isValid) {
            next();
        }
    }

}

export default new BusinessValidator()