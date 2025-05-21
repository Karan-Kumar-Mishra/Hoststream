import { UserModel } from "./model";

export default async function get_sites_list_db(id: string) {
    try {
        const user = await UserModel.findOne({ id: id }, { 'services.static_site': 1 });
        return user?.services.static_site;
    } catch (error) {
        console.error("Error fetching user sites:", error);
        throw error;
    }
}