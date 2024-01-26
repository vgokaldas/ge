
import { NextFunction } from "express";
import Joi = require("joi");
import { validate } from "../../helpers/joi-validate.helper";
import { ReqInterface, ResInterface } from "../../interfaces/req.interface";

class GameValidator{

    async updateScore(req: ReqInterface, res: ResInterface, next: NextFunction) {
        const schema = Joi.object().keys({
            score: Joi.number().required(),
            gameName: Joi.string().required(),
            balance_before_game:Joi.number().required(),
            total_played:Joi.number().required(),
            total_win:Joi.any().required(),
            recording_notes:Joi.string().required()
        });

        const isValid = await validate(req.body, res, schema);
        if (isValid) {
            next();
        }

    }
    async coinUpdate(req: ReqInterface, res: ResInterface, next: NextFunction) {
        const schema = Joi.object().keys({
            coin: Joi.number().required(),
            type: Joi.string().required(),
        });

        const isValid = await validate(req.body, res, schema);
        if (isValid) {
            next();
        }

    }

}

export default new GameValidator()