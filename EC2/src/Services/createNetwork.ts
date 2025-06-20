import Docker from 'dockerode';
import NetworkOptions from '../Data/interface';
import remove_network from './remove_network';
export default async function createNetwork() {
  const docker = new Docker();
  await remove_network('hoststream-network');
  try {

    const networkOptions: NetworkOptions = {
      Name: 'hoststream-network',
      Driver: 'bridge',
      CheckDuplicate: true,
      Internal: false,
      Attachable: true,
      EnableIPv6: false,
      IPAM: {
        Driver: 'default',
        Config: [
          //   {
          //     Subnet: '172.28.0.0/16',
          //     Gateway: '172.28.0.1'
          //   }
        ]
      }
    };

    // Create the network
    const network = await docker.createNetwork(networkOptions);
    console.log(`Network created successfully: ${network.id}`);

  } catch (error) {
    console.error('Error creating network:', error);
  }
}

