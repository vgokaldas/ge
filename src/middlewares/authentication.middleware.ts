import { NextFunction } from "express";
import ResponseHelper from "../helpers/response.helper";
import { ReqInterface, ResInterface } from "../interfaces/req.interface";
import AdminModel from "../models/admin.model";
import UserModel from "../models/user.model";
import { Auth } from "../utils/auth.util";


class Authentication {
    async admin(req: ReqInterface, res: ResInterface, next: NextFunction) {
        try {

            let token;
            if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
                token = req.headers.authorization.split(' ')[1];
            }

            if (!token) {
                return ResponseHelper.unAuthenticated(res, res.__('authentication_required'), {}, 'TOKEN_REQUIRED')
            }

            const decoded: any = await new Auth().decodeJwt(token);

            const admin: any = await AdminModel.findById(decoded.id);

            if (!admin) {

                return ResponseHelper.unAuthenticated(res, res.__('jwt_invalid_token'));
            }

            if (admin.passwordChangedAt && decoded.iat < admin.passwordChangedAt.getTime() / 1000) {
                return ResponseHelper.unAuthenticated(res, res.__('admin_changed_password_recently'), {}, 'OLD_PASSWORD');
            }

            req.admin = admin;
            next();

        } catch (err) {
            return next(err);
        }
    }

    async user(req: ReqInterface, res: ResInterface, next: NextFunction) {
        try {

            let token;
            if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
                token = req.headers.authorization.split(' ')[1];
            }

            if (!token) {
                return ResponseHelper.unAuthenticated(res, res.__('authentication_required'), {}, 'TOKEN_REQUIRED')
            }

            const decoded: any = await new Auth().decodeJwt(token);

            const user: any = await UserModel.findById(decoded.id);

            if (!user) {

                return ResponseHelper.unAuthenticated(res, res.__('jwt_invalid_token'));
            }

            if (user.passwordChangedAt && decoded.iat < user.passwordChangedAt.getTime() / 1000) {
                return ResponseHelper.unAuthenticated(res, res.__('user_changed_password_recently'), {}, 'OLD_PASSWORD');
            }

            req.user = user;
            next();

        } catch (err) {
            return next(err);
        }
    }

    // async user(req: ReqInterface, res: ResInterface, next: NextFunction) {
    //     try {

    //         let token;
    //         if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    //             token = req.headers.authorization.split(' ')[1];
    //         }

    //         if (!token) {
    //             return ResponseHelper.unAuthenticated(res, res.__('authentication_required'), {}, 'TOKEN_REQUIRED')
    //         }

    //         const decoded = await new Auth().decodeJwt(token);
    //         const session: any = await SessionModel.findById(decoded.id).populate('user');

    //         if (!session) {
    //             return ResponseHelper.unAuthenticated(res, res.__('jwt_invalid_token'));
    //         }
    //         req.session = req.session;
    //         if (!session.isActive) {
    //             return ResponseHelper.expired(res, res.__('session_expired'));
    //         }
    //         const user = session.user as UserInterface;
    //         req.user = user;
    //         next();

    //     } catch (err) {
    //         return next(err);
    //     }
    // }
}

export default new Authentication();