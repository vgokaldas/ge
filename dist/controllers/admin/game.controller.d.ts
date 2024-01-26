import { NextFunction } from "express";
import { ReqInterface, ResInterface } from "../../interfaces/req.interface";
declare class GameController {
    add(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    list(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    status(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    edit(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
}
declare const _default: GameController;
export default _default;
