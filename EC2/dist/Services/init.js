"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = init;
const pull_image_1 = __importDefault(require("./pull_image"));
async function init() {
    console.log("Running the init server...");
    const f1 = await (0, pull_image_1.default)('karankumarmishra/wssh:latest');
    const f2 = await (0, pull_image_1.default)('traefik');
    if (f1 && f2) {
        console.log("images pullImage ready for container deployment ");
    }
}
