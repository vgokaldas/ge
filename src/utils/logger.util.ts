import { createLogger, format } from 'winston';
import { ReqInterface } from '../interfaces/req.interface';
import winston = require('winston');
import path = require('path');
const { combine, timestamp, prettyPrint } = format;

class DataDog {
    api: any;
    source: any;
    logger: winston.Logger;
    req: ReqInterface;

    constructor(req: ReqInterface) {
        try {
            this.req = req;
            if (req.hasOwnProperty('originalUrl')) {
                this.api = req.originalUrl;
            } else {
                this.api = req.url;
            }
            this.source = "NodeJS";
            const logDirectoryPath = path.resolve(process.cwd() + '/logs');
            this.logger = createLogger({
                // level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
                format: combine(
                    timestamp(),
                    format.json(),
                    prettyPrint(),
                    format.metadata({ fillExcept: ['message', 'level', 'timestamp'] })
                ),
                transports:
                    [
                        //
                        // - Write to all logs with level `info` and below to `combined.log` 
                        // - Write all logs error (and below) to `error.log`.
                        //
                        new winston.transports.Console(),

                        new winston.transports.File({ filename: `${logDirectoryPath}/error.log`, level: 'error' }),
                        new winston.transports.File({ filename: `${logDirectoryPath}/combined.log`, level: 'info' }),
                        new winston.transports.File({ filename: `${logDirectoryPath}/warn.log`, level: 'warn' }),
                        new winston.transports.File({ filename: `${logDirectoryPath}/debug.log`, level: 'debug' }),
                    ],
            });
        } catch (error) {
            console.log("error in constructing logger", error);
        }


    }

    /**
     * @description log errors
     * @param message 
     * @param error 
     * @returns void
     */
    error(message: string, error: any = {}): void {
        if (!this.logger) {
            console.log(message, error);
            return;
        }

        if (error.hasOwnProperty('message')) {
            this.logger.error({
                api: this.api,
                message: message,
                error: error
            });
            return;
        }
        this.logger.error({
            api: this.api,
            user: this.req?.user?._id || 'guest',
            session: this.req?.session?._id || 'guest',
            message: message,
            error: error
        });
    }

    /**
     * @description log information
     * @param message 
     * @param data 
     * @returns void
     */
    info(message: string, data: any = {}): void {
        if (!this.logger) {
            console.log(message, data);
            return;
        }
        this.logger.info({
            api: this.api,
            message: message,
            data: data
        });
    }

    /**
     * @description log warnings
     * @param message 
     * @param data 
     * @returns void
     */
    warn(message: string, data: any = {}): void {
        if (!this.logger) {
            console.log(message, data);
            return;
        }
        this.logger.warn({
            api: this.api,
            message: message,
            data: data
        });
    }


    /**
     * @description debug logs
     * @param message 
     * @param data 
     * @returns void
     */
    debug(message: string, data: any = {}): void {
        if (!this.logger) {
            console.log(message, data);
            return;
        }
        this.logger.debug({
            api: this.api,
            message: message,
            data: data
        });
    }


    /**
     * @description success logs
     * @param message 
     * @param execTime 
     * @returns void
     */
    success(message: string, execTime: number): void {
        if (!this.logger) {
            console.log(message);
            return;
        }
        this.logger.info({
            api: this.api,
            message: message,
            execTime,
        });
    }


}

export default DataDog;