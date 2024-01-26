import Joi = require("joi");
import { ResInterface } from "../interfaces/req.interface";
export declare const validate: (body: any, res: ResInterface, schema: Joi.Schema) => Promise<boolean>;
