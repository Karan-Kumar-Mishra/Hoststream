import Docker from 'dockerode';

export default async function remove_network(network: string) {
    try {
        const docker = new Docker({
            socketPath: '/var/run/docker.sock'
        });
        const containers = await docker.listContainers();
        const containerToRemove = containers.find(container =>
            container.Names.some(name => name.includes(network))
        );
        if (containerToRemove) {
            const container = docker.getContainer(containerToRemove.Id);
            if (containerToRemove.State === 'running') {
                await container.stop();
            }
            await container.remove();
            console.log(`Successfully removed container ${containerToRemove.Names[0]}`);
        } else {
            console.log(`No container found with network name containing "${network}"`);
        }
    } catch (error) {
        console.error(`Error removing container: ${error}`);
        throw error;
    }
}