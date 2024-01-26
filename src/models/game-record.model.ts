
import { Schema, model } from "mongoose";


const GameRecordSchema = new Schema({

    userId: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },
    gameName:{
      type:String
    },
    balance_before_game:{
        type:Number,
        default:0
    },
    total_played:{
        type:Number,
        default:0
    },
    total_win:{
        type:Number,
        default:0
    },
    score:{
        type:Number,
        default:0
      },
    recording_notes:{
        type:String
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
const GameRecordModel = model("gameRecord", GameRecordSchema);
export default GameRecordModel;
