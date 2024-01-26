"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const game_model_1 = require("../../models/game.model");
const response_helper_1 = require("../../helpers/response.helper");
const game_service_1 = require("../../services/admin/game.service");
class GameController {
    add(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, icon, type } = req.body;
            try {
                if (yield game_model_1.default.exists({ name }))
                    return response_helper_1.default.conflict(res, res.__('user_already_exist'));
                game_model_1.default.create({ name, icon, type: type ? type : "Other" });
                return response_helper_1.default.created(res, res.__('game_added_successfully'), {});
            }
            catch (error) {
                next(error);
            }
        });
    }
    list(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const queryString = req.query;
                const game = yield game_service_1.default.list(queryString);
                res.logMsg = `Game list fetched successfully`;
                return response_helper_1.default.ok(res, res.__('game_list'), game);
            }
            catch (error) {
                next(error);
            }
        });
    }
    status(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const gameId = req.params.id;
                const game = yield game_model_1.default.findOne({ _id: gameId });
                game.isActive = !game.isActive;
                game.save();
                return response_helper_1.default.ok(res, res.__('game status change successfully'), game);
            }
            catch (error) {
                next(error);
            }
        });
    }
    edit(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, icon, type } = req.body;
                const game = yield game_model_1.default.findOne({ _id: req.params.id });
                (game.name = name ? name : game.name),
                    (game.icon = icon ? icon : game.icon),
                    (game.type = type ? type : game.type),
                    game.save();
                return response_helper_1.default.ok(res, res.__('game update successfully'), game);
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.default = new GameController();
