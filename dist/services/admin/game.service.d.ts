import { UserInterface } from "../../interfaces/user.interface";
declare class GameService {
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
}
declare const _default: GameService;
export default _default;
