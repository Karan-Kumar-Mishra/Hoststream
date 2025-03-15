"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = setup_site_folder;
const data_1 = require("../Data/data");
const generate_name_js_1 = __importDefault(require("./generate_name.js"));
function setup_site_folder() {
    data_1.locations.user_site_loactions = (0, generate_name_js_1.default)();
}
