"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../../controllers/admin/user.controller");
const authentication_middleware_1 = require("../../middlewares/authentication.middleware");
const auth_validator_1 = require("../../validators/admin/auth.validator");
class UserRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.postRoute();
        this.getRoute();
        this.putRoutes();
    }
    postRoute() {
        this.router.post('/add-user', authentication_middleware_1.default.admin, user_controller_1.default.add);
        this.router.post('/recharge-amount', authentication_middleware_1.default.admin, user_controller_1.default.recharge);
        this.router.post('/redeem-amount', authentication_middleware_1.default.admin, user_controller_1.default.redeem);
    }
    getRoute() {
        this.router.get('/get-user-list', authentication_middleware_1.default.admin, user_controller_1.default.list);
        this.router.get('/user-game-records', authentication_middleware_1.default.admin, user_controller_1.default.gameRecords);
        this.router.get('/user-transaction-records', authentication_middleware_1.default.admin, user_controller_1.default.transactionRecords);
    }
    putRoutes() {
        this.router.put('/edit-user/:id', authentication_middleware_1.default.admin, user_controller_1.default.edit);
        this.router.put('/user-status/:id', authentication_middleware_1.default.admin, user_controller_1.default.status);
        this.router.put('/change-password/:id', authentication_middleware_1.default.admin, auth_validator_1.default.UserChangePassword, user_controller_1.default.changePassword);
    }
}
exports.default = new UserRoutes().router;
