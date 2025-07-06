"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = stop_container;
const Data_1 = __importDefault(require("../Data"));
const Database_1 = __importDefault(require("../Database"));
async function stop_container(user_id, vm_id) {
    try {
        const container = Data_1.default.docker.docker.getContainer(vm_id);
        await container.stop();
        await Database_1.default.mark_stop_vm(user_id, vm_id);
        console.log(`Container ${vm_id} stopped successfully.`);
    }
    catch (error) {
        console.log("error while try to stop the container !");
    }
}
