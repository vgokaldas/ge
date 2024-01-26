
import { Schema, model } from "mongoose";
import { JackPortInterface } from "../interfaces/jp.interface";

const JPSchema = new Schema({
    userId:{
        type: Schema.Types.ObjectId,
        ref: "user",
    },

    GrandScore:{
        type:Number,
        default:0
    },
    MajorScore:{
        type:Number,
        default:0
    },
    MinorScore:{
        type:Number,
        default:0
    },
    MiniScore:{
        type:Number,
        default:0
    },
    MiniShareNum:{
        type:Number,
        default:0
    },
    MaxShareNum:{
        type:Number,
        default:0
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
const JPModel = model<JackPortInterface>("jackPort", JPSchema);
export default JPModel;
