import { NextFunction } from "express";
import Joi = require("joi");
import { validate } from "../../helpers/joi-validate.helper";
import { ReqInterface, ResInterface } from "../../interfaces/req.interface";

class CategoryValidator{

    async addCategory(req:ReqInterface,res:ResInterface,next:NextFunction){
        const schema = Joi.object().keys({
           name:Joi.string().required(),
           image:Joi.any().required()
        })
        const isValid = await validate({ ...req.body, ...req.files }, res, schema);
        if (isValid) {
            next();
        }
    }

    async editCategory(req:ReqInterface,res:ResInterface,next:NextFunction){
        const schema = Joi.object().keys({
           name:Joi.string().required(),
           categoryId:Joi.string().required()
        })
        const isValid = await validate(req.body, res, schema);
        if (isValid) {
            next();
        }
    }

}

export default new CategoryValidator()