"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = create_container;
const dockerode_1 = __importDefault(require("dockerode"));
async function create_container() {
    const docker = new dockerode_1.default({
        socketPath: '/var/run/docker.sock' // or your custom HTTPS config
    });
    const container = await docker.createContainer({
        Image: 'wssh',
        Cmd: ['node', '-e', 'console.log("Hello from container")'],
        name: 'my-node-container',
        HostConfig: {
            // AutoRemove: true, // Automatically remove when stopped
            PortBindings: {
                '8080/tcp': [{ HostPort: '8080' }],
                '80/tcp': [{ HostPort: '80' }]
            },
            Binds: [
                `${process.cwd()}/traefik.yml:/etc/traefik/traefik.yml`,
                '/var/run/docker.sock:/var/run/docker.sock',
            ],
            NetworkMode: 'hoststream-network'
        },
    });
    return container.id;
}
