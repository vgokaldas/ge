import { NextFunction } from "express";
import ResponseHelper from "../../helpers/response.helper";
import { ReqInterface, ResInterface } from "../../interfaces/req.interface";
import AuthService from "../../services/admin/auth.service";
import AdminModel from "../../models/admin.model";
import { Auth } from "../../utils/auth.util";
class AuthController {


    async login(req: ReqInterface, res: ResInterface, next: NextFunction) {
        const {email,password} = req.body
        try {
            const data = await AuthService.login(email,password,res,next);
            if (data) {
                res.logMsg = `*${data.admin._id}* login successfully`;
                return ResponseHelper.ok(res, res.__('login_successfully'), data);
            }
        } catch (error) {
            next(error);
        }
    }

    async create(req:ReqInterface,res:ResInterface,next:NextFunction){
        try{
            await AuthService.createAdmin();
        }catch (error) {
            next(error);
        }
    }

    async changePassword(req: ReqInterface, res: ResInterface, next: NextFunction) {
        const {passwordCurrent,password} = req.body
        try {
          const adminId = req.admin._id

          const data = await AuthService.changePassword(passwordCurrent,password,adminId,res);
          if(data){
            res.logMsg = 'Admin password changed successfully'
    
          return ResponseHelper.ok(res, res.__('admin_password_changed'), {});
          }
    
        } catch (err) {
          next(err);
        }
      }

       async getProfile(req: ReqInterface, res: ResInterface, next: NextFunction) {
        try {
          let getAdmin = await AdminModel.findOne({
            _id: req.admin._id,
          });

          return ResponseHelper.ok(res, res.__('get_profile'), getAdmin);
        } catch (err) {
          next(err);
        }
      }

       async updateProfile(req: ReqInterface, res: ResInterface, next: NextFunction){
        const {email,name,profilePic} = req.body
        try {
    
          let getAdmin = await AdminModel.findOne({
            _id: req.admin._id,
          });
          if (!getAdmin) {
            return ResponseHelper.badRequest(res, res.__('account_not_found.'));
        }

          getAdmin.name = name ? name :getAdmin.name,
          getAdmin.email = email ? email :getAdmin.email,
          getAdmin.profilePic = profilePic ? profilePic :getAdmin.profilePic,
          getAdmin.save()
    
          return ResponseHelper.ok(res, res.__('update_profile'), getAdmin);
          
        } catch (error) {
          next(error)
          
        }
      }
       async forgotPassword(req: ReqInterface, res: ResInterface, next: NextFunction) {
        const email = req.body.email;
        try {
          let admin = await AdminModel.findOne({ email: email });
          if (!admin) {
            return ResponseHelper.badRequest(res, res.__('account_not_found.'));
        }
        //   const otp = await Auth.generateOtp();
          admin.verification_code = "1000";
          admin.save();

          return ResponseHelper.ok(res, res.__('send_otp'), {});
        
    
        } catch (error) {
          next(error);
        }
      }
       async verifyOtp(req: ReqInterface, res: ResInterface, next: NextFunction) {
        const {email,otp} = req.body
        try {
          let admin = await AdminModel.findOne({ email: email });
          if (!admin) {
            return ResponseHelper.badRequest(res, res.__('account_not_found.'));
        }
         
          if (admin.verification_code != otp) {
            return ResponseHelper.badRequest(res, "Invalid OTP");
          }
          admin.verification_code = null;
          admin.save();
          return ResponseHelper.ok(res, "Verify OTP please reset the password", {});
          
        } catch (error) {
          next(error);
        }
      }
       async resetPassword(req: ReqInterface, res: ResInterface, next: NextFunction) {
        const { email, password } = req.body;
        try {
          let admin = await AdminModel.findOne({ email });
          if (!admin) {
            return ResponseHelper.badRequest(res, res.__('account_not_found.'));
        }
          admin.password = await new Auth().encryptPassword(password);
          await admin.save();
          let msg = "Password changed successfully.";
          return ResponseHelper.ok(res, msg, {});
        
        } catch (error) {
          next(error);
        }
      }
}
export default new AuthController();