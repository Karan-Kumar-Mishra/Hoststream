import { UserModel } from "./model";
import { site_type } from "../Data/types.js";

export default async function find_site(userkey: string, sitekey: string) {
    console.log("user id: ", userkey, "site_id: ", sitekey);
    return await UserModel.findOne({
        id: userkey,
        "services.static_site.id": sitekey
    }, {
        "services.static_site.$": 1  // This projects only the matching element from the array
    });
}