import { NextFunction } from "express";
import { ReqInterface, ResInterface } from "../../interfaces/req.interface";
declare class JackPortController {
    updateJP(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    jpRecord(req: any, res: any, next: NextFunction): Promise<void>;
    getJackPortDetail(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
}
declare const _default: JackPortController;
export default _default;
