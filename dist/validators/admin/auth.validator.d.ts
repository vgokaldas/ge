import { NextFunction } from 'express';
import { ReqInterface, ResInterface } from '../../interfaces/req.interface';
declare class AuthValidator {
    login(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    changePassword(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    forgetPassword(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    verifyOTP(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    resetPassword(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    UserChangePassword(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
}
declare const _default: AuthValidator;
export default _default;
