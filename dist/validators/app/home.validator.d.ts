import { NextFunction } from "express";
import { ReqInterface, ResInterface } from "../../interfaces/req.interface";
declare class HomeValidator {
    nearBuinesses(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
}
declare const _default: HomeValidator;
export default _default;
