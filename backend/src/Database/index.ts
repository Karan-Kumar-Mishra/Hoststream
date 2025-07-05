import connectdb from "./connectdb.js";
import create_user from "./create_user_db.js";
import add_sites from "./add_sites.js";
import add_domain_mapping from "./add_domain_mapping.js";
import get_sites_list_db from "./get_sites_list_db.js";
import delete_site_db from "./delete_site_db.js";
import get_location from "./get_site_folder_location.js";
import find_site from "./find_site.js";
import get_vms from "./get_vms.js";

export default{
    connectdb,
    create_user,
    add_sites,
    add_domain_mapping,
    get_sites_list_db,
    delete_site_db,
    get_location,
    find_site,
    get_vms
}