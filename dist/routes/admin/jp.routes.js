"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jp_controller_1 = require("../../controllers/admin/jp.controller");
const authentication_middleware_1 = require("../../middlewares/authentication.middleware");
class JPRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.postRoute();
        this.getRoute();
        this.putRoute();
    }
    postRoute() {
        this.router.post('/update-jp', authentication_middleware_1.default.user, jp_controller_1.default.updateJP);
    }
    getRoute() {
        this.router.get('/get-jp-record', authentication_middleware_1.default.user, jp_controller_1.default.jpRecord);
        this.router.get('/get-jp-detail', authentication_middleware_1.default.user, jp_controller_1.default.getJackPortDetail);
    }
    putRoute() {
    }
}
exports.default = new JPRoutes().router;
