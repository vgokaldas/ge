

import { UserInterface } from "../../interfaces/user.interface";
import GameModel from "../../models/game.model";
import { ApiFeatures } from "../../utils/api-features.util";



class GameService {

    /**
   * @description listing of user
   * @param queryString req query object
   * @params User id of user
   * @returns 
   */

    async list(
        queryString: any,
    ): Promise<{ list: UserInterface[],page:number,limit:number ,count: number}> {
        const page = queryString.page * 1 || 1;
        const limit = queryString.limit * 1 || 10;
        // let skip = (page - 1) * limit;

        const countQuery = GameModel.find({ });
        const sorting = queryString.sort || '-createdAt';
        const countFeature = new ApiFeatures(countQuery, queryString)
            .filtering()
            .searching(['name'])
            .sorting(sorting)
            .getCount();

        const lisQuery = GameModel.find({  });
        const listFeature = new ApiFeatures(lisQuery, queryString)
            .filtering()
            .searching(['name'])
            .sorting(sorting)
            .fieldsLimiting()
            .pagination();

        const count = await countFeature.query;
        const list = await listFeature.query;

        return { list, page, limit,count };
    }
}
export default new GameService();