import { NextFunction } from "express";
import ResponseHelper from "../../helpers/response.helper";
import { ReqInterface, ResInterface } from "../../interfaces/req.interface";
import UserModel from "../../models/user.model";
import { Auth } from "../../utils/auth.util";
import UserService from "../../services/admin/user.service"
import TransactionRecordModel from "../../models/transaction-record.model";
class UserController {


    async add(req: ReqInterface, res: ResInterface, next: NextFunction) {
        const {userName,nickName,password,roleType,balance} = req.body
        try {
            if(await UserModel.exists({userName})) return ResponseHelper.conflict(res,res.__('user_already_exist'));
            const encryptedPassword = await new Auth().encryptPassword(password);
            UserModel.create({roleType,userName,nickName,balance,password:encryptedPassword,userId:await new Auth().generateUserId()});
            return ResponseHelper.created(res,res.__('user_added_successfully'),{})
    
        } catch (error) {
            next(error);
        }
    }

    async edit(req: ReqInterface, res: ResInterface, next: NextFunction) {
        const {userName,nickName} = req.body
        const userId = req.params.id
        try {
            const user = await UserModel.findOne({_id:userId});
            user.userName = userName ? userName : user.userName;
            user.nickName = nickName ? nickName : user.nickName;
            user.save();
            return ResponseHelper.ok(res,res.__('user edited successfully'),{user})
    
        } catch (error) {
            next(error);
        }
    }

    async status(req: ReqInterface, res: ResInterface, next: NextFunction) {
        try {
            const userId = req.params.id;
            const user = await UserModel.findOne({_id:userId});
            user.isActive = !user.isActive
            user.save();
            return ResponseHelper.ok(res, res.__('user status change successfully'), user);

        } catch (error) {
            next(error)
        }
    }

    async list(req: ReqInterface, res: ResInterface, next: NextFunction) {
        try {
            const queryString = req.query;
            const user = await UserService.list(queryString);
            res.logMsg = `User list fetched successfully`;
            return ResponseHelper.ok(res, res.__('user_list'), user);

        } catch (error) {
            next(error)
        }
    }

    async changePassword(req: ReqInterface, res: ResInterface, next: NextFunction) {
        const {passwordCurrent} = req.body
        try {
          const userId = req.params.id

          const data = await UserService.changePassword(passwordCurrent,userId,res);
          if(data){
            res.logMsg = 'User password changed successfully'
    
          return ResponseHelper.ok(res, res.__('user password changed'), {});
          }
    
        } catch (err) {
          next(err);
        }
      }

    async recharge(req: ReqInterface, res: ResInterface, next: NextFunction) {
        try {
            const {amount,userId,currentBalance} = req.body;
            const user = await UserModel.findOne({_id:userId});
            const rechargeAmount = Number(user?.balance+amount)
            user.balance = rechargeAmount;
            await user.save();
            await TransactionRecordModel.create({userId,before:currentBalance,recharge:amount,after:rechargeAmount})
            return ResponseHelper.ok(res, res.__('user_recharge_successfully'), { user });

        } catch (error) {
            next(error)
        }

    }

    async redeem(req: ReqInterface, res: ResInterface, next: NextFunction) {
        try {
            const {amount,userId,currentBalance} = req.body;
            const user = await UserModel.findOne({_id:userId});
            const redeemAmount = Number(user?.balance-amount);
            user.balance = redeemAmount
            await user.save();
            await TransactionRecordModel.create({userId,before:currentBalance,redeem:amount,after:redeemAmount})
            return ResponseHelper.ok(res, res.__('user_redeem_successfully'), { user });

        } catch (error) {
            next(error)
        }
        
    }

    async gameRecords(req: ReqInterface, res: ResInterface, next: NextFunction) {
        try {
            const queryString = req.query;
            // if(!queryString.userId) return ResponseHelper.forbidden(res,res.__('userId_required'))
            const gameRecord = await UserService.gameRecords(queryString);
            res.logMsg = `User game record fetched successfully`;
            return ResponseHelper.ok(res, res.__('user_game_records'), gameRecord);

        } catch (error) {
            next(error)
        }
    }

    async transactionRecords(req: ReqInterface, res: ResInterface, next: NextFunction) {
        try {
            const queryString = req.query;
            // need to work on transaction summary count object
            const gameRecord = await UserService.transactionRecords(queryString);
            res.logMsg = `transaction record fetched successfully`;
            return ResponseHelper.ok(res, res.__('transaction_game_records'), gameRecord);

        } catch (error) {
            next(error)
        }
    }
}
export default new UserController();