import { Router } from "express";
import AuthRoutes from "./admin/auth.routes";
import gameRoutes from "./admin/game.routes";
import jpRoutes from "./admin/jp.routes";
import userRoutes from "./admin/user.routes";
import AuthRouter from "./app/auth.router";
import gameRouter from "./app/game.router";
import jpRouter from "./app/jp.router";
import userRouter from "./app/user.router";
import dashboardRoutes from "./admin/dashboard.routes";


class Routes {
  public router: Router;
  constructor() {
    this.router = Router();
    this.app();
    this.admin();
  }

  app() {
    this.router.use('/app/auth', AuthRouter);
    this.router.use('/app/game', gameRouter);
    this.router.use('/app/jp',jpRouter);
    this.router.use('/app/user',userRouter)

    
  }

  admin() {
    this.router.use('/admin/auth', AuthRoutes);
    this.router.use('/admin/user',userRoutes);
    this.router.use('/admin/game',gameRoutes);
    this.router.use('/admin/jp',jpRoutes);
    this.router.use('/admin/dashboard',dashboardRoutes)
  }

}
export default new Routes().router;