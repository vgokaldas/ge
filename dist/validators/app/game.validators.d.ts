import { NextFunction } from "express";
import { ReqInterface, ResInterface } from "../../interfaces/req.interface";
declare class GameValidator {
    updateScore(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    coinUpdate(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
}
declare const _default: GameValidator;
export default _default;
