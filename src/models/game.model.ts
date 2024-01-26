
import { Schema, model } from "mongoose";
import { GameInterface } from "../interfaces/game.interface";

const GameSchema = new Schema({

    name: {
        type: String
    },
    icon:{
        type:String,
        default:null
    },
    type:{
        type:String,
        default:null
    },
    isActive:{
        type:Boolean,
        default:true
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
const GameModel = model<GameInterface>("game", GameSchema);
export default GameModel;
