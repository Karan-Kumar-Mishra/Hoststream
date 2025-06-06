"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = start_bash_container;
const dockerode_1 = __importDefault(require("dockerode"));
async function start_bash_container() {
    console.log("try to run the docker base conatiner");
    const docker = new dockerode_1.default({
        socketPath: '/var/run/docker.sock' // or your custom HTTPS config
    });
    const container = await docker.createContainer({
        Image: 'node:18-alpine',
        //  Cmd: ['node', '-e', 'console.log("Hello from container")'],
        name: 'base_conatiner',
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
        Env: [
            'NODE_ENV=development'
        ]
    });
    await container.start();
}
