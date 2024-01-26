import { NextFunction } from "express";
import { ReqInterface, ResInterface } from "../interfaces/req.interface";
declare class Authentication {
    admin(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    user(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
}
declare const _default: Authentication;
export default _default;
