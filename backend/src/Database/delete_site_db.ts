import { UserModel } from "./model";

export default async function delete_site_db(user_id: string, site_id: string) {
    let result = await UserModel.updateOne(
        { id: user_id }, 
        { $pull: { 'services.static_site': { id: site_id } } } 
    );

    if (result.modifiedCount === 0) {
        console.warn("No document was modified. Check if the user_id or site_id is correct.");
    }
    return result.modifiedCount; 
}