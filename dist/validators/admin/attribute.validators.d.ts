import { NextFunction } from "express";
import { ReqInterface, ResInterface } from "../../interfaces/req.interface";
declare class AttributeValidator {
    add(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    updateAttributeValue(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
}
declare const _default: AttributeValidator;
export default _default;
