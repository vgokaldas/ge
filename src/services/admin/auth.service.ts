import AdminModel from "../../models/admin.model";
import { Auth } from "../../utils/auth.util";
import ResponseHelper from "../../helpers/response.helper";
import { AdminInterface } from "../../interfaces/admin.interface";
import { ResInterface } from "../../interfaces/req.interface";
import { NextFunction } from "express";
import {ObjectId} from "mongoose";

class AuthService {

    async createAdmin() {
        try {
            const encryptedPassword = await new Auth().encryptPassword('Admin@1234');

            const isAdminExist = await AdminModel.exists({ email: 'admin@cachoo.com' });
            if (isAdminExist) {
                console.log('Admin Exists');
            }
            else {
                await AdminModel.create({
                    email: 'admin@cachoo.com',
                    password: encryptedPassword,
                    name: 'Cachoo'
                });

                console.log('Admin created');
            }
            return;

        } catch (error) {
            console.log('error', error);
        }
    }

    /**
     * 
     * @param email {String} user email
     * @param password {Password} user password
     * @param res {ResInterface} 
     * @param next {NextFunction} next function
     * @return {Promise<{admin: AdminInterface, token: string}>}
     */
    async login(
        email: string,
        password: string,
        res: ResInterface,
        next: NextFunction
    ): Promise<{ admin: AdminInterface, token: string } | void> {
        try{
            const admin = await AdminModel.findOne({ email });

            if (!admin) {
                return ResponseHelper.badRequest(res, res.__('account_not_found.'));
            }
            const isPasswordCorrect = await new Auth().comparePassword(password, admin.password);

            if (!isPasswordCorrect) {
                return ResponseHelper.badRequest(res, res.__('invalid_email_password'));
            }


            const payload = {
                id: admin._id,
                email: admin.email,
            }

            const token = await new Auth().getToken(
                payload,
                '1d',
                next
            );

            admin.password = undefined;

            return {
                admin,
                token
            }

        } catch (error) {
            next(error);
        }
    }

    async changePassword(passwordCurrent: string,
        password: string,
        adminId:string | ObjectId,
        res: ResInterface
        ): Promise<{ admin: AdminInterface} | void> {
        const admin: any = await AdminModel.findById(adminId);
    
        const isPasswordCurrentCorrect = await new Auth().comparePassword(passwordCurrent, admin.password);
  
        if (!isPasswordCurrentCorrect) {
          return ResponseHelper.badRequest(res, res.__('incorrect_password'));
        }
  
        const encryptedPassword = await new Auth().encryptPassword(password);
  
        admin.password = encryptedPassword;
        await admin.save();
        return {admin}
    }

}
export default new AuthService();