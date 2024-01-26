import { NextFunction } from "express";
import { ReqInterface, ResInterface } from "../../interfaces/req.interface";
import GameModel from "../../models/game.model";
import JpRecordModel from "../../models/jack-port-records.model";
import TransactionRecordModel from "../../models/transaction-record.model";
import UserModel from "../../models/user.model";
import ResponseHelper from "../../helpers/response.helper";
import { Types } from "mongoose";
import GameRecordModel from "../../models/game-record.model";

class DashboardController {
  async getAdminDashboard(
    req: ReqInterface,
    res: ResInterface,
    next: NextFunction
  ) {
    try {
      const totalUser = await UserModel.find({
        roleType: "USER",
      }).countDocuments();
      const totalVendor = await UserModel.find({
        roleType: "VENDOR",
      }).countDocuments();
      const totalStore = await UserModel.find({
        roleType: "STORE",
      }).countDocuments();
      const totalGames = await GameModel.find({}).countDocuments();
      const totalJackportRecord = await JpRecordModel.find().countDocuments();
      const totalTransactionRecord =
        await TransactionRecordModel.find().countDocuments();

      const getTransaction = await TransactionRecordModel.aggregate([

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
          $lookup: {
            from: "users",
            localField: "userParentData.parentId",
            foreignField: "_id",
            as: "vendorData",
          },
        },
        {
          $unwind: {
            'path': '$vendorData',
            'preserveNullAndEmptyArrays': true
          }
        },
        {
          $sort: {
            createdAt: -1
          }
        },
        {
          $limit: 10
        }
      ])

      const getGameRecords = await GameRecordModel.aggregate([

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
          $lookup: {
            from: "users",
            localField: "userParentData.parentId",
            foreignField: "_id",
            as: "vendorData",
          },
        },
        {
          $unwind: {
            'path': '$vendorData',
            'preserveNullAndEmptyArrays': true
          }
        },
        {
          $sort: {
            createdAt: -1
          }
        },
        {
          $limit: 10
        }
      ])

      return ResponseHelper.ok(res, res.__("dashboard_count"), {
        totalGames,
        totalJackportRecord,
        totalStore,
        totalTransactionRecord,
        totalUser,
        totalVendor,
        getTransaction,
        getGameRecords
      });
    } catch (error) {
      next(error);
    }
  }

  async getSubAdminDashboard(
    req: ReqInterface,
    res: ResInterface,
    next: NextFunction
  ) {
    try {
      const userId = req.user.id;
      // const getUser = await UserModel.findOne({_id:userId})
      const totalVendor = await UserModel.find({
        roleType: "VENDOR",
        parentId: userId,
      }).countDocuments();
      const totalStore = await UserModel.find({
        roleType: "STORE",
        parentId: userId,
      }).countDocuments();

      const totalUserStore = await UserModel.find({
        roleType: "USER",
        parentId: userId,
      }).countDocuments();
      const agg = [
        {
          $match: {
            parentId: new Types.ObjectId(userId),
            roleType: "USER",
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "_id",
            foreignField: "parentId",
            as: "usersss",
          },
        },
        {
          $addFields: {
            totalUsers: {
              $size: "$usersss",
            },
          },
        },
        {
          $group: {
            _id: "$_id",
            totalUserCount: {
              $sum: "$totalUsers",
            },
          },
        },
      ];
      const findUser = await UserModel.aggregate(agg);
      const totalUser = findUser;
      const totalJackportRecord = await JpRecordModel.find({
        userId: userId,
      }).countDocuments();
      const totalTransactionRecord = await TransactionRecordModel.aggregate([
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
          '$count': 'totalTransaction'
      }
      ])
      const totalGame = await GameModel.find({
      }).countDocuments();

      const getTransaction = await TransactionRecordModel.aggregate([

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
          $sort: {
            createdAt: -1
          }
        },
        {
          $limit: 10
        }
      ])

      const getGameRecords = await GameRecordModel.aggregate([

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
          $sort: {
            createdAt: -1
          }
        },
        {
          $limit: 10
        }
      ])

      return ResponseHelper.ok(res, res.__("dashboard_count"), {
        totalJackportRecord,
        totalStore,
        totalTransactionRecord,
        totalUser,
        totalVendor,
        totalUserStore,
        totalGame,
        getTransaction,
        getGameRecords
      });
    } catch (error) {
      next(error);
    }
  }
}
export default new DashboardController();
