"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Services_1 = __importDefault(require("../Services"));
const creat_container = express_1.default.Router();
exports.default = creat_container.post('/', (req, res) => {
    const new_container = {
        name: req.body.name,
        username: req.body.username,
        password: req.body.password,
        ports: req.body.ports
    };
    Services_1.default.create_container(new_container).then((ans) => {
        return ans;
    }).then((id) => {
        Services_1.default.start_container(id).then(() => {
            res.json({
                status: "ok",
                id: id
            });
        });
    });
});
