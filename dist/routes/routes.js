"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = require("./admin/auth.routes");
const game_routes_1 = require("./admin/game.routes");
const jp_routes_1 = require("./admin/jp.routes");
const user_routes_1 = require("./admin/user.routes");
const auth_router_1 = require("./app/auth.router");
const game_router_1 = require("./app/game.router");
const jp_router_1 = require("./app/jp.router");
const user_router_1 = require("./app/user.router");
const dashboard_routes_1 = require("./admin/dashboard.routes");
class Routes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.app();
        this.admin();
    }
    app() {
        this.router.use('/app/auth', auth_router_1.default);
        this.router.use('/app/game', game_router_1.default);
        this.router.use('/app/jp', jp_router_1.default);
        this.router.use('/app/user', user_router_1.default);
    }
    admin() {
        this.router.use('/admin/auth', auth_routes_1.default);
        this.router.use('/admin/user', user_routes_1.default);
        this.router.use('/admin/game', game_routes_1.default);
        this.router.use('/admin/jp', jp_routes_1.default);
        this.router.use('/admin/dashboard', dashboard_routes_1.default);
    }
}
exports.default = new Routes().router;
