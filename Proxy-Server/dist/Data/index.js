"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subdomainMappings = exports.Rousts = void 0;
let Rousts = [];
exports.Rousts = Rousts;
const subdomainMappings = [
    { subdomain: 'a1.localhost', targetURL: 'https://www.google.com' }, // Backend Server 1
    { subdomain: 'mm.localhost', targetURL: 'https://karan-kumar-mishra.github.io/Portfolio/' }, // Backend Server 2
    { subdomain: 'dh.localhost', targetURL: 'http://localhost:3003' }, // Backend Server 3
    { subdomain: 'kjsadfh.localhost', targetURL: 'http://localhost:3004' }, // Backend Server 4
];
exports.subdomainMappings = subdomainMappings;
