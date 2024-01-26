import { ObjectId } from "aws-sdk/clients/codecommit";
import { GameRecordInterface } from "../../interfaces/game-record.interface";
import { ResInterface } from "../../interfaces/req.interface";
import { UserInterface } from "../../interfaces/user.interface";
import GameRecordModel from "../../models/game-record.model";
import TransactionRecordModel from "../../models/transaction-record.model";
import UserModel from "../../models/user.model";
import { ApiFeatures } from "../../utils/api-features.util";
import { Auth } from "../../utils/auth.util";

class UserService {
  /**
   * @description listing of user
   * @param queryString req query object
   * @params User id of user
   * @returns
   */

  async list(
    queryString: any
  ): Promise<{
    list: UserInterface[];
    page: number;
    limit: number;
    count: number;
  }> {
    const page = queryString.page * 1 || 1;
    const limit = queryString.limit * 1 || 10;
    const roleType = queryString.roleType;
    // let skip = (page - 1) * limit;

    const countQuery = UserModel.find({ roleType });
    const sorting = queryString.sort || "-createdAt";
    const countFeature = new ApiFeatures(countQuery, queryString)
      .filtering()
      .searching(["userName", "userId"])
      .sorting(sorting)
      .getCount();

    const lisQuery = UserModel.find({ roleType });
    const listFeature = new ApiFeatures(lisQuery, queryString)
      .filtering()
      .searching(["userName", "userId"])
      .sorting(sorting)
      .fieldsLimiting()
      .pagination();

    const count = await countFeature.query;
    const list = await listFeature.query;

    return { list, page, limit, count };
  }

  async gameRecords(
    queryString: any
  ): Promise<{
    list: GameRecordInterface[];
    page: number;
    limit: number;
    count: number;
  }> {
    const page = queryString.page * 1 || 1;
    const limit = queryString.limit * 1 || 10;
    const userId = queryString.userId;

    console.log(userId, "user--->");

    console.log(userId !== "null" ? true : false);
    // let skip = (page - 1) * limit;

    const countQuery =
      userId !== "null"
        ? GameRecordModel.find({ userId })
        : GameRecordModel.find();
    const sorting = queryString.sort || "-createdAt";
    const countFeature = new ApiFeatures(countQuery, queryString)
      .searching(["gameName"])
      .sorting(sorting)
      .getCount();

    const lisQuery =
      userId !== "null"
        ? GameRecordModel.find({ userId }).populate("userId", "userName userId")
        : GameRecordModel.find().populate("userId", "userName userId");
    const listFeature = new ApiFeatures(lisQuery, queryString)
      .searching(["gameName"])
      .sorting(sorting)
      .fieldsLimiting()
      .pagination();

    const count = await countFeature.query;
    const list = await listFeature.query;

    return { list, page, limit, count };
  }

  async transactionRecords(
    queryString: any
  ): Promise<{ list: any; page: number; limit: number; count: number }> {
    const page = queryString.page * 1 || 1;
    const limit = queryString.limit * 1 || 10;
    const userId = queryString.userId;

    // let skip = (page - 1) * limit;
    const countQuery = userId
      ? TransactionRecordModel.find({ userId })
      : TransactionRecordModel.find();
    const sorting = queryString.sort || "-createdAt";
    const countFeature = new ApiFeatures(countQuery, queryString)
      .searching([""])
      .sorting(sorting)
      .getCount();

    const lisQuery = userId
      ? TransactionRecordModel.find({ userId }).populate(
          "userId",
          "userName userId"
        )
      : TransactionRecordModel.find().populate("userId", "userName userId");
    const listFeature = new ApiFeatures(lisQuery, queryString)
      .searching([""])
      .sorting(sorting)
      .fieldsLimiting()
      .pagination();

    const count = await countFeature.query;
    const list = await listFeature.query;

    return { list, page, limit, count };
  }

  async changePassword(
    passwordCurrent: string,
    adminId: string | ObjectId,
    res: ResInterface
  ): Promise<{ user: UserInterface } | void> {
    const user: any = await UserModel.findById(adminId);

    // const isPasswordCurrentCorrect = await new Auth().comparePassword(passwordCurrent, user.password);

    // if (!isPasswordCurrentCorrect) {
    //   return ResponseHelper.badRequest(res, res.__('incorrect_password'));
    // }

    const encryptedPassword = await new Auth().encryptPassword(passwordCurrent);

    user.password = encryptedPassword;
    await user.save();
    return { user };
  }
  /**
   * @description get user by id
   * @param id {String} user id for fetching user
   * @returns {Promise<UserInterface>} user data by id
   */

  async findUser(id: string | ObjectId): Promise<UserInterface> {
    const userData: UserInterface = await UserModel.findById(id);
    return userData;
  }
  // private async generateUserId(): Promise<string> {
  //     const last = await UserModel.findOne({}).sort({ createdAt: -1 });
  //     if (last) {
  //         const txNum = Number(last.userId) + 1;
  //         return `${txNum}`.padStart(6, '0');
  //     }
  //     return '000001';
  // }
}
export default new UserService();
