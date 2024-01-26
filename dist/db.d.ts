import * as mongoose from 'mongoose';
declare class Db {
    DB: mongoose.Mongoose;
    connectDb(url: string): Promise<void>;
}
declare const _default: Db;
export default _default;
