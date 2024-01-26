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
const response_helper_1 = require("../../helpers/response.helper");
const game_record_model_1 = require("../../models/game-record.model");
const user_model_1 = require("../../models/user.model");
const game_model_1 = require("../../models/game.model");
const game_service_1 = require("../../services/admin/game.service");
class GameController {
    /**
         * @api {post} /api/app/game/update-score Update Score
         * @apiHeader {String} App-Version Version Code 1.0.0.
         * @apiVersion 1.0.0
         * @apiHeader {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYmZlMGNmMTdiYmU2ZjY2NzI3MzlmMyIsImVtYWlsIjoiYWRtaW5Ad2VmdW5kdXMuY29tIiwiaWF..........
         * @apiName update-score
         * @apiGroup App-Game
         * @apiParamExample {json} Request-Body:
         * {
            "score":10,
            "gameName":"spin",
            "balance_before_game":20,
            "total_played":45,
            "total_win":78,
            "recording_notes":"checkin"
           }
         * @apiSuccessExample {json} Success-Response:
           {"status":200,"statusText":"SUCCESS","message":"score_recorded","data":{"execTime":1510}}
    */
    updateScore(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { score, gameName, balance_before_game, total_played, total_win, recording_notes, } = req.body;
            try {
                const userId = req.user.id;
                // const user = await UserModel.findOne({_id:userId});
                // if(!user) return ResponseHelper.unAuthorize(res,res.__('user_not_exist'));
                // user.balance = Number(user.balance + score);
                // await user.save();
                yield game_record_model_1.default.create({
                    userId,
                    score,
                    gameName,
                    balance_before_game,
                    total_played,
                    total_win,
                    recording_notes,
                });
                return response_helper_1.default.ok(res, res.__("score_recorded"), {});
            }
            catch (error) {
                next(error);
            }
        });
    }
    /**
         * @api {post} /api/app/game/coin-update Coin Update
         * @apiHeader {String} App-Version Version Code 1.0.0.
         * @apiVersion 1.0.0
         * @apiHeader {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYmZlMGNmMTdiYmU2ZjY2NzI3MzlmMyIsImVtYWlsIjoiYWRtaW5Ad2VmdW5kdXMuY29tIiwiaWF..........
         * @apiName coin-update
         * @apiGroup App-Game
         * @apiBody {String} coin coin
         * @apiBody {String} type type (Win,Deduct)
         * @apiParamExample {json} Request-Body:
         *{"coin":20,type:"Win"}
         * @apiSuccessExample {json} Success-Response:
           {"status":200,"statusText":"SUCCESS","message":"Coin Updated Succsessfully","data":{"user":{"_id":"6453f2a423db131d315b5c43","coin":20,"email":"qwe@gmail.com","password":"$2b$10$OvGaVXf9P6kJ05.24YlcG.bsJFcxZV2IrVHEkpRLxDhSKXGfj.WSG","userName":"Test","created_at":"2023-05-04T18:00:04.154Z","updated_at":"2023-05-04T18:00:04.154Z","__v":0,"id":"6453f2a423db131d315b5c43"},"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NTNmMmE0MjNkYjEzMWQzMTViNWM0MyIsImVtYWlsIjoicXdlQGdtYWlsLmNvbSIsImlhdCI6MTY4MzIyNDI0MywiZXhwIjoxNjgzMzEwNjQzfQ.wN4k_PkVohdmt2ctzZorO_bmSfIsHCeuorh1s6h8np8"},"exeTime":566}
    */
    coinUpdate(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { coin, type } = req.body;
            try {
                let isUserExist = yield user_model_1.default.findOne({
                    _id: req.user.id,
                });
                if (!isUserExist)
                    return response_helper_1.default.unAuthorize(res, res.__("user_not_exist"));
                isUserExist.balance = type == "Win" ? isUserExist.balance + coin : isUserExist.balance - coin;
                isUserExist.totalWin = type == "Win" ? isUserExist.totalWin + 1 : isUserExist.totalWin;
                isUserExist.totalLost = type != "Win" ? isUserExist.totalLost + 1 : isUserExist.totalLost;
                isUserExist.totalGame = isUserExist.totalGame + 1;
                isUserExist.save();
                return response_helper_1.default.ok(res, "Balance update Successfully", isUserExist);
            }
            catch (err) {
                next(err);
            }
        });
    }
    /**
         * @api {get} /api/app/game/game-list Game List
         * @apiHeader {String} App-Version Version Code 1.0.0.
         * @apiVersion 1.0.0
         * @apiName game-list
         * @apiGroup App-Game
         * @apiSuccessExample {json} Success-Response:
           {"status":200,"statusText":"SUCCESS","message":"game list","data":{"execTime":1510}}
    */
    getGameList(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const game = yield game_model_1.default.find({});
                return response_helper_1.default.ok(res, "list", game);
            }
            catch (error) {
                next(error);
            }
        });
    }
    add(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, icon } = req.body;
            try {
                if (yield game_model_1.default.exists({ name }))
                    return response_helper_1.default.conflict(res, res.__('user_already_exist'));
                game_model_1.default.create({ name, icon });
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
                const { name, icon } = req.body;
                const game = yield game_model_1.default.findOne({ _id: req.params.id });
                (game.name = name ? name : game.name),
                    (game.icon = icon ? icon : game.icon),
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
