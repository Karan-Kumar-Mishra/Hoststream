"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Services_1 = __importDefault(require("../Services"));
const stop_container = express_1.default.Router();
exports.default = stop_container.post('/', (req, res) => {
    // if ((!req.body) || (!req.body.vm_id)) {
    //     res.json({
    //         status: "error",
    //         msg: "Please the id for container ?"
    //     })
    // }
    console.log("while stoping => ", req.body);
    Services_1.default.stop_container(req.body.user_id, req.body.vm_id).then(() => {
        res.json({
            status: "ok"
        });
    }).catch(() => {
        res.json({
            status: "error",
        });
    });
});
