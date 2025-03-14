"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const create_user = express_1.default.Router();
const create_user_db_js_1 = __importDefault(require("../Database/create_user_db.js"));
const create_user_folder_js_1 = __importDefault(require("../Services/create_user_folder.js"));
const data_js_1 = require("../Data/data.js");
exports.default = create_user.post('/', (req, res) => {
    (0, create_user_db_js_1.default)(req.body).then((ans) => {
        data_js_1.locations.user_folder_loactions = req.body.name;
        (0, create_user_folder_js_1.default)();
        res.send({
            status: "ok"
        });
    }).catch((err) => {
        res.send(err);
    });
});
