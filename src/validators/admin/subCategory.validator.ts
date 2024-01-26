import { NextFunction } from "express";
import Joi = require("joi");
import { validate } from "../../helpers/joi-validate.helper";
import { ReqInterface, ResInterface } from "../../interfaces/req.interface";

class SubCategoryValidator{

    async addSubCategory(req:ReqInterface,res:ResInterface,next:NextFunction){
        const schema = Joi.object().keys({
           name:Joi.string().required(),
           image:Joi.any().required(),
           categoryId:Joi.string().required()
        })
        const isValid = await validate({ ...req.body, ...req.files }, res, schema);
        if (isValid) {
            next();
        }
    }

    async editSubCategory(req:ReqInterface,res:ResInterface,next:NextFunction){
        const schema = Joi.object().keys({
           name:Joi.string().required(),
           subCategoryId:Joi.string().required(),
           image:Joi.any().optional(),
           categoryId:Joi.string().required()
        })
        const isValid = await validate({ ...req.body, ...req.files }, res, schema);
        if (isValid) {
            next();
        }
    }

}

export default new SubCategoryValidator()