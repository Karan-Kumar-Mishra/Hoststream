"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const get_sites_list = express_1.default.Router();
const Database_1 = __importDefault(require("../Database"));
exports.default = get_sites_list.post('/', (req, res) => {
    Database_1.default.get_sites_list_db(req.body.id).then((ans) => {
        res.send({
            status: "ok",
            URL: ans
        });
    }).catch((err) => {
        console.log(err);
        res.send({
            status: "error",
            error: err
        });
    });
});
