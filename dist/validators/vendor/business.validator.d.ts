import { NextFunction } from "express";
import { ReqInterface, ResInterface } from "../../interfaces/req.interface";
declare class BusinessValidator {
    addBusiness(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
}
declare const _default: BusinessValidator;
export default _default;
