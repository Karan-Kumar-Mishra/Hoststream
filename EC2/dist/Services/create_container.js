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
    // Prepare port bindings and exposed ports
    const portBindings = {};
    const exposedPorts = {};
    // Process each port in the ports array
    new_container_info.ports.forEach(port => {
        const portStr = `${port}/tcp`;
        portBindings[portStr] = [{ HostPort: `${port}` }];
        exposedPorts[portStr] = {};
    });
    // Base Traefik labels
    const labels = {
        'traefik.enable': 'true',
        [`traefik.http.routers.${new_container_info.name}.entrypoints`]: 'hoststream-network',
        [`traefik.http.routers.${new_container_info.name}.middlewares`]: 'wssh-headers',
        [`traefik.http.middlewares.wssh-headers.headers.customrequestheaders.X-Real-IP`]: 'remote_addr',
        [`traefik.http.routers.${new_container_info.name}.middlewares`]: 'wssh-ws',
        [`traefik.http.middlewares.wssh-ws.headers.customresponseheaders.Sec-WebSocket-Accept`]: '*'
    };
    // Add service configuration for each port
    new_container_info.ports.forEach((port, index) => {
        const serviceName = index === 0 ? new_container_info.name : `${new_container_info.name}-port-${port}`;
        labels[`traefik.http.services.${serviceName}.loadbalancer.server.port`] = `${port}`;
        // For additional ports, create separate routers if needed
        if (index > 0) {
            labels[`traefik.http.routers.${serviceName}.entrypoints`] = 'hoststream-network';
            labels[`traefik.http.routers.${serviceName}.service`] = serviceName;
            // Add any additional router-specific configuration here
        }
    });
    const container = await docker.createContainer({
        Image: 'karankumarmishra/wssh',
        name: new_container_info.name,
        HostConfig: {
            NetworkMode: 'hoststream-network',
            PortBindings: portBindings
        },
        ExposedPorts: exposedPorts,
        Labels: labels,
        Env: [
            `SSH_USERNAME=${new_container_info.username || 'user'}`,
            `SSH_PASSWORD=${new_container_info.password || "1234"}`,
        ]
    });
    return container.id;
}
