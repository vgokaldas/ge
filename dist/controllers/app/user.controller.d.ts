import { NextFunction } from "express";
import { ReqInterface, ResInterface } from "../../interfaces/req.interface";
declare class UserController {
    add(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    edit(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    status(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    list(req: any, res: any, next: NextFunction): Promise<void>;
    changePassword(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    recharge(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    redeem(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    gameRecords(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    transactionRecords(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    transactionRecordsub(req: any, res: any, next: NextFunction): Promise<void>;
    gameRecordsub(req: any, res: any, next: NextFunction): Promise<void>;
}
declare const _default: UserController;
export default _default;
