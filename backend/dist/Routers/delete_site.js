"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const delete_site = express_1.default.Router();
const Database_1 = __importDefault(require("../Database"));
const Services_1 = __importDefault(require("../Services"));
const data_1 = require("../Data/data");
exports.default = delete_site.post('/', (req, res) => {
    console.log("get request for delete..");
    if (!req.body || !req.body.user_id || !req.body.site_id) {
        res.send({
            status: "error",
            msg: "Please give the user id and site id !"
        });
    }
    else {
        data_1.locations.user_folder_loactions = req.body.name;
        Services_1.default.find_site_folder_and_delete(req.body.user_id, req.body.site_id);
        Database_1.default.delete_site_db(req.body.user_id, req.body.site_id).then((ans) => {
            if (ans) {
                res.send({
                    status: "ok",
                });
            }
            else {
                res.send({
                    status: "error",
                    msg: "can not find the site !"
                });
            }
        }).catch((err) => {
            res.send({
                status: "error",
                msg: "error while deleteing your site !"
            });
        });
    }
});
