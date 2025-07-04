"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const Services_1 = __importDefault(require("./Services"));
const Router_1 = __importDefault(require("./Router"));
const body_parser_1 = __importDefault(require("body-parser"));
Services_1.default.init();
dotenv_1.default.config();
const server = (0, express_1.default)();
server.use((0, cors_1.default)());
server.use(body_parser_1.default.json());
server.use(body_parser_1.default.urlencoded({ extended: true }));
server.use(express_1.default.json());
server.get('/', (req, res) => {
    res.send("ok");
});
server.use('/create', Router_1.default.create_container);
server.use('/start', Router_1.default.start_container);
server.use('/stop', Router_1.default.stop_container);
server.use('/delete', Router_1.default.delete_container);
const port = process.env.PORT || 81;
server.listen(port, () => {
    console.log(`EC2 Server is running on ${port} ....`);
});
