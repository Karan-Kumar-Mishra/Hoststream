import Docker from 'dockerode';
import fs from "fs"
export default async function create_container() {
    const docker = new Docker({
        socketPath: '/var/run/docker.sock' // or your custom HTTPS config
    });
    const container = await docker.createContainer({
        Image: 'node:18-alpine',
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
        Env: [
            'NODE_ENV=development'
        ]
    });

    return container.id
}