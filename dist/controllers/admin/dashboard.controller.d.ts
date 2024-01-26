import { NextFunction } from "express";
import { ReqInterface, ResInterface } from "../../interfaces/req.interface";
declare class DashboardController {
    getAdminDashboard(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    getSubAdminDashboard(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
}
declare const _default: DashboardController;
export default _default;
