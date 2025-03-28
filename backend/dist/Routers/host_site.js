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
const create_user_folder_js_1 = __importDefault(require("../Services/create_user_folder.js"));
exports.default = host_site.post('/', (req, res, next) => {
    // locations.user_folder_loactions = req.body.user_name;
    (0, create_user_folder_js_1.default)();
    Services_1.default.setup_site_folder();
    next();
}, upload.array('files', 10), (req, res) => {
    const route = Services_1.default.generate_name(10);
    const new_site = {
        id: Services_1.default.generate_name(20),
        website_name: req.body.websiteName,
        site_folder: `/uploads/${data_js_2.locations.user_folder_loactions}/${data_js_2.locations.user_site_loactions}`,
        route: `/${route}`,
        URL: `http://localhost:88/${route}`,
        Date: new Date().toLocaleDateString()
    };
    index_js_1.default.add_sites(new_site, req.body.id);
    // console.log(new_site);
    Services_1.default.route_for_site(new_site);
    // Services.get_url_with_domain(`http://localhost${new_site.route}`);
    // Database.add_domain_mapping({
    //     subdomain:`${Services.generate_name(6)}`,
    //     targetURL:`http://localhost${new_site.route}`
    // }).then((ans)=>{
    //     console.log("ans",ans);
    // }).catch((err)=>{
    //     console.log("err",err);
    // })
    res.send({
        status: "ok",
        site: new_site
    });
});
