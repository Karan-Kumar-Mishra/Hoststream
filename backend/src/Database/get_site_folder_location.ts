import { UserModel } from "./model";
import { User } from "../Data/inteface.js";
import path from 'path';

export default async function get_location(user_id: string, site_id: string): Promise<string | undefined> {
    const result = await UserModel.findOne({ id: user_id }) as User | null;
    const result_list = result?.services?.static_site;
   // console.log("result list =>", result_list);

    const findsite = result_list?.find((item) => item.id === site_id); // Using find instead of filter
    console.log("find site=>", findsite);

    if (findsite && 'site_folder' in findsite) {
        console.log("location obj =>", findsite.site_folder);
        const location = path.join(__dirname, '..', findsite.site_folder);
        return location;
    } else {
        console.log("location obj not found or invalid");
        return undefined; // Explicitly return undefined
    }
}