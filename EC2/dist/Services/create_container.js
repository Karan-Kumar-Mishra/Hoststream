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
        // Router configuration
        [`traefik.http.routers.${new_container_info.name}.entrypoints`]: 'hoststream-network',
        // Service configuration
        [`traefik.http.services.${new_container_info.name}.loadbalancer.server.port`]: '8888',
        // Middlewares
        [`traefik.http.routers.${new_container_info.name}.middlewares`]: 'wssh-headers',
        [`traefik.http.middlewares.wssh-headers.headers.customrequestheaders.X-Real-IP`]: 'remote_addr',
        // WebSocket configuration
        [`traefik.http.routers.${new_container_info.name}.middlewares`]: 'wssh-ws',
        [`traefik.http.middlewares.wssh-ws.headers.customresponseheaders.Sec-WebSocket-Accept`]: '*'
    };
    const container = await docker.createContainer({
        Image: 'karankumarmishra/wssh',
        name: new_container_info.name,
        HostConfig: {
            NetworkMode: 'hoststream-network'
        },
        Labels: labels,
        Env: [
            `SSH_USERNAME=${new_container_info.username || 'user'}`,
            `SSH_PASSWORD=${new_container_info.password || "1234"}`,
        ]
    });
    return container.id;
}
