import Docker from 'dockerode';
import path from 'path';

export default async function start_bash_container() {
    const docker = new Docker({
        socketPath: '/var/run/docker.sock'
    });
    
    try {
        const container = await docker.createContainer({
            Image: 'traefik:v3',
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
                    `${path.resolve(__dirname)}/traefik.yml:/etc/traefik/traefik.yml`,
                    '/var/run/docker.sock:/var/run/docker.sock',
                ],
                NetworkMode: 'hoststream-network' 
            }
        });
        
        await container.start();
        
        console.log("Traefik container started successfully");

    } catch (error) {
        console.error("Error starting Traefik container:", error);
    }
}