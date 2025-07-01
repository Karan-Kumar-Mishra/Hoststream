import Docker from 'dockerode';
import { user_container_type } from '../Data/types';

export default async function create_container(new_container_info: user_container_type): Promise<string> {
    const docker = new Docker({
        socketPath: '/var/run/docker.sock'
    });

    // Prepare port bindings and exposed ports
    const portBindings: { [key: string]: Array<{ HostPort: string }> } = {};
    const exposedPorts: { [key: string]: {} } = {};
    
    // Process each port in the ports array
    new_container_info.ports.forEach(port => {
        const portStr = `${port}/tcp`;
        portBindings[portStr] = [{ HostPort: `${port}` }];
        exposedPorts[portStr] = {};
    });

    // Base Traefik labels
    const labels: { [label: string]: string } = {
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