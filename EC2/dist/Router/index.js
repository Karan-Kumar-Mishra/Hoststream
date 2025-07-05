"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const start_container_1 = __importDefault(require("./start_container"));
const create_container_1 = __importDefault(require("./create_container"));
const stop_container_1 = __importDefault(require("./stop_container"));
const delete_container_1 = __importDefault(require("./delete_container"));
const routerModule = {
    start_container: start_container_1.default,
    create_container: create_container_1.default,
    stop_container: stop_container_1.default,
    delete_container: delete_container_1.default
};
exports.default = routerModule;
