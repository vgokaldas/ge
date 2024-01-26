import { ReqInterface, ResInterface } from "../interfaces/req.interface";
/**
 *
 * @param req {ReqInterface} req Object
 * @param res {ResInterface} res Object
 * @param status  {number} response status code
 * @param message {string} status message
 * @param data {any} data object send to response
 */
export declare const sendResponse: (req: ReqInterface, res: ResInterface, status: number, message: string, data?: {
    [key: string]: any;
}) => Promise<void>;
