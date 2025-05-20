"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subdomainMappings = exports.Rousts = void 0;
exports.get_redis = get_redis;
exports.connect_redis = connect_redis;
const redis_1 = require("redis");
let Rousts = [];
exports.Rousts = Rousts;
const subdomainMappings = [
    { subdomain: 'a1.localhost', targetURL: 'https://www.google.com' }, // Backend Server 1
    { subdomain: 'mm.localhost', targetURL: 'https://karan-kumar-mishra.github.io/Portfolio/' }, // Backend Server 2
];
exports.subdomainMappings = subdomainMappings;
let client;
async function connect_redis() {
    if (!client) {
        client = (0, redis_1.createClient)({
            url: process.env.REDIS_URL || 'redis://redis:6379', // Use service name
        });
        client.on('error', (err) => {
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
