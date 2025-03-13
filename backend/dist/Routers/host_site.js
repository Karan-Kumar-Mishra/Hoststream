"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const host_site = express_1.default.Router();
exports.default = host_site.post('/', (req, res) => {
    console.log(req.body);
    res.send({
        status: "ok"
    });
});
