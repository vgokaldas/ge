import { Router } from "express";
import gameController from "../../controllers/admin/game.controller";
// import authenticationMiddleware from "../../middlewares/authentication.middleware";

class GameRoutes {
    public router: Router;

    constructor() {
        this.router = Router();
        this.postRoute();
        this.getRoute();
        this.putRoute();

    }

    postRoute(){
        this.router.post(
            '/add-game',
            // authenticationMiddleware.admin,
            gameController.add
        );
    }

    getRoute(){
        this.router.get(
            '/get-game-list',
            // authenticationMiddleware.admin,
            gameController.list
        )
    }
    putRoute(){
        this.router.put(
            '/change-status/:id',
            // authenticationMiddleware.admin,
            gameController.status
        )
        this.router.put(
            '/edit-game/:id',
            // authenticationMiddleware.admin,
            gameController.edit
        );
    }

}

export default new GameRoutes().router;