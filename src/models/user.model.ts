
import { Schema, model } from "mongoose";
import { UserInterface } from "../interfaces/user.interface";

const UserSchema = new Schema({

    userName:{
      type:String
    },
    parentId:{
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    nickName:{
      type:String
    },
    password:{
      type:String
    },
    userId:{
      type:String,
      required:true
    },
    balance:{
      type:Number,
      default:0
    },
    roleType:{
      type:String,
      enum:['VENDOR','STORE','USER']
    },
    profilePic:{
      type:String
  },
  verification_code:{
      type:String
  },
  totalGame:{
    type:Number,
    default:0
  },
  totalWin:{
    type:Number,
    default:0
  },
  totalLost:{
    type:Number,
    default:0
  },
    isActive: {
        type: Boolean,
        default: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    lastLogin: {
      type: Date,
      default: Date.now,
  },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    timestamps: {
        type: String,
        default: Math.round(new Date().getTime()),
    },
}
);
UserSchema.index({ userId: 1 });
const UserModel = model<UserInterface>("user", UserSchema);
export default UserModel;
