"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = create_container;
const dockerode_1 = __importDefault(require("dockerode"));
async function create_container(new_container_info) {
    const docker = new dockerode_1.default({
        socketPath: '/var/run/docker.sock'
    });
    const labels = {
        'traefik.enable': 'true',
        [`traefik.http.routers.${new_container_info.name}.entrypoints`]: 'hoststream-network',
        [`traefik.http.services.${new_container_info.name}.loadbalancer.server.port`]: '8888', // Changed from number to string
        [`traefik.http.routers.${new_container_info.name}.middlewares`]: 'karankumarmishra/wssh-network-headers',
        [`traefik.http.middlewares.karankumarmishra/wssh-network-headers.headers.customrequestheaders.X-Real-IP`]: 'remote_addr',
        [`traefik.http.routers.${new_container_info.name}-ws.middlewares`]: 'karankumarmishra/wssh-ws',
        [`traefik.http.middlewares.karankumarmishra/wssh-ws.headers.customresponseheaders.Sec-WebSocket-Accept`]: '*' // Removed extra '='
    };
    const container = await docker.createContainer({
        Image: 'karankumarmishra/wssh',
        name: new_container_info.name,
        // AttachStdin: false,
        // AttachStdout: false,
        // AttachStderr: false,
        // Tty: false,
        // OpenStdin: false,
        // ExposedPorts: {
        //     '80/tcp': {},
        //     '8080/tcp': {}
        // },
        // HostConfig: {
        //     PortBindings: {
        //         '8080/tcp': [{ HostPort: '8080' }],
        //         '80/tcp': [{ HostPort: '80' }]
        //     },
        //     NetworkMode: 'hoststream-network'
        // },
        Labels: labels, // Using the properly typed labels object
        Env: [
            `SSH_USERNAME=${new_container_info.username || 'user'}`,
            `SSH_PASSWORD=${new_container_info.password || "1234"}`,
        ]
    });
    return container.id;
}
