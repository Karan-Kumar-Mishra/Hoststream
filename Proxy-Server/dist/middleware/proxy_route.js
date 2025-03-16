"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = proxy_route;
const Data_1 = require("../Data");
const http_proxy_middleware_1 = require("http-proxy-middleware");
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
function proxy_route(req, res, next) {
    if (req.method == "GET") {
        const host = req.headers.host || '';
        const subdomain = host.split('.')[0];
        const mapping = Data_1.subdomainMappings.find((mapping) => mapping.subdomain === `${subdomain}.localhost`);
        console.log("mapping ", mapping);
        if (mapping) {
            const middleware = createDynamicProxyMiddleware(mapping.targetURL);
            middleware(req, res, next);
        }
        else {
            console.error(`Subdomain not found: ${subdomain}.localhost`);
            res.status(404).send('Subdomain not found');
        }
    }
    else {
        next();
    }
}
