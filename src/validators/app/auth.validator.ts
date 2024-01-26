import { NextFunction } from 'express';
import * as Joi from 'joi';
import { validate } from '../../helpers/joi-validate.helper';
import { ReqInterface, ResInterface } from '../../interfaces/req.interface';

class AuthValidator {
    async signUp(req: ReqInterface, res: ResInterface, next: NextFunction) {
        const schema = Joi.object().keys({
           countryCode:Joi.string().required(),
           phoneNumber:Joi.string().required()
        });

        const isValid = await validate(req.body, res, schema);
        if (isValid) {
            next();
        }

    }
    async login(req: ReqInterface, res: ResInterface, next: NextFunction) {
        const schema = Joi.object().keys({
            userName:Joi.string().required(),
            password:Joi.string().required(),
type:Joi.string().allow("",null)
        });

        const isValid = await validate(req.body, res, schema);
        if (isValid) {
            next();
        }

    }
    async otpVerify(req: ReqInterface, res: ResInterface, next: NextFunction) {
        const schema = Joi.object().keys({
            countryCode:Joi.string().required(),
            phoneNumber:Joi.string().required(),
            otp:Joi.string().required()
        });

        const isValid = await validate(req.body, res, schema);
        if (isValid) {
            next();
        }

    }

    async changePassword(req: ReqInterface, res: ResInterface, next: NextFunction) {
        const schema = Joi.object().keys({
            passwordCurrent:Joi.string().required(),
            password:Joi.string().required()
        });

        const isValid = await validate(req.body, res, schema);
        if (isValid) {
            next();
        }

    }

    async forgetPassword(req: ReqInterface, res: ResInterface, next: NextFunction) {
        const schema = Joi.object().keys({
            userName: Joi.string().required(),
        });

        const isValid = await validate(req.body, res, schema);
        if (isValid) {
            next();
        }

    }
    async  verifyOTP(req: ReqInterface, res: ResInterface, next: NextFunction) {
        const schema = Joi.object().keys({
            userName: Joi.string().required(),
            otp: Joi.string().required(),
        });

        const isValid = await validate(req.body, res, schema);
        if (isValid) {
            next();
        }

    }
    async resetPassword(req: ReqInterface, res: ResInterface, next: NextFunction) {
        const schema = Joi.object().keys({
            userName: Joi.string().required(),
      password: Joi.string().required()
        });

        const isValid = await validate(req.body, res, schema);
        if (isValid) {
            next();
        }

    }

   
}

export default new AuthValidator();
