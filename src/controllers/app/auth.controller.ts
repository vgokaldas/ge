import { NextFunction } from "express";
import ResponseHelper from "../../helpers/response.helper";
import { ReqInterface, ResInterface } from "../../interfaces/req.interface";
import AuthService from "../../services/app/auth.service"
import UserModel from "../../models/user.model";
import { Auth } from "../../utils/auth.util";
class AuthController {

  /**
       * @api {post} /api/app/auth/login Login
       * @apiHeader {String} App-Version Version Code 1.0.0.
       * @apiVersion 1.0.0
       * @apiName login
       * @apiGroup App-Auth
       * @apiBody {String} userName ankit
       * @apiBody {String} password sbckjdchkdsjc
       * @apiParamExample {json} Request-Body: 
       * {
           "userName":"test",
            "password":"test@123"
         }
       * @apiSuccessExample {json} Success-Response:
         {"status":200,"statusText":"SUCCESS","message":"login successfully","data":{"user":{"_id":"64b9157e6dd0eb94c9ee09a2","userName":"afreen","nickName":"affa","userId":"UI20584","isActive":false,"isDeleted":false,"timestamps":"1689851257946","lastLogin":"2023-07-20T11:26:53.542Z","createdAt":"2023-07-20T11:07:42.371Z","updatedAt":"2023-07-20T11:07:42.371Z","__v":0},"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YjkxNTdlNmRkMGViOTRjOWVlMDlhMiIsInVzZXJOYW1lIjoiYWZyZWVuIiwiaWF0IjoxNjg5ODUyNDEzLCJleHAiOjE2ODk5Mzg4MTN9.RMX5onnNzOflACStQiQ7sazGBZW7UFyeNNwjME2jvWQ","execTime":735}}
  */


    async login(req: ReqInterface, res: ResInterface, next: NextFunction) {
        const {userName,password,type} = req.body
        try {
            const data = await AuthService.login(userName,password,type,res,next);
            if (data) {
                res.logMsg = `*${data.user.id}* login successfully`;
                return ResponseHelper.ok(res, res.__('login_successfully'), data);
            }
        } catch (error) {
            next(error);
        }
    }


    /**
       * @api {post} /api/app/auth/change-password Change Password
       * @apiHeader {String} App-Version Version Code 1.0.0.
       * @apiVersion 1.0.0
       * @apiHeader {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYmZlMGNmMTdiYmU2ZjY2NzI3MzlmMyIsImVtYWlsIjoiYWRtaW5Ad2VmdW5kdXMuY29tIiwiaWF..........
       * @apiName change-password
       * @apiGroup App-Auth
       * @apiBody {String} passwordCurrent ankit
       * @apiBody {String} password sbckjdchkdsjc
       * @apiParamExample {json} Request-Body: 
       * {
             "passwordCurrent":"test@123",
             "password":"1234567"
          }
       * @apiSuccessExample {json} Success-Response:
         {"status":200,"statusText":"SUCCESS","message":"user_password_changed","data":{"execTime":1157}}
  */
    async changePassword(req: ReqInterface, res: ResInterface, next: NextFunction) {
        const {passwordCurrent,password} = req.body
        try {
          const userId = req.user.id

          const data = await AuthService.changePassword(passwordCurrent,password,userId,res);
          if(data){
            res.logMsg = 'User password changed successfully'
    
          return ResponseHelper.ok(res, res.__('user_password_changed'), {});
          }
    
        } catch (err) {
          next(err);
        }
      }

      async getProfile(req: ReqInterface, res: ResInterface, next: NextFunction) {
        try {
          const userId = req.user.id

          const data = await UserModel.findOne({_id:userId})
          if(data){
            res.logMsg = 'GetProfile'
    
          return ResponseHelper.ok(res, res.__('GetProfile'), data);
          }
    
        } catch (err) {
          next(err);
        }
      }

      async updateProfile(req: ReqInterface, res: ResInterface, next: NextFunction){
        const {userName,nickName} = req.body
        try {
    
          let getUser = await UserModel.findOne({
            _id: req.user.id,
          });
          if (!getUser) {
            return ResponseHelper.badRequest(res, res.__('account_not_found.'));
        }

          getUser.userName = userName ? userName :getUser.userName,
          getUser.nickName = nickName ? nickName :getUser.nickName,
          // getUser.p = profilePic ? profilePic :getUser.profilePic,
          getUser.save()
    
          return ResponseHelper.ok(res, res.__('update_profile'), getUser);
          
        } catch (error) {
          next(error)
          
        }
      }
       async forgotPassword(req: ReqInterface, res: ResInterface, next: NextFunction) {
        const userName = req.body.userName;
        try {
          let user = await UserModel.findOne({ userName: userName });
          if (!user) {
            return ResponseHelper.badRequest(res, res.__('account_not_found.'));
        }
        //   const otp = await Auth.generateOtp();
          user.verification_code = "1000";
          user.save();

          return ResponseHelper.ok(res, res.__('send_otp'), {});
        
    
        } catch (error) {
          next(error);
        }
      }
       async verifyOtp(req: ReqInterface, res: ResInterface, next: NextFunction) {
        const {userName,otp} = req.body
        try {
          let user = await UserModel.findOne({ userName: userName });
          if (!user) {
            return ResponseHelper.badRequest(res, res.__('account_not_found.'));
        }
         
          if (user.verification_code != otp) {
            return ResponseHelper.badRequest(res, "Invalid OTP");
          }
          user.verification_code = null;
          user.save();
          return ResponseHelper.ok(res, "Verify OTP please reset the password", {});
          
        } catch (error) {
          next(error);
        }
      }
       async resetPassword(req: ReqInterface, res: ResInterface, next: NextFunction) {
        const { userName, password } = req.body;
        try {
          let user = await UserModel.findOne({ userName :userName});
          if (!user) {
            return ResponseHelper.badRequest(res, res.__('account_not_found.'));
        }
          user.password = await new Auth().encryptPassword(password);
          await user.save();
          let msg = "Password changed successfully.";
          return ResponseHelper.ok(res, msg, {});
        
        } catch (error) {
          next(error);
        }
      }
}
export default new AuthController();
