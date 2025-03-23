"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const delete_site = express_1.default.Router();
const Database_1 = __importDefault(require("../Database"));
const Services_1 = __importDefault(require("../Services"));
exports.default = delete_site.post('/', (req, res) => {
    if (!req.body || !req.body.user_id || !req.body.site_id) {
        res.send({
            status: "error",
            msg: "Please give the user id and site id !"
        });
    }
    else {
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
