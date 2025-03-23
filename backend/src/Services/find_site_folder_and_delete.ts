
import Database from "../Database";
import deleteFolderRecursive from "./delete_folder.js";
export default async function find_site_folder_and_delete(user_id: string, site_id: string) {
   const location = await Database.get_location(user_id, site_id);
   deleteFolderRecursive(String(location)).then((ans) => {
      console.log("ans=>", ans)
   }).catch((err) => {
      console.log("error while deleteing the folder ", err);
   })
}