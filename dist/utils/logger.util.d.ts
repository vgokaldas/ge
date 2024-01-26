import { ReqInterface } from '../interfaces/req.interface';
import winston = require('winston');
declare class DataDog {
    api: any;
    source: any;
    logger: winston.Logger;
    req: ReqInterface;
    constructor(req: ReqInterface);
    /**
     * @description log errors
     * @param message
     * @param error
     * @returns void
     */
    error(message: string, error?: any): void;
    /**
     * @description log information
     * @param message
     * @param data
     * @returns void
     */
    info(message: string, data?: any): void;
    /**
     * @description log warnings
     * @param message
     * @param data
     * @returns void
     */
    warn(message: string, data?: any): void;
    /**
     * @description debug logs
     * @param message
     * @param data
     * @returns void
     */
    debug(message: string, data?: any): void;
    /**
     * @description success logs
     * @param message
     * @param execTime
     * @returns void
     */
    success(message: string, execTime: number): void;
}
export default DataDog;
