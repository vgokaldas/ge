import { NextFunction } from "express";
import { ReqInterface, ResInterface } from "../../interfaces/req.interface";
declare class SubCategoryValidator {
    addSubCategory(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    editSubCategory(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
}
declare const _default: SubCategoryValidator;
export default _default;
