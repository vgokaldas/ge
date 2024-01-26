import { ObjectId } from "aws-sdk/clients/codecommit";
import { GameRecordInterface } from "../../interfaces/game-record.interface";
import { ResInterface } from "../../interfaces/req.interface";
import { UserInterface } from "../../interfaces/user.interface";
declare class UserService {
    /**
     * @description listing of user
     * @param queryString req query object
     * @params User id of user
     * @returns
     */
    list(queryString: any): Promise<{
        list: UserInterface[];
        page: number;
        limit: number;
        count: number;
    }>;
    gameRecords(queryString: any): Promise<{
        list: GameRecordInterface[];
        page: number;
        limit: number;
        count: number;
    }>;
    transactionRecords(queryString: any): Promise<{
        list: any;
        page: number;
        limit: number;
        count: number;
    }>;
    changePassword(passwordCurrent: string, adminId: string | ObjectId, res: ResInterface): Promise<{
        user: UserInterface;
    } | void>;
    /**
     * @description get user by id
     * @param id {String} user id for fetching user
     * @returns {Promise<UserInterface>} user data by id
     */
    findUser(id: string | ObjectId): Promise<UserInterface>;
}
declare const _default: UserService;
export default _default;
