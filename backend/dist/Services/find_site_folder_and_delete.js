"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = find_site_folder_and_delete;
const Database_1 = __importDefault(require("../Database"));
const delete_folder_js_1 = __importDefault(require("./delete_folder.js"));
async function find_site_folder_and_delete(user_id, site_id) {
    const location = await Database_1.default.get_location(user_id, site_id);
    // deleteFolderRecursive(String(location))
    (async () => {
        await (0, delete_folder_js_1.default)(String(location));
    })();
}
