"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Services_1 = __importDefault(require("../Services"));
const delete_container = express_1.default.Router();
exports.default = delete_container.delete('/', (req, res) => {
    // if((!req.body.user_id) || (!req.body.vm_id))
    // {
    //      res.json({
    //         status: "error",
    //         msg:"Please the id for container ?"
    //     })
    // }
    Services_1.default.remove_container(req.body.user_id, req.body.vm_id).then(() => {
        res.json({
            status: "ok"
        });
    }).catch(() => {
        res.json({
            status: "error",
        });
    });
});
