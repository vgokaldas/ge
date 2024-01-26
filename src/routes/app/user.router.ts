import { Router } from "express";
import userController from "../../controllers/app/user.controller";
import authenticationMiddleware from "../../middlewares/authentication.middleware";
import AuthValidator from "../../validators/admin/auth.validator";

class UserRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.postRoute();
    this.getRoute();
    this.putRoutes();
  }

  postRoute() {
    this.router.post(
      "/add-user",
      authenticationMiddleware.user,
      userController.add
    );
    this.router.post(
      "/recharge-amount",
      authenticationMiddleware.user,
      userController.recharge
    );
    this.router.post(
      "/redeem-amount",
      authenticationMiddleware.user,
      userController.redeem
    );
  }

  getRoute() {
    this.router.get(
      "/get-user-list",
      authenticationMiddleware.user,
      userController.list
    );
    // this.router.get(
    //   "/user-game-records",
    //   authenticationMiddleware.user,
    //   userController.gameRecords
    // );
     this.router.get(
      "/user-game-records",
      authenticationMiddleware.user,
      userController.gameRecordsub
    );
    
    this.router.get(
      "/user-transaction-records",
      authenticationMiddleware.user,
      userController.transactionRecordsub
    );
  }
  putRoutes() {
    this.router.put(
      "/edit-user/:id",
      authenticationMiddleware.user,
      userController.edit
    );
    this.router.put(
      "/user-status/:id",
      authenticationMiddleware.user,
      userController.status
    );
    this.router.put(
      "/change-password/:id",
      authenticationMiddleware.user,
      AuthValidator.UserChangePassword,
      userController.changePassword
    );
  }
}

export default new UserRouter().router;
