import { NextFunction } from "express";
import { ReqInterface, ResInterface } from "../../interfaces/req.interface";
import ResponseHelper from "../../helpers/response.helper";
import JPModel from "../../models/jack-port.model";
import JpRecordModel from "../../models/jack-port-records.model";

class JackPortController {

    /**
       * @api {get} /api/app/jp/get-jack-port-detail Jack Port Details
       * @apiHeader {String} App-Version Version Code 1.0.0.
       * @apiVersion 1.0.0
       * @apiName get-jack-port-detail
       * @apiGroup App-Jackport
       * @apiSuccessExample {json} Success-Response:
         {"status":200,"statusText":"SUCCESS","message":"game list","data":{"execTime":1510}}
  */

    async getJackPortDetail(req: ReqInterface, res: ResInterface, next: NextFunction) {
        
        try {
            const jp = await JPModel.findOne({userId:req.user.parentId});
            return ResponseHelper.ok(res,res.__('jack port detail'),jp)
    
        } catch (error) {
            next(error);
        }
    }
    async chooseJP(req: ReqInterface, res: ResInterface, next: NextFunction) {
            const {jpType,jpScore} = req.body
        try {
            const userId = req.user.id
            await JpRecordModel.create({userId,jpType,jpScore});
            return ResponseHelper.ok(res,res.__('jack port recorded'),{})
    
        } catch (error) {
            next(error);
        }
    }
    

}

export default new JackPortController();

