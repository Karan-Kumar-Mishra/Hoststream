"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = add_sites;
const model_1 = __importDefault(require("./model"));
async function add_sites(new_site, key) {
    await model_1.default.updateOne({ id: key }, { $push: { "services.static_site": new_site } });
}
