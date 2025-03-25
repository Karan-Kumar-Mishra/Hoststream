import { UserModel } from "./model";
import {User} from "../Data/inteface.js";
const path = require('path');
export default async function get_location(user_id: string, site_id: string) {
    
    const result = await UserModel.findOne(
        { id: user_id, 'services.static_site.id': site_id },
        { 'services.static_site.$': 1 }
    ) as User | null;


    const staticSite = result?.services?.static_site?.[0];
    if (staticSite && 'site_folder' in staticSite) {
        console.log("location obj =>", staticSite.site_folder);
        const location= path.join(__dirname,'..', staticSite.site_folder);
        return location;
    } else {
        console.log("location obj not found or invalid");
    }
}