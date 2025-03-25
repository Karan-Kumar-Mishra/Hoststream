"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = get_location;
const model_1 = require("./model");
const path = require('path');
async function get_location(user_id, site_id) {
    const result = await model_1.UserModel.findOne({ id: user_id, 'services.static_site.id': site_id }, { 'services.static_site.$': 1 });
    const staticSite = result?.services?.static_site?.[0];
    if (staticSite && 'site_folder' in staticSite) {
        console.log("location obj =>", staticSite.site_folder);
        const location = path.join(__dirname, '..', staticSite.site_folder);
        return location;
    }
    else {
        console.log("location obj not found or invalid");
    }
}
