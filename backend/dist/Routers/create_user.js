"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const create_user = express_1.default.Router();
const create_user_db_js_1 = __importDefault(require("../Database/create_user_db.js"));
exports.default = create_user.post('/', (req, res) => {
    (0, create_user_db_js_1.default)(req.body).then((ans) => {
        res.send({
            status: "ok"
        });
    }).catch((err) => {
        res.send(err);
    });
});
