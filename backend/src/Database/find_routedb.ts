import { UserModel } from "./model";
import { site_type } from "../Data/types.js";

export default async function find_routedb(userkey: string, routekey: string) {

    return await UserModel.findOne({
        id: userkey,
        "services.static_site.route": routekey
    }, {
        "services.static_site.$": 1  // This projects only the matching element from the array
    });
}