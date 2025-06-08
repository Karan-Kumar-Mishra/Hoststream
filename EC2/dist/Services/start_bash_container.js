"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = start_bash_container;
const dockerode_1 = __importDefault(require("dockerode"));
async function start_bash_container() {
    const docker = new dockerode_1.default({
        socketPath: '/var/run/docker.sock'
    });
    try {
        const container = await docker.createContainer({
            Image: 'traefik:v3',
            name: 'traefik', // Add container name to match your working command
            AttachStdin: false,
            AttachStdout: false,
            AttachStderr: false,
            Tty: false,
            OpenStdin: false,
            HostConfig: {
                PortBindings: {
                    '8080/tcp': [{ HostPort: '8080' }],
                    '80/tcp': [{ HostPort: '80' }]
                },
                Binds: [
                    `${process.cwd()}/traefik.yml:/etc/traefik/traefik.yml`,
                    '/var/run/docker.sock:/var/run/docker.sock',
                ],
                NetworkMode: 'web' // Changed to match your working command
            }
        });
        await container.start();
        console.log("Traefik container started successfully");
        console.log("path is =>", `${process.cwd()}/traefik.yml`);
    }
    catch (error) {
        console.error("Error starting Traefik container:", error);
    }
}
