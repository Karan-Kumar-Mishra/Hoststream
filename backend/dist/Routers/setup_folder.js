"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const setup_folder = express_1.default.Router();
const data_1 = require("../Data/data");
exports.default = setup_folder.post('/', (req, res) => {
    data_1.locations.user_folder_loactions = req.body.name;
    res.send({
        status: "ok"
    });
});
