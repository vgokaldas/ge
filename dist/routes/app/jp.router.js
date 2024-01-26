"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jp_controller_1 = require("../../controllers/app/jp.controller");
const authentication_middleware_1 = require("../../middlewares/authentication.middleware");
const jp_validator_1 = require("../../validators/app/jp.validator");
class JPRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.postRoutes();
        this.getRoutes();
    }
    postRoutes() {
        this.router.post('/choose-jack-port', authentication_middleware_1.default.user, jp_validator_1.default.chooseJP, jp_controller_1.default.chooseJP);
    }
    getRoutes() {
        this.router.get('/get-jack-port-detail', authentication_middleware_1.default.user, jp_controller_1.default.getJackPortDetail);
    }
}
exports.default = new JPRouter().router;
