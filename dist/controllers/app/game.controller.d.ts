import { NextFunction } from "express";
import { ReqInterface, ResInterface } from "../../interfaces/req.interface";
declare class GameController {
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
    updateScore(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
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
    coinUpdate(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    /**
         * @api {get} /api/app/game/game-list Game List
         * @apiHeader {String} App-Version Version Code 1.0.0.
         * @apiVersion 1.0.0
         * @apiName game-list
         * @apiGroup App-Game
         * @apiSuccessExample {json} Success-Response:
           {"status":200,"statusText":"SUCCESS","message":"game list","data":{"execTime":1510}}
    */
    getGameList(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    add(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    list(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    status(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    edit(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
}
declare const _default: GameController;
export default _default;
