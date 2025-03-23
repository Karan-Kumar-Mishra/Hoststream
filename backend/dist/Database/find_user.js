"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = find_user;
const model_js_1 = require("./model.js");
async function find_user(user) {
    return await model_js_1.UserModel.findOne({ id: user.id });
}
