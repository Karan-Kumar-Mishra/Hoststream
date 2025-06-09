"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = remove_network;
const dockerode_1 = __importDefault(require("dockerode"));
async function remove_network(network) {
    try {
        const docker = new dockerode_1.default({
            socketPath: '/var/run/docker.sock'
        });
        const containers = await docker.listContainers();
        const containerToRemove = containers.find(container => container.Names.some(name => name.includes(network)));
        if (containerToRemove) {
            const container = docker.getContainer(containerToRemove.Id);
            if (containerToRemove.State === 'running') {
                await container.stop();
            }
            await container.remove();
            console.log(`Successfully removed container ${containerToRemove.Names[0]}`);
        }
        else {
            console.log(`No container found with network name containing "${network}"`);
        }
    }
    catch (error) {
        console.error(`Error removing container: ${error}`);
        throw error;
    }
}
