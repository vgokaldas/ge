import { NextFunction } from "express";
import { ReqInterface, ResInterface } from "../../interfaces/req.interface";
declare class JackPortController {
    /**
       * @api {get} /api/app/jp/get-jack-port-detail Jack Port Details
       * @apiHeader {String} App-Version Version Code 1.0.0.
       * @apiVersion 1.0.0
       * @apiName get-jack-port-detail
       * @apiGroup App-Jackport
       * @apiSuccessExample {json} Success-Response:
         {"status":200,"statusText":"SUCCESS","message":"game list","data":{"execTime":1510}}
  */
    getJackPortDetail(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    chooseJP(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
}
declare const _default: JackPortController;
export default _default;
