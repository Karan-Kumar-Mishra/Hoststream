import { UserModel } from "./model";
import { site_type } from "../Data/types.js";

export default async function add_sites(new_site: site_type, key: string) {
    await UserModel.updateOne(
        { id: key },
        { $push: { "services.static_site": new_site } }
    );
}