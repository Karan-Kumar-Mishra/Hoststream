"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const index_js_1 = __importDefault(require("./Routers/index.js"));
const server = (0, express_1.default)();
dotenv_1.default.config();
server.use('/create_user', index_js_1.default.create_user);
server.listen(process.env.PORT, () => {
    console.log("Server is running ...");
});
