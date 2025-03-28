"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const index_js_1 = __importDefault(require("./Routers/index.js"));
const body_parser_1 = __importDefault(require("body-parser"));
const index_js_2 = __importDefault(require("./Database/index.js"));
const get_server_js_1 = __importDefault(require("./Services/get_server.js"));
const path_1 = __importDefault(require("path"));
// const server=express();
dotenv_1.default.config();
dotenv_1.default.config({
    path: path_1.default.resolve(__dirname, '../.env')
});
get_server_js_1.default.use((0, cors_1.default)());
index_js_2.default.connectdb();
get_server_js_1.default.use(body_parser_1.default.json());
get_server_js_1.default.use(body_parser_1.default.urlencoded({ extended: true }));
get_server_js_1.default.use(express_1.default.json());
get_server_js_1.default.use('/create_user', index_js_1.default.create_user);
get_server_js_1.default.use('/host_site', index_js_1.default.host_site);
get_server_js_1.default.use('/get_sites_list', index_js_1.default.get_sites_list);
get_server_js_1.default.use('/delete_site', index_js_1.default.delete_site);
get_server_js_1.default.use('/setup_folder', index_js_1.default.setup_folder);
const port = process.env.PORT || 88;
get_server_js_1.default.listen(port, () => {
    console.log(`Server is running on ${port} ....`);
});
