"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const create_user = express_1.default.Router();
exports.default = create_user.post('/', (req, res) => {
    console.log(req.body);
    res.send({
        status: "done"
    });
});
