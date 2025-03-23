"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connectdb_js_1 = __importDefault(require("./connectdb.js"));
const create_user_db_js_1 = __importDefault(require("./create_user_db.js"));
const add_sites_js_1 = __importDefault(require("./add_sites.js"));
const add_domain_mapping_js_1 = __importDefault(require("./add_domain_mapping.js"));
const get_sites_list_db_js_1 = __importDefault(require("./get_sites_list_db.js"));
const delete_site_db_js_1 = __importDefault(require("./delete_site_db.js"));
const get_site_folder_location_js_1 = __importDefault(require("./get_site_folder_location.js"));
exports.default = {
    connectdb: connectdb_js_1.default,
    create_user: create_user_db_js_1.default,
    add_sites: add_sites_js_1.default,
    add_domain_mapping: add_domain_mapping_js_1.default,
    get_sites_list_db: get_sites_list_db_js_1.default,
    delete_site_db: delete_site_db_js_1.default,
    get_location: get_site_folder_location_js_1.default
};
