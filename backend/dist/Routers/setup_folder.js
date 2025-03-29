"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const setup_folder = express_1.default.Router();
const data_1 = require("../Data/data");
const Services_1 = __importDefault(require("../Services"));
const create_user_folder_js_1 = __importDefault(require("../Services/create_user_folder.js"));
exports.default = setup_folder.post('/', (req, res) => {
    data_1.locations.user_folder_loactions = req.body.name;
    (0, create_user_folder_js_1.default)();
    Services_1.default.setup_site_folder();
    res.send({
        status: "ok"
    });
});
