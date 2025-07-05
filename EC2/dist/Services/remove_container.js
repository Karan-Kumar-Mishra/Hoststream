"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = remove_container;
const Data_1 = __importDefault(require("../Data"));
const Database_1 = __importDefault(require("../Database"));
async function remove_container(user_id, vm_id) {
    try {
        await Database_1.default.delete_vm(user_id, vm_id);
        const container = await Data_1.default.docker.docker.getContainer(vm_id);
        await container.stop();
        await container.remove();
        console.log(`Container ${vm_id} delete successfully.`);
    }
    catch (error) {
        console.log("error while try to delete the container !");
    }
}
