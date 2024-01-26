import { NextFunction } from "express";
import { ReqInterface, ResInterface } from "../../interfaces/req.interface";
declare class CategoryValidator {
    addCategory(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    editCategory(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
}
declare const _default: CategoryValidator;
export default _default;
