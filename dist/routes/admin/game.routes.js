"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const game_controller_1 = require("../../controllers/admin/game.controller");
// import authenticationMiddleware from "../../middlewares/authentication.middleware";
class GameRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.postRoute();
        this.getRoute();
        this.putRoute();
    }
    postRoute() {
        this.router.post('/add-game', 
        // authenticationMiddleware.admin,
        game_controller_1.default.add);
    }
    getRoute() {
        this.router.get('/get-game-list', 
        // authenticationMiddleware.admin,
        game_controller_1.default.list);
    }
    putRoute() {
        this.router.put('/change-status/:id', 
        // authenticationMiddleware.admin,
        game_controller_1.default.status);
        this.router.put('/edit-game/:id', 
        // authenticationMiddleware.admin,
        game_controller_1.default.edit);
    }
}
exports.default = new GameRoutes().router;
