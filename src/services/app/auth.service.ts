import { Auth } from "../../utils/auth.util";
import ResponseHelper from "../../helpers/response.helper";
import { ResInterface } from "../../interfaces/req.interface";
import { NextFunction } from "express";
import { ObjectId } from "mongoose";
import UserModel from "../../models/user.model";
import { UserInterface } from "../../interfaces/user.interface";

class AuthService {
  /**
   *
   * @param email {String} user email
   * @param password {Password} user password
   * @param res {ResInterface}
   * @param next {NextFunction} next function
   * @return {Promise<{admin: AdminInterface, token: string}>}
   */
  async login(
    userName: string,
    password: string,
    type: String,
    res: ResInterface,
    next: NextFunction
  ): Promise<{ user: UserInterface; token: string } | void> {
    try {
      let user;
      if (type == "USER") {
        user = await UserModel.findOne({ userName, roleType: type });
      } else {
        user = await UserModel.findOne({ userName });
      }
      if (!user) {
        return ResponseHelper.badRequest(res, res.__("account_not_found."));
      }
      const isPasswordCorrect = await new Auth().comparePassword(
        password,
        user.password
      );

      if (!isPasswordCorrect) {
        return ResponseHelper.badRequest(
          res,
          res.__("invalid_user_or_password")
        );
      }

      const payload = {
        id: user._id,
        userName: user.userName,
      };

      const token = await new Auth().getToken(payload, "1d", next);
      user.lastLogin = new Date();
      await user.save();
      user.password = undefined;

      return {
        user,
        token,
      };
    } catch (error) {
      next(error);
    }
  }

  async changePassword(
    passwordCurrent: string,
    password: string,
    adminId: string | ObjectId,
    res: ResInterface
  ): Promise<{ user: UserInterface } | void> {
    const user: any = await UserModel.findById(adminId);

    const isPasswordCurrentCorrect = await new Auth().comparePassword(
      passwordCurrent,
      user.password
    );

    if (!isPasswordCurrentCorrect) {
      return ResponseHelper.badRequest(res, res.__("incorrect_password"));
    }

    const encryptedPassword = await new Auth().encryptPassword(password);

    user.password = encryptedPassword;
    await user.save();
    return { user };
  }
}
export default new AuthService();
