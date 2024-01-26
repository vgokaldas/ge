import { Request, Response } from 'express';
import DataDog from '../utils/logger.util';
import { AdminInterface } from './admin.interface';
import { SessionInterface } from './session.interface';
import { UserInterface } from './user.interface';
export interface ReqInterface extends Request {
    startTime: number;
    admin?: AdminInterface;
    user?: UserInterface;
    files?: any;
    deviceType?: string;
    session?: SessionInterface;
}
/**
 * @interface
 *
 */
export interface ResInterface extends Response {
    /**
     * @type {(message: string) => string} translation message
     */
    __: (message: string) => string;
    logMsg: string;
    logger: DataDog;
}
export interface LogInterface extends Document {
    status: number;
    message: string;
    execTime: number;
    data: any;
}
