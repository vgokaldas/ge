import { Router } from "express";
import dashboardController from "../../controllers/admin/dashboard.controller";
import authenticationMiddleware from "../../middlewares/authentication.middleware";

class DashboardRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.postRoute();
    this.getRoute();
  }

  postRoute() {}
  getRoute() {
    this.router.get(
      "/get-admin-dashboard",
        authenticationMiddleware.admin,
      dashboardController.getAdminDashboard
    );
    this.router.get(
      "/get-subadmin-dashboard",
      authenticationMiddleware.user,
      dashboardController.getSubAdminDashboard
    );
  }
}

export default new DashboardRoutes().router;
