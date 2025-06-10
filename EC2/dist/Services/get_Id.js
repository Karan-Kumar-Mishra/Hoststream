"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = get_ID;
const Data_1 = __importDefault(require("../Data"));
async function get_ID(container_name) {
    const containers = await Data_1.default.docker.docker.listContainers({ all: true });
    const target_cntr = containers.find((cntnr) => cntnr.Names.some(name => name.includes(`/${container_name}`)));
    return target_cntr?.Id;
}
