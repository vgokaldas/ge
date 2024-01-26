import { NextFunction } from "express";
import ResponseHelper from "../../helpers/response.helper";
import { ReqInterface, ResInterface } from "../../interfaces/req.interface";
import GameRecordModel from "../../models/game-record.model";
import UserModel from "../../models/user.model";
import GameModel from "../../models/game.model";
import gameService from "../../services/admin/game.service";

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

  async updateScore(req: ReqInterface, res: ResInterface, next: NextFunction) {
    const {
      score,
      gameName,
      balance_before_game,
      total_played,
      total_win,
      recording_notes,
    } = req.body;
    try {
      const userId = req.user.id;
      // const user = await UserModel.findOne({_id:userId});
      // if(!user) return ResponseHelper.unAuthorize(res,res.__('user_not_exist'));
      // user.balance = Number(user.balance + score);
      // await user.save();
      await GameRecordModel.create({
        userId,
        score,
        gameName,
        balance_before_game,
        total_played,
        total_win,
        recording_notes,
      });
      return ResponseHelper.ok(res, res.__("score_recorded"), {});
    } catch (error) {
      next(error);
    }
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
   async coinUpdate(
    req: ReqInterface,
    res: ResInterface,
    next: NextFunction
  ) {
    const { coin ,type} = req.body;
    try {
      let isUserExist = await UserModel.findOne({
        _id: req.user.id,
      });

      if (!isUserExist)
        return ResponseHelper.unAuthorize(res, res.__("user_not_exist"));
      isUserExist.balance = type =="Win"? isUserExist.balance + coin : isUserExist.balance -coin ;
      isUserExist.totalWin = type =="Win"? isUserExist.totalWin + 1 :isUserExist.totalWin ;
      isUserExist.totalLost = type !="Win"? isUserExist.totalLost + 1 :isUserExist.totalLost ;
      isUserExist.totalGame =  isUserExist.totalGame + 1 ;
      isUserExist.save();
      return ResponseHelper.ok(res, "Balance update Successfully", isUserExist);
    } catch (err) {
      next(err);
    }
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
  async getGameList(req: ReqInterface, res: ResInterface, next: NextFunction) {
    try {
      const game = await GameModel.find({});
      return ResponseHelper.ok(res, "list", game);
    } catch (error) {
      next(error);
    }
  }

  async add(req: ReqInterface, res: ResInterface, next: NextFunction) {
    const {name,icon} = req.body
    try {
        if(await GameModel.exists({name})) return ResponseHelper.conflict(res,res.__('user_already_exist'));
        
        GameModel.create({name,icon});
        return ResponseHelper.created(res,res.__('game_added_successfully'),{})

    } catch (error) {
        next(error);
    }
}

async list(req: ReqInterface, res: ResInterface, next: NextFunction) {
    try {
        const queryString = req.query;
        const game = await gameService.list(queryString);
        res.logMsg = `Game list fetched successfully`;
        return ResponseHelper.ok(res, res.__('game_list'), game);

    } catch (error) {
        next(error)
    }
}
async status(req: ReqInterface, res: ResInterface, next: NextFunction) {
    try {
        const gameId = req.params.id;
        const game = await GameModel.findOne({_id:gameId});
        game.isActive = !game.isActive
        game.save();
        return ResponseHelper.ok(res, res.__('game status change successfully'), game);

    } catch (error) {
        next(error)
    }
}

 async edit(req: ReqInterface, res: ResInterface, next: NextFunction) {
    try {
      const { name ,icon} = req.body;
      const game = await GameModel.findOne({ _id: req.params.id });
        (game.name = name ? name : game.name),
        (game.icon = icon ? icon : game.icon),
        game.save();
        return ResponseHelper.ok(res, res.__('game update successfully'), game);
    } catch (err) {
      next(err);
    }
  }


}
export default new GameController();
