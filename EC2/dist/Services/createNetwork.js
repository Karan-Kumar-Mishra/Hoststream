"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createNetwork;
const dockerode_1 = __importDefault(require("dockerode"));
async function createNetwork() {
    const docker = new dockerode_1.default();
    try {
        const networkOptions = {
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
    }
    catch (error) {
        console.error('Error creating network:', error);
    }
}
