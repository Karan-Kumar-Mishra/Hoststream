"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = find_user;
const model_js_1 = __importDefault(require("./model.js"));
async function find_user(user) {
    return await model_js_1.default.findOne({ id: user.id });
}
