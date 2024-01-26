import { NextFunction } from "express";
import { ReqInterface, ResInterface } from "../../interfaces/req.interface";
declare class ProductValidator {
    addStage1(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    addStage2(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    addStage3(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    editStage1(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
}
declare const _default: ProductValidator;
export default _default;
