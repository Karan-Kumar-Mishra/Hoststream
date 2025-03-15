"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const host_site = express_1.default.Router();
const multer_1 = __importDefault(require("multer"));
const data_js_1 = require("../Data/data.js");
const Services_1 = __importDefault(require("../Services"));
const data_js_2 = require("../Data/data.js");
const upload = (0, multer_1.default)({ storage: data_js_1.storage });
const index_js_1 = __importDefault(require("../Database/index.js"));
exports.default = host_site.post('/', (req, res, next) => {
    Services_1.default.setup_site_folder();
    //setup the site folder name 
    next();
}, upload.array('files', 10), (req, res) => {
    const new_site = {
        website_name: req.body.websiteName,
        site_folder: `/uploads/${data_js_2.locations.user_folder_loactions}/${data_js_2.locations.user_site_loactions}`,
        route: `/${Services_1.default.generate_name(10)}`
    };
    index_js_1.default.add_sites(new_site, req.body.id);
    console.log(new_site);
    Services_1.default.route_for_site(new_site);
    res.send({
        status: "ok",
    });
});
