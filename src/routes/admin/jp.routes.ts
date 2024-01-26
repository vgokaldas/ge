import { Router } from "express";
import jpController from "../../controllers/admin/jp.controller";
import authenticationMiddleware from "../../middlewares/authentication.middleware";

class JPRoutes {
    public router: Router;

    constructor() {
        this.router = Router();
        this.postRoute();
        this.getRoute();
        this.putRoute();

    }

    postRoute(){
        this.router.post(
            '/update-jp',
            authenticationMiddleware.user,
            jpController.updateJP
        )
    }

    getRoute(){
        this.router.get(
            '/get-jp-record',
            authenticationMiddleware.user,
            jpController.jpRecord
        )
        this.router.get(
            '/get-jp-detail',
            authenticationMiddleware.user,
            jpController.getJackPortDetail
        )
    }
    putRoute(){
        
    }

}

export default new JPRoutes().router;