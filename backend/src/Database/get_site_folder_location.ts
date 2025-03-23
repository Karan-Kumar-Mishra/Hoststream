import { UserModel } from "./model";
import {User} from "../Data/inteface.js";
const path = require('path');
export default async function get_location(user_id: string, site_id: string) {
    // Fetch the user document with the matching static_site
    const result = await UserModel.findOne(
        { id: user_id, 'services.static_site.id': site_id },
        { 'services.static_site.$': 1 }
    ) as User | null; // Assert the type of the result

    // Extract the specific static_site object
    const staticSite = result?.services?.static_site?.[0];

    // Check if staticSite exists and has the site_folder property
    if (staticSite && 'site_folder' in staticSite) {
        console.log("location obj =>", staticSite.site_folder);
        const location= path.join(__dirname, staticSite.site_folder);
        return location;
    } else {
        console.log("location obj not found or invalid");
    }
}