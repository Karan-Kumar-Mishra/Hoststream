"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const create_site_js_1 = __importDefault(require("./create_site.js"));
const create_user_js_1 = __importDefault(require("./create_user.js"));
const host_site_js_1 = __importDefault(require("./host_site.js"));
const get_sites_list_js_1 = __importDefault(require("./get_sites_list.js"));
const delete_site_js_1 = __importDefault(require("./delete_site.js"));
const setup_folder_js_1 = __importDefault(require("./setup_folder.js"));
exports.default = {
    create_site: create_site_js_1.default,
    create_user: create_user_js_1.default,
    get_sites_list: get_sites_list_js_1.default,
    host_site: host_site_js_1.default,
    delete_site: delete_site_js_1.default,
    setup_folder: setup_folder_js_1.default
};
