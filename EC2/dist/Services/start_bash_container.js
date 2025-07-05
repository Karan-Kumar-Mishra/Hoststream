"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = start_bash_container;
const dockerode_1 = __importDefault(require("dockerode"));
const path_1 = __importDefault(require("path"));
const get_Id_1 = __importDefault(require("./get_Id"));
const remove_container_1 = __importDefault(require("./remove_container"));
async function start_bash_container() {
    const docker = new dockerode_1.default({
        socketPath: '/var/run/docker.sock'
    });
    const ID = await (0, get_Id_1.default)('traefik');
    await (0, remove_container_1.default)("", ID || 'none');
    try {
        const container = await docker.createContainer({
            Image: 'traefik',
            name: 'traefik',
            AttachStdin: false,
            AttachStdout: false,
            AttachStderr: false,
            Tty: false,
            OpenStdin: false,
            ExposedPorts: {
                '80/tcp': {},
                '8080/tcp': {}
            },
            HostConfig: {
                PortBindings: {
                    '8080/tcp': [{ HostPort: '8080' }],
                    '80/tcp': [{ HostPort: '80' }]
                },
                Binds: [
                    `${path_1.default.resolve(__dirname)}/traefik.yml:/etc/traefik/traefik.yml`,
                    '/var/run/docker.sock:/var/run/docker.sock',
                ],
                NetworkMode: 'hoststream-network'
            }
        });
        await container.start();
        console.log("Traefik container started successfully");
    }
    catch (error) {
        console.error("Error starting Traefik container:", error);
    }
}
