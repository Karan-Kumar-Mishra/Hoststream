"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = delete_site_db;
const model_1 = require("./model");
async function delete_site_db(user_id, site_id) {
    let result = await model_1.UserModel.updateOne({ id: user_id }, { $pull: { 'services.static_site': { id: site_id } } });
    if (result.modifiedCount === 0) {
        console.warn("No document was modified. Check if the user_id or site_id is correct.");
    }
    return result.modifiedCount;
}
