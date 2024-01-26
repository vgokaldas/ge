import { NextFunction } from "express";
import { ReqInterface, ResInterface } from "../../interfaces/req.interface";
import ResponseHelper from "../../helpers/response.helper";
import JPModel from "../../models/jack-port.model";
import JpRecordModel from "../../models/jack-port-records.model";
import { ApiFeatures } from "../../utils/api-features.util";

class JackPortController {

    async updateJP(req: ReqInterface, res: ResInterface, next: NextFunction) {
        const {GrandScore,MajorScore,MinorScore,MiniScore,MiniShareNum,MaxShareNum} = req.body
        try {
            if(GrandScore < 1500 || GrandScore > 5000) return ResponseHelper.forbidden(res,res.__('Range 1500 to 5000 '));
            if(MajorScore < 500 || MajorScore > 2500) return ResponseHelper.forbidden(res,res.__('Range 1500 to 5000 '));
            if(MinorScore < 100 || MinorScore > 200) return ResponseHelper.forbidden(res,res.__('Range 1500 to 5000 '));
            if(MiniScore < 20 || MiniScore > 50) return ResponseHelper.forbidden(res,res.__('Range 1500 to 5000 '));
            if(MiniShareNum < 1 || MiniShareNum > 6) return ResponseHelper.forbidden(res,res.__('Range 1500 to 5000 '));
            if(MaxShareNum < 7 || MaxShareNum > 10) return ResponseHelper.forbidden(res,res.__('Range 1500 to 5000 '));    
             const getJp = await JPModel.findOne({userId:req.user.id})
             if(getJp){
                await JPModel.findOneAndUpdate({userId:req.user.id},{GrandScore,MajorScore,MinorScore,MiniScore,MiniShareNum,MaxShareNum});
             }
             else {
                 await JPModel.create({GrandScore,MajorScore,MinorScore,MiniScore,MiniShareNum,MaxShareNum,userId:req.user.id})
             }
             
            
            return ResponseHelper.ok(res,res.__('jack port updated successfully'),{})
    
        } catch (error) {
            next(error);
        }
    }
    async jpRecord(req:any,res:any,next:NextFunction){
        try{
            const queryString = req.query
            const page = queryString.page * 1 || 1;
            const limit = queryString.limit * 1 || 10;
            const userId = req.query.userId
            // let skip = (page - 1) * limit;

            
    
            const countQuery = userId ? JpRecordModel.find({userId}) : JpRecordModel.find().populate("userId");
            const sorting = queryString.sort || '-createdAt';
            const countFeature = new ApiFeatures(countQuery, queryString)
                .filtering()
                .searching(['jpType'])
                .sorting(sorting)
                .getCount();
    
            const lisQuery =  userId ? JpRecordModel.find({userId}).populate("userId") : JpRecordModel.find().populate("userId");
            const listFeature = new ApiFeatures(lisQuery, queryString)
                .filtering()
                .searching(['jpType'])
                .sorting(sorting)
                .fieldsLimiting()
                .pagination();
    
            const count = await countFeature.query;
            const list = await listFeature.query;
            return ResponseHelper.ok(res,res.__('jack port records'),{list, page, limit,count})

        }catch (error) {
            next(error);
        }
    }
    async getJackPortDetail(req: ReqInterface, res: ResInterface, next: NextFunction) {
        try {
            const jp = await JPModel.findOne({userId:req.user.id});
            return ResponseHelper.ok(res,res.__('jack port detail'),jp)
    
        } catch (error) {
            next(error);
        }
    }

}

export default new JackPortController();









