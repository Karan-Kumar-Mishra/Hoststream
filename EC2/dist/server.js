"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const Services_1 = __importDefault(require("./Services"));
const path_1 = __importDefault(require("path"));
const Router_1 = __importDefault(require("./Router"));
Services_1.default.init();
dotenv_1.default.config();
dotenv_1.default.config({
    path: path_1.default.resolve(__dirname, '.env')
});
const server = (0, express_1.default)();
server.use((0, cors_1.default)());
server.use('/', (req, res) => {
    res.send("ok");
});
server.use('/create', Router_1.default.create_container);
server.use('/start', Router_1.default.start_container);
server.use('/stop', Router_1.default.start_container);
server.use('/delete', Router_1.default.delete_container);
const port = process.env.PORT || 77;
server.listen(port, () => {
    console.log(`EC2 Server is running on ${port} ....`);
});
