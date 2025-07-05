import Docker from 'dockerode';
import path from 'path';
import get_ID from './get_Id';
import remove_container from './remove_container';
export default async function start_bash_container() {
    const docker = new Docker({
        socketPath: '/var/run/docker.sock'
    });
   const ID = await get_ID('traefik');
   await remove_container("", ID || 'none');
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