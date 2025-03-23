"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = create_user_db;
const model_js_1 = require("./model.js");
const find_user_js_1 = __importDefault(require("./find_user.js"));
async function create_user_db(user) {
    if (await (0, find_user_js_1.default)(user) === null) {
        const newuser = new model_js_1.UserModel({
            id: user.id,
            email: user.email,
            name: user.name
        });
        await newuser.save();
    }
}
