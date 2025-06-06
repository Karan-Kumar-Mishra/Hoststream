"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = checkDockerImageExists;
const dockerode_1 = __importDefault(require("dockerode"));
async function checkDockerImageExists(imageName) {
    try {
        const docker = new dockerode_1.default();
        const image = docker.getImage(imageName);
        await image.inspect();
        return true;
    }
    catch (error) {
        if (error.statusCode === 404) {
            return false;
        }
        console.error('Error checking Docker image:', error);
        throw error;
    }
}
