import Docker from 'dockerode';
import NetworkOptions from '../Data/interface';

export default async function createNetwork() {
    const docker = new Docker();
  try {
   
    const networkOptions: NetworkOptions = {
      Name: 'hoststream-network',
      Driver: 'bridge', // Default is 'bridge', other options: 'overlay', 'host', 'none'
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
      },
      Labels: {
        'com.example.description': 'Custom network for my app'
      }
    };

    // Create the network
    const network = await docker.createNetwork(networkOptions);
    console.log(`Network created successfully: ${network.id}`);

} catch (error) {
    console.error('Error creating network:', error);
  }
}

