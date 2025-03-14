"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const host_site = express_1.default.Router();
const multer_1 = __importDefault(require("multer"));
const data_js_1 = require("../Data/data.js");
const data_js_2 = require("../Data/data.js");
const generate_name_js_1 = __importDefault(require("../Services/generate_name.js"));
const upload = (0, multer_1.default)({ storage: data_js_1.storage });
exports.default = host_site.post('/', (req, res, next) => {
    data_js_2.locations.user_site_loactions = (0, generate_name_js_1.default)();
    next();
}, upload.array('files'), (req, res) => {
    const files = req.files;
    const websiteName = req.body.websiteName;
    const domainName = req.body.domainName;
    const username = req.body.username;
    data_js_2.locations.user_folder_loactions = username;
    res.send({
        status: "ok",
    });
});
