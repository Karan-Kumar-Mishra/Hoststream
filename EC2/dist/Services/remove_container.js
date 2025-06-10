"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = remove_container;
const Data_1 = __importDefault(require("../Data"));
async function remove_container(id) {
    try {
        const container = Data_1.default.docker.docker.getContainer(id);
        await container.stop();
        await container.remove();
        console.log(`Container ${id} delete successfully.`);
    }
    catch (error) {
        console.log("error while try to delete the container !");
    }
}
