import { NextFunction } from 'express';
import * as Joi from 'joi';
import { validate } from '../../helpers/joi-validate.helper';
import { ReqInterface, ResInterface } from '../../interfaces/req.interface';

class AuthValidator {
    async signup(req: ReqInterface, res: ResInterface, next: NextFunction) {
        const schema = Joi.object().keys({
            businessName:Joi.string().required(),
            phoneNumber:Joi.string().required(),
            countryCode:Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            subscriptionId:Joi.string().required()
        });

        const isValid = await validate(req.body, res, schema);
        if (isValid) {
            next();
        }

    }
    async login(req: ReqInterface, res: ResInterface, next: NextFunction) {
        const schema = Joi.object().keys({
            email: Joi.string().required(),
            password: Joi.string().required()
        });

        const isValid = await validate(req.body, res, schema);
        if (isValid) {
            next();
        }

    }

    async forgotPassword(req: ReqInterface, res: ResInterface, next: NextFunction) {
        const schema = Joi.object().keys({
            email: Joi.string().email().required()
        });

        const isValid = await validate(req.body, res, schema);
        if (isValid) {
            next();
        }

    }

    async changePassword(req: ReqInterface, res: ResInterface, next: NextFunction) {
        const schema = Joi.object().keys({
            password: Joi.string().required(),
            passwordCurrent: Joi.string().required()
        });

        const isValid = await validate(req.body, res, schema);
        if (isValid) {
            next();
        }

    }
   
}

export default new AuthValidator();