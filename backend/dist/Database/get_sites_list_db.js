"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = get_sites_list_db;
const model_1 = require("./model");
async function get_sites_list_db(id) {
    try {
        const user = await model_1.UserModel.findOne({ id: id }, { 'services.static_site': 1 });
        return user?.services.static_site;
    }
    catch (error) {
        console.error("Error fetching user sites:", error);
        throw error;
    }
}
