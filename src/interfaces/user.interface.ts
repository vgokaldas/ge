import { Document, ObjectId } from "mongoose";

export interface UserInterface extends Document {
  _id: ObjectId | string;
  parentId:ObjectId | string;
  userName?: string;
  nickName?: string;
  password?: string;
  userId?: string;
  roleType:string;
  balance?:number;
  isActive?: boolean;
  lastLogin?: Date;
  createdAt?: Date;
  updated?: Date;
  profilePic:string;
verification_code:string;
totalGame:number;
totalWin:number;
totalLost:number
}