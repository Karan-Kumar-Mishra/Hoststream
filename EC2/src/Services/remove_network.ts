import Docker from 'dockerode';

export default async function remove_network(network: string) {
    try {
        const docker = new Docker({
            socketPath: '/var/run/docker.sock'
        });


        const networks = await docker.listNetworks();
        const networkToRemove = networks.find(n => n.Name === network);

        if (networkToRemove) {
            const dockerNetwork = docker.getNetwork(networkToRemove.Id);


            const networkInfo = await dockerNetwork.inspect();


            const containerIds = Object.keys(networkInfo.Containers || {});

            for (const containerId of containerIds) {
                await dockerNetwork.disconnect({
                    Container: containerId,
                    Force: true
                });
            }


            await dockerNetwork.remove();
            console.log(`Successfully removed network "${network}"`);
        } else {
            console.log(`No network found with name "${network}"`);
        }
    } catch (error) {
        console.error(`Error removing network: ${error}`);
        throw error;
    }
}