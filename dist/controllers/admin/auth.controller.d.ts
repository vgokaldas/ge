import { NextFunction } from "express";
import { ReqInterface, ResInterface } from "../../interfaces/req.interface";
declare class AuthController {
    login(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    create(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    changePassword(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    getProfile(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    updateProfile(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    forgotPassword(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    verifyOtp(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    resetPassword(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
}
declare const _default: AuthController;
export default _default;
