"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../../controllers/app/user.controller");
const authentication_middleware_1 = require("../../middlewares/authentication.middleware");
const auth_validator_1 = require("../../validators/admin/auth.validator");
class UserRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.postRoute();
        this.getRoute();
        this.putRoutes();
    }
    postRoute() {
        this.router.post("/add-user", authentication_middleware_1.default.user, user_controller_1.default.add);
        this.router.post("/recharge-amount", authentication_middleware_1.default.user, user_controller_1.default.recharge);
        this.router.post("/redeem-amount", authentication_middleware_1.default.user, user_controller_1.default.redeem);
    }
    getRoute() {
        this.router.get("/get-user-list", authentication_middleware_1.default.user, user_controller_1.default.list);
        // this.router.get(
        //   "/user-game-records",
        //   authenticationMiddleware.user,
        //   userController.gameRecords
        // );
        this.router.get("/user-game-records", authentication_middleware_1.default.user, user_controller_1.default.gameRecordsub);
        this.router.get("/user-transaction-records", authentication_middleware_1.default.user, user_controller_1.default.transactionRecordsub);
    }
    putRoutes() {
        this.router.put("/edit-user/:id", authentication_middleware_1.default.user, user_controller_1.default.edit);
        this.router.put("/user-status/:id", authentication_middleware_1.default.user, user_controller_1.default.status);
        this.router.put("/change-password/:id", authentication_middleware_1.default.user, auth_validator_1.default.UserChangePassword, user_controller_1.default.changePassword);
    }
}
exports.default = new UserRouter().router;
