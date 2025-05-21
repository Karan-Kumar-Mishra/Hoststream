
import Database from "../Database";
import deleteFolderRecursive from "./delete_folder.js";
export default async function find_site_folder_and_delete(user_id: string, site_id: string) {
   const location = await Database.get_location(user_id, site_id);
   console.log("location from db for deleteing =>",location);
   
   // deleteFolderRecursive(String(location))
   (async () => {
      await deleteFolderRecursive(String(location));
   })();
}