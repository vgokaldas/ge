"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dashboard_controller_1 = require("../../controllers/admin/dashboard.controller");
const authentication_middleware_1 = require("../../middlewares/authentication.middleware");
class DashboardRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.postRoute();
        this.getRoute();
    }
    postRoute() { }
    getRoute() {
        this.router.get("/get-admin-dashboard", authentication_middleware_1.default.admin, dashboard_controller_1.default.getAdminDashboard);
        this.router.get("/get-subadmin-dashboard", authentication_middleware_1.default.user, dashboard_controller_1.default.getSubAdminDashboard);
    }
}
exports.default = new DashboardRoutes().router;
