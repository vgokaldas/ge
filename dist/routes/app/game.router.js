"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const game_controller_1 = require("../../controllers/app/game.controller");
const authentication_middleware_1 = require("../../middlewares/authentication.middleware");
const game_validators_1 = require("../../validators/app/game.validators");
class GameRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.postRoutes();
        this.getRoutes();
    }
    postRoutes() {
        this.router.post('/update-score', authentication_middleware_1.default.user, game_validators_1.default.updateScore, game_controller_1.default.updateScore);
        this.router.post('/coin-update', authentication_middleware_1.default.user, game_validators_1.default.coinUpdate, game_controller_1.default.coinUpdate);
    }
    getRoutes() {
        this.router.get('/game-list', game_controller_1.default.getGameList);
        this.router.get('/get-game-list', authentication_middleware_1.default.user, game_controller_1.default.list);
    }
    putRoute() {
        this.router.put('/change-status/:id', authentication_middleware_1.default.admin, game_controller_1.default.status);
        this.router.put('/edit-game/:id', authentication_middleware_1.default.admin, game_controller_1.default.edit);
    }
}
exports.default = new GameRouter().router;
