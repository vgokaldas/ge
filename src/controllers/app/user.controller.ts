import { NextFunction } from "express";
import ResponseHelper from "../../helpers/response.helper";
import { ReqInterface, ResInterface } from "../../interfaces/req.interface";
import UserModel from "../../models/user.model";
import { Auth } from "../../utils/auth.util";
import UserService from "../../services/admin/user.service";
import TransactionRecordModel from "../../models/transaction-record.model";
import { ApiFeatures } from "../../utils/api-features.util";
import { Types } from "mongoose";
import GameRecordModel from "../../models/game-record.model";
class UserController {
  async add(req: ReqInterface, res: ResInterface, next: NextFunction) {
    const { userName, nickName, password, roleType, balance } = req.body;
    try {
      const parentId = req.user.id;
      if (await UserModel.exists({ roleType, userName }))
        return ResponseHelper.conflict(res, res.__("user_already_exist"));
      const parentUser = await UserModel.findOne({ _id: parentId });
      if (parentUser?.balance < balance)
        return ResponseHelper.forbidden(
          res,
          res.__("you_have_insufficient_amount_to_recharge_user")
        );
      parentUser.balance = parentUser.balance - Number(balance);
      await parentUser.save();
      const encryptedPassword = await new Auth().encryptPassword(password);
      UserModel.create({
        roleType,
        parentId,
        balance,
        userName,
        nickName,
        password: encryptedPassword,
        userId: await new Auth().generateUserId(),
      });
      return ResponseHelper.created(res, res.__("user_added_successfully"), {});
    } catch (error) {
      next(error);
    }
  }

  async edit(req: ReqInterface, res: ResInterface, next: NextFunction) {
    const { userName, nickName } = req.body;
    const userId = req.params.id;
    try {
      const user = await UserModel.findOne({ _id: userId });
      user.userName = userName ? userName : user.userName;
      user.nickName = nickName ? nickName : user.nickName;
      user.save();
      return ResponseHelper.ok(res, res.__("user edited successfully"), {
        user,
      });
    } catch (error) {
      next(error);
    }
  }

  async status(req: ReqInterface, res: ResInterface, next: NextFunction) {
    try {
      const userId = req.params.id;
      const user = await UserModel.findOne({ _id: userId });
      user.isActive = !user.isActive;
      user.save();
      return ResponseHelper.ok(
        res,
        res.__("user status change successfully"),
        user
      );
    } catch (error) {
      next(error);
    }
  }

  async list(req: any, res: any, next: NextFunction) {
    try {
      const queryString = req.query;
      const page = queryString.page * 1 || 1;
      const limit = queryString.limit * 1 || 10;
      const roleType = queryString.roleType;
      const parentId = req.user.id;
      // let skip = (page - 1) * limit;

      const countQuery = UserModel.find({ roleType, parentId });
      const sorting = queryString.sort || "-createdAt";
      const countFeature = new ApiFeatures(countQuery, queryString)
        .filtering()
        .searching(["userName", "userId"])
        .sorting(sorting)
        .getCount();

      const lisQuery = UserModel.find({ roleType, parentId });
      const listFeature = new ApiFeatures(lisQuery, queryString)
        .filtering()
        .searching(["userName", "userId"])
        .sorting(sorting)
        .fieldsLimiting()
        .pagination();

      const count = await countFeature.query;
      const list = await listFeature.query;
      return ResponseHelper.ok(res, res.__("user_list"), {
        list,
        page,
        limit,
        count,
      });
    } catch (error) {
      next(error);
    }
  }

  async changePassword(
    req: ReqInterface,
    res: ResInterface,
    next: NextFunction
  ) {
    const { passwordCurrent } = req.body;
    try {
      const userId = req.params.id;

      const data = await UserService.changePassword(
        passwordCurrent,
        userId,
        res
      );
      if (data) {
        res.logMsg = "User password changed successfully";

        return ResponseHelper.ok(res, res.__("user password changed"), {});
      }
    } catch (err) {
      next(err);
    }
  }

  async recharge(req: ReqInterface, res: ResInterface, next: NextFunction) {
    try {
      const { amount, userId, currentBalance } = req.body;
      const getbalance = await UserModel.findOne({ _id: req.user.id });
      if (getbalance.balance < amount) {
        return ResponseHelper.forbidden(
          res,
          res.__("you_have_insufficient_amount_to_recharge_user")
        );
      }
      const user = await UserModel.findOne({ _id: userId });
      const rechargeAmount = Number(user?.balance + amount);
      user.balance = rechargeAmount;
      await user.save();
      await TransactionRecordModel.create({
        userId,
        before: currentBalance,
        recharge: amount,
        after: rechargeAmount,
      });
      return ResponseHelper.ok(res, res.__("user_recharge_successfully"), {
        user,
      });
    } catch (error) {
      next(error);
    }
  }

  async redeem(req: ReqInterface, res: ResInterface, next: NextFunction) {
    try {
      const { amount, userId, currentBalance } = req.body;

      const user = await UserModel.findOne({ _id: userId });
      const redeemAmount = Number(user?.balance - amount);
      user.balance = redeemAmount;
      await user.save();
      await TransactionRecordModel.create({
        userId,
        before: currentBalance,
        redeem: amount,
        after: redeemAmount,
      });
      return ResponseHelper.ok(res, res.__("user_redeem_successfully"), {
        user,
      });
    } catch (error) {
      next(error);
    }
  }

  async gameRecords(req: ReqInterface, res: ResInterface, next: NextFunction) {
    try {
      const queryString = req.query;
      // if(!queryString.userId) return ResponseHelper.forbidden(res,res.__('userId_required'))
      const gameRecord = await UserService.gameRecords(queryString);
      res.logMsg = `User game record fetched successfully`;
      return ResponseHelper.ok(res, res.__("user_game_records"), gameRecord);
    } catch (error) {
      next(error);
    }
  }

  async transactionRecords(
    req: ReqInterface,
    res: ResInterface,
    next: NextFunction
  ) {
    try {
      const queryString = req.query;
      // need to work on transaction summary count object
      const gameRecord = await UserService.transactionRecords(queryString);
      res.logMsg = `transaction record fetched successfully`;
      return ResponseHelper.ok(
        res,
        res.__("transaction_game_records"),
        gameRecord
      );
    } catch (error) {
      next(error);
    }
  }

  async transactionRecordsub(req: any, res: any, next: NextFunction) {
    try {
      const userId = req.query.userId ? req.query.userId : req.user.id;
      console.log(userId, "userId---------");

      const page = req.query.page * 1 || 1;
      const limit = req.query.limit * 1 || 10;
      let skip = (page - 1) * limit;
       let match :any = {}

      if(req.query.search){
        match = {
          "userData.userId": { $regex: `${req.query.search}`, $options: 'i' } 
        }

      }
      const agg: any = [
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "userData",
          },
        },
        {
          $unwind: {
            path: "$userData",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "userData.parentId",
            foreignField: "_id",
            as: "userParentData",
          },
        },
        {
          $unwind: {
            path: "$userParentData",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $match: {
            $or: [
              { "userData.parentId": new Types.ObjectId(userId) },
              { "userParentData.parentId": new Types.ObjectId(userId) },
            ],
          },
        },
        {
          $match: match
        },
        {
          $facet: {
            count: [
              {
                $count: "count",
              },
            ],
            list: [
              {
                $sort: {
                  createdAt: -1,
                },
              },
              {
                $skip: skip,
              },
              {
                $limit: limit,
              },
            ],
          },
        },
        {
          $project: {
            count: {
              $first: "$count.count",
            },
            list: 1,
          },
        },
      ];
      const transactionData = await TransactionRecordModel.aggregate(agg);
      const list = transactionData[0].list;
      const count = transactionData[0].count;
      return ResponseHelper.ok(res, res.__("transaction_list"), {
        list,
        count,
        page,
        limit,
      });
    } catch (error) {
      next(error);
    }
  }


  async gameRecordsub(req: any, res: any, next: NextFunction) {
    try {
      const userId = req.query.userId ? req.query.userId : req.user.id;
      console.log(userId, "userId---------");

      const page = req.query.page * 1 || 1;
      const limit = req.query.limit * 1 || 10;
      let skip = (page - 1) * limit;
       let match :any = {}

      if(req.query.search){
        match = {
          "userData.userId": { $regex: `${req.query.search}`, $options: 'i' } 
        }

      }
      const agg: any = [
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "userData",
          },
        },
        {
          $unwind: {
            'path': '$userData',
            'preserveNullAndEmptyArrays': true
          }
        },
        {
          $lookup: {
            from: "users",
            localField: "userData.parentId",
            foreignField: "_id",
            as: "userParentData",
          },
        },
        {
          $unwind: {
            'path': '$userParentData',
            'preserveNullAndEmptyArrays': true
          }
        },
        {
          $match: {
            $or: [
              { "userData.parentId": new Types.ObjectId(userId) },
              { "userParentData.parentId": new Types.ObjectId(userId) }
            ]
          },
        },
        {
          $match: match
        },
        {
          $facet: {
            count: [
              {
                $count: "count",
              },
            ],
            list: [
              {
                $sort: {
                  createdAt: -1,
                },
              },
              {
                $skip: skip,
              },
              {
                $limit: limit,
              },
            ],
          },
        },
        {
          $project: {
            count: {
              $first: "$count.count",
            },
            list: 1,
          },
        },
      ];
      const transactionData = await GameRecordModel.aggregate(agg);
      const list = transactionData[0].list;
      const count = transactionData[0].count;
      return ResponseHelper.ok(res, res.__("transaction_list"), {
        list,
        count,
        page,
        limit,
      });
    } catch (error) {
      next(error);
    }
  }
}
export default new UserController();
