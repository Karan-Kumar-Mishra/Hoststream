"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = add_sites;
const model_1 = require("./model");
async function add_sites(new_site, key) {
    await model_1.UserModel.updateOne({ id: key }, { $push: { "services.static_site": new_site } });
}
