"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../../controllers/admin/auth.controller");
const authentication_middleware_1 = require("../../middlewares/authentication.middleware");
const auth_validator_1 = require("../../validators/admin/auth.validator");
class AuthRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.postRoute();
        this.getRoute();
    }
    postRoute() {
        this.router.post('/login', auth_controller_1.default.login);
        this.router.post('/change-password', authentication_middleware_1.default.admin, auth_validator_1.default.changePassword, auth_controller_1.default.changePassword);
        this.router.post('/forgot-password', auth_validator_1.default.forgetPassword, auth_controller_1.default.forgotPassword);
        this.router.post('/verify-otp', auth_validator_1.default.verifyOTP, auth_controller_1.default.verifyOtp);
        this.router.post('/reset-password', auth_validator_1.default.resetPassword, auth_controller_1.default.resetPassword);
        this.router.post('/update-profile', authentication_middleware_1.default.admin, auth_controller_1.default.updateProfile);
        // this.router.post(
        //     '/signup',
        //     AuthController.create
        // );
    }
    getRoute() {
        this.router.get('/get-profile', authentication_middleware_1.default.admin, auth_controller_1.default.getProfile);
    }
}
exports.default = new AuthRoutes().router;
