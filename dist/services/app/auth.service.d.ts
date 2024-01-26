import { ResInterface } from "../../interfaces/req.interface";
import { NextFunction } from "express";
import { ObjectId } from "mongoose";
import { UserInterface } from "../../interfaces/user.interface";
declare class AuthService {
    /**
     *
     * @param email {String} user email
     * @param password {Password} user password
     * @param res {ResInterface}
     * @param next {NextFunction} next function
     * @return {Promise<{admin: AdminInterface, token: string}>}
     */
    login(userName: string, password: string, type: String, res: ResInterface, next: NextFunction): Promise<{
        user: UserInterface;
        token: string;
    } | void>;
    changePassword(passwordCurrent: string, password: string, adminId: string | ObjectId, res: ResInterface): Promise<{
        user: UserInterface;
    } | void>;
}
declare const _default: AuthService;
export default _default;
