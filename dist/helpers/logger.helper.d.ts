import { ReqInterface, ResInterface } from "../interfaces/req.interface";
import { NextFunction } from "express";
export declare const logger: (req: ReqInterface, res: ResInterface, next: NextFunction) => void;
