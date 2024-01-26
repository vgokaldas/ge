import { ReqInterface, ResInterface } from "../interfaces/req.interface";
import { NextFunction } from "express";
import DataDog from "../utils/logger.util";


export const logger = (req: ReqInterface, res: ResInterface, next: NextFunction) => {
  const logger = new DataDog(req)
  res.logger = logger;
  next();
}







