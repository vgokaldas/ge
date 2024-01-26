import { NextFunction } from "express";
import { ReqInterface, ResInterface } from "../../interfaces/req.interface";
declare class JPValidator {
    chooseJP(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
}
declare const _default: JPValidator;
export default _default;
