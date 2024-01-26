import { Router } from "express";
import userController from "../../controllers/admin/user.controller";
import authenticationMiddleware from "../../middlewares/authentication.middleware";
import AuthValidator from "../../validators/admin/auth.validator"

class UserRoutes {
    public router: Router;

    constructor() {
        this.router = Router();
        this.postRoute();
        this.getRoute();
        this.putRoutes();

    }

    postRoute(){
        this.router.post(
            '/add-user',
            authenticationMiddleware.admin,
            userController.add
        );
        this.router.post(
            '/recharge-amount',
            authenticationMiddleware.admin,
            userController.recharge
        );
        this.router.post(
            '/redeem-amount',
            authenticationMiddleware.admin,
            userController.redeem
        );
    }

    getRoute(){
        this.router.get(
            '/get-user-list',
            authenticationMiddleware.admin,
            userController.list
        )
        this.router.get(
            '/user-game-records',
            authenticationMiddleware.admin,
            userController.gameRecords
        )
        this.router.get(
            '/user-transaction-records',
            authenticationMiddleware.admin,
            userController.transactionRecords
        )
    }
    putRoutes(){
        this.router.put(
            '/edit-user/:id',
            authenticationMiddleware.admin,
            userController.edit
        )
        this.router.put(
            '/user-status/:id',
            authenticationMiddleware.admin,
            userController.status
        )
        this.router.put(
            '/change-password/:id',
            authenticationMiddleware.admin,
            AuthValidator.UserChangePassword,
            userController.changePassword
        );
    }

}

export default new UserRoutes().router;