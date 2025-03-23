"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const create_user_folder_js_1 = __importDefault(require("./create_user_folder.js"));
const generate_name_js_1 = __importDefault(require("./generate_name.js"));
const setup_site_folder_js_1 = __importDefault(require("./setup_site_folder.js"));
const get_server_js_1 = __importDefault(require("./get_server.js"));
const route_for_site_js_1 = __importDefault(require("./route_for_site.js"));
const get_url_with_domain_js_1 = __importDefault(require("./get_url_with_domain.js"));
const delete_folder_js_1 = __importDefault(require("./delete_folder.js"));
const find_site_folder_and_delete_js_1 = __importDefault(require("./find_site_folder_and_delete.js"));
exports.default = {
    create_user_folder: create_user_folder_js_1.default,
    generate_name: generate_name_js_1.default,
    setup_site_folder: setup_site_folder_js_1.default,
    get_server: get_server_js_1.default,
    route_for_site: route_for_site_js_1.default,
    get_url_with_domain: get_url_with_domain_js_1.default,
    deleteFolderRecursive: delete_folder_js_1.default,
    find_site_folder_and_delete: find_site_folder_and_delete_js_1.default
};
