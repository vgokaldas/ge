import { Router } from "express";
import authController from "../../controllers/app/auth.controller";
import authenticationMiddleware from "../../middlewares/authentication.middleware";
import AuthValidator from "../../validators/app/auth.validator"

class AuthRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.postRoutes();
        this.getRoutes();

    }

    postRoutes(){
       this.router.post(
        '/login',
        AuthValidator.login,
        authController.login
       );
       this.router.post(
        '/change-password',
        authenticationMiddleware.user,
        AuthValidator.changePassword,
        authController.changePassword
       );
       this.router.post(
        '/forgot-password',
        AuthValidator.forgetPassword,
        authController.forgotPassword
    );
    this.router.post(
        '/verify-otp',
        AuthValidator.verifyOTP,
        authController.verifyOtp
    );
    this.router.post(
        '/reset-password',
        AuthValidator.resetPassword,
        authController.resetPassword
    );
    this.router.post(
        '/update-profile',
        authenticationMiddleware.admin,
        authController.updateProfile
    );
    }
    getRoutes(){
        this.router.get(
            '/get-profile',
            authenticationMiddleware.user,
            authController.getProfile
        )
    }

    
}

export default new AuthRouter().router;