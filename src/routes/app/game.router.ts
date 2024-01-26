import { Router } from "express";
import gameController from "../../controllers/app/game.controller";
import authenticationMiddleware from "../../middlewares/authentication.middleware";
import gameValidators from "../../validators/app/game.validators";

class GameRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.postRoutes();
        this.getRoutes();

    }

    postRoutes(){
       this.router.post(
        '/update-score',
        authenticationMiddleware.user,
        gameValidators.updateScore,
        gameController.updateScore
       );
       this.router.post(
        '/coin-update',
        authenticationMiddleware.user,
        gameValidators.coinUpdate,
        gameController.coinUpdate
       );
   
    }
    getRoutes(){
        this.router.get(
            '/game-list',
            gameController.getGameList
           );
           this.router.get(
            '/get-game-list',
            authenticationMiddleware.user,
            gameController.list
        )
    }
    putRoute(){
        this.router.put(
            '/change-status/:id',
            authenticationMiddleware.admin,
            gameController.status
        )
        this.router.put(
            '/edit-game/:id',
            authenticationMiddleware.admin,
            gameController.edit
        );
    }

    
}

export default new GameRouter().router;