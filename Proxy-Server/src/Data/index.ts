import { createClient, RedisClientType } from 'redis';
let Rousts: [] = []
const subdomainMappings = [
    { subdomain: 'a1.localhost', targetURL: 'https://www.google.com' }, // Backend Server 1
    { subdomain: 'mm.localhost', targetURL: 'https://karan-kumar-mishra.github.io/Portfolio/' }, // Backend Server 2
];
let client: RedisClientType | undefined;

async function connect_redis() {
    if (!client) {
        client = createClient({
            url: process.env.REDIS_URL || 'redis://redis:6379', // Use service name
            password: process.env.REDIS_PASSWORD || 'redispass123' // Add password
        });

        client.on('error', (err: Error) => {
            console.log('Redis Client Error', err);
        });

        client.on('connect', () => {
            console.log("redis is connected..");
        });

        await client.connect();
    }
    return client;
}
async function get_redis() {
    if (client) {
        return client;
    }
    return null;
}
export {
    Rousts,
    subdomainMappings,
    get_redis,
    connect_redis
}