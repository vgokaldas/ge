import { NextFunction } from 'express';
import { ReqInterface, ResInterface } from '../../interfaces/req.interface';
declare class AuthValidator {
    signup(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    login(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    forgotPassword(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    changePassword(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
}
declare const _default: AuthValidator;
export default _default;
