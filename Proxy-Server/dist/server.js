"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const index_1 = __importDefault(require("./middleware/index"));
const body_parser_1 = __importDefault(require("body-parser"));
const server = (0, express_1.default)();
dotenv_1.default.config();
server.use((0, cors_1.default)());
server.use(body_parser_1.default.json());
server.use(body_parser_1.default.urlencoded({ extended: true }));
server.use(express_1.default.json());
server.use(index_1.default.proxy_route);
//server.use('/add_route',middleware.)
server.setMaxListeners(100000);
server.listen(80, () => {
    console.log(`server is running on ${process.env.PORT}...`);
});
