"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = get_location;
const model_1 = require("./model");
const path_1 = __importDefault(require("path"));
async function get_location(user_id, site_id) {
    const result = await model_1.UserModel.findOne({ id: user_id });
    const result_list = result?.services?.static_site;
    // console.log("result list =>", result_list);
    const findsite = result_list?.find((item) => item.id === site_id); // Using find instead of filter
    console.log("find site=>", findsite);
    if (findsite && 'site_folder' in findsite) {
        console.log("location obj =>", findsite.site_folder);
        const location = path_1.default.join(__dirname, '..', findsite.site_folder);
        return location;
    }
    else {
        console.log("location obj not found or invalid");
        return undefined; // Explicitly return undefined
    }
}
