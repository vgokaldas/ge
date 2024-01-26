import { NextFunction } from "express";
import Joi = require("joi");
import { validate } from "../../helpers/joi-validate.helper";
import { ReqInterface, ResInterface } from "../../interfaces/req.interface";

class HomeValidator{

    async nearBuinesses(req: ReqInterface, res: ResInterface, next: NextFunction) {
        const schema = Joi.object().keys({
            lat: Joi.string().required(),
            lng: Joi.string().required(),
            page:Joi.any().required(),
            limit:Joi.any().optional(),
            search:Joi.any().optional() 
        });

        const isValid = await validate(req.query, res, schema);
        if (isValid) {
            next();
        }

    }

}

export default new HomeValidator()