import { Document, ObjectId } from "mongoose";
export interface GameRecordInterface extends Document {
    _id: ObjectId | string;
    userId?: ObjectId | string;
    gameName?: string;
    balance_before_game?: number;
    total_played?: number;
    total_win?: number;
    recording_notes?: string;
    score?: number;
    password?: string;
    createdAt?: Date;
    updated?: Date;
}
