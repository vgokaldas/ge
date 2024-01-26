import { AdminInterface } from "../../interfaces/admin.interface";
import { ResInterface } from "../../interfaces/req.interface";
import { NextFunction } from "express";
import { ObjectId } from "mongoose";
declare class AuthService {
    createAdmin(): Promise<void>;
    /**
     *
     * @param email {String} user email
     * @param password {Password} user password
     * @param res {ResInterface}
     * @param next {NextFunction} next function
     * @return {Promise<{admin: AdminInterface, token: string}>}
     */
    login(email: string, password: string, res: ResInterface, next: NextFunction): Promise<{
        admin: AdminInterface;
        token: string;
    } | void>;
    changePassword(passwordCurrent: string, password: string, adminId: string | ObjectId, res: ResInterface): Promise<{
        admin: AdminInterface;
    } | void>;
}
declare const _default: AuthService;
export default _default;
