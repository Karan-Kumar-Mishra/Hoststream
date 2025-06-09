import Docker from 'dockerode';
import { user_container_type } from '../Data/types';

export default async function create_container(new_container_info:user_container_type) {
    const docker = new Docker({
        socketPath: '/var/run/docker.sock' 
    });

    const container = await docker.createContainer({
        Image: 'wssh',
        
    });

    return container.id;
}