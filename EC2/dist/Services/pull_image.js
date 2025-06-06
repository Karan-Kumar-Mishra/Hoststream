"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = pull_image;
const dockerode_1 = __importDefault(require("dockerode"));
async function pull_image(imageName) {
    const docker = new dockerode_1.default();
    try {
        // 1. Check if the image exists locally
        const images = await docker.listImages({ filters: { reference: [imageName] } });
        if (images.length > 0) {
            console.log(`[Docker] Image "${imageName}" already exists.`);
            return true;
        }
        // 2. Pull the image if missing
        console.log(`[Docker] Pulling image "${imageName}"...`);
        const stream = await docker.pull(imageName);
        // 3. Wait for pull to complete
        await new Promise((resolve, reject) => {
            docker.modem.followProgress(stream, (err, res) => {
                err ? reject(err) : resolve(res);
            });
        });
        console.log(`[Docker] Successfully pulled "${imageName}"`);
        return true;
    }
    catch (error) {
        console.error(`[Docker] Error with image "${imageName}":`, error instanceof Error ? error.message : error);
        return false;
    }
}
