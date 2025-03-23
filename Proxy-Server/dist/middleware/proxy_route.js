"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = proxy_route;
const http_proxy_middleware_1 = require("http-proxy-middleware");
const Database_1 = __importDefault(require("../Database"));
function createDynamicProxyMiddleware(target) {
    return (0, http_proxy_middleware_1.createProxyMiddleware)({
        target,
        changeOrigin: true,
        on: {
            proxyRes: (proxyRes, req, res) => {
                // console.log(`Proxying request to: ${target}${req.url}`);
            },
        },
    });
}
async function proxy_route(req, res, next) {
    if (req.method == "GET") {
        // Handle the case where Database.ReadDomains() might return undefined
        Database_1.default.ReadDomains().then((subdomainMappings) => {
            //  console.log(subdomainMappings);
            const mappings = subdomainMappings || [];
            const host = req.headers.host || '';
            const subdomain = host.split('.')[0];
            console.log("subdomain=>", subdomain);
            const mapping = mappings.find((mapping) => mapping.subdomain == subdomain);
            console.log("mapign=>", mapping);
            if (mapping) {
                const middleware = createDynamicProxyMiddleware(mapping.targetURL);
                middleware(req, res, next);
            }
            else {
                // console.error(`Subdomain not found: ${subdomain}.localhost`);
                res.status(404).send('Subdomain not found');
            }
        }).catch((err) => {
            console.log(err);
        });
    }
    else {
        next();
    }
}
