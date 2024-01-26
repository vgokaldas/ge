import { AppError } from "../utils/app-error.util";
import { NextFunction } from "express";
import { ReqInterface, ResInterface } from "../interfaces/req.interface";
export declare class ErrorHandler {
    constructor();
    globalErrorHandler(err: any, req: ReqInterface, res: ResInterface, next: NextFunction): void;
    handleJwtError(res: ResInterface): AppError;
    handleExpiredTokenError(res: ResInterface): AppError;
    handleCastError(err: any, res: ResInterface): AppError;
    sendErrTest(err: any, res: ResInterface): void;
    sendError(err: any, req: ReqInterface, res: ResInterface): void;
}
declare const _default: ErrorHandler;
export default _default;
