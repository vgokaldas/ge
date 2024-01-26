import { NextFunction } from "express";
import Joi = require("joi");
import { validate } from "../../helpers/joi-validate.helper";
import { ReqInterface, ResInterface } from "../../interfaces/req.interface";

class JPValidator{

    async chooseJP(req: ReqInterface, res: ResInterface, next: NextFunction) {
        const schema = Joi.object().keys({
            jpType: Joi.string().required(),
            jpScore: Joi.number().required(),
        });

        const isValid = await validate(req.body, res, schema);
        if (isValid) {
            next();
        }

    }

}

export default new JPValidator()