import { Router } from "express";
import jpController from "../../controllers/app/jp.controller";
import authenticationMiddleware from "../../middlewares/authentication.middleware";
import jpValidator from "../../validators/app/jp.validator";


class JPRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.postRoutes();
        this.getRoutes();

    }

    postRoutes(){
        this.router.post(
            '/choose-jack-port',
            authenticationMiddleware.user,
            jpValidator.chooseJP,
            jpController.chooseJP
        )
    }
    getRoutes(){
        this.router.get(
            '/get-jack-port-detail',
            authenticationMiddleware.user,
            jpController.getJackPortDetail
           );
    }

    
}

export default new JPRouter().router;