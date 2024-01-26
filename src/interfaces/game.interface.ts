
import { Document, ObjectId } from "mongoose";

export interface GameInterface extends Document {
  _id: ObjectId | string;
  name:string,
  icon:string,
  isActive:boolean,
  createdAt?: Date;
  updated?: Date;
  type:string;
}