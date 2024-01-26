import { Router } from "express";
import AuthController from "../../controllers/admin/auth.controller"
import authenticationMiddleware from "../../middlewares/authentication.middleware";
import AuthValidator from "../../validators/admin/auth.validator"

class AuthRoutes {
    public router: Router;

    constructor() {
        this.router = Router();
        this.postRoute();
        this.getRoute();

    }

    postRoute(){
        this.router.post(
            '/login',
            AuthController.login
        );
        this.router.post(
            '/change-password',
            authenticationMiddleware.admin,
            AuthValidator.changePassword,
            AuthController.changePassword
        );
        this.router.post(
            '/forgot-password',
            AuthValidator.forgetPassword,
            AuthController.forgotPassword
        );
        this.router.post(
            '/verify-otp',
            AuthValidator.verifyOTP,
            AuthController.verifyOtp
        );
        this.router.post(
            '/reset-password',
            AuthValidator.resetPassword,
            AuthController.resetPassword
        );
        this.router.post(
            '/update-profile',
            authenticationMiddleware.admin,
            AuthController.updateProfile
        );
        // this.router.post(
        //     '/signup',
        //     AuthController.create
        // );

    }
    getRoute(){
        this.router.get(
            '/get-profile',
            authenticationMiddleware.admin,
            AuthController.getProfile
        );
    }

}

export default new AuthRoutes().router;