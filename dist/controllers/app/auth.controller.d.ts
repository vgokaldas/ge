import { NextFunction } from "express";
import { ReqInterface, ResInterface } from "../../interfaces/req.interface";
declare class AuthController {
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
    login(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
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
    changePassword(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    getProfile(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    updateProfile(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    forgotPassword(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    verifyOtp(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    resetPassword(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
}
declare const _default: AuthController;
export default _default;
