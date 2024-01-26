import { NextFunction } from "express";
import { ReqInterface, ResInterface } from "../../interfaces/req.interface";
import GameModel from "../../models/game.model";
import ResponseHelper from "../../helpers/response.helper";
import gameService from "../../services/admin/game.service";

class GameController {

    async add(req: ReqInterface, res: ResInterface, next: NextFunction) {
        const {name,icon,type} = req.body
        try {
            if(await GameModel.exists({name})) return ResponseHelper.conflict(res,res.__('user_already_exist'));
            
            GameModel.create({name,icon,type : type ? type :"Other"});
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
          const { name ,icon,type} = req.body;
          const game = await GameModel.findOne({ _id: req.params.id });
            (game.name = name ? name : game.name),
            (game.icon = icon ? icon : game.icon),
            (game.type = type ? type : game.type),
            game.save();
            return ResponseHelper.ok(res, res.__('game update successfully'), game);
        } catch (err) {
          next(err);
        }
      }
    
    

}

export default new GameController();

