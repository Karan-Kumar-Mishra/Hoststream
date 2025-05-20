"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = web_proxy;
const http_proxy_1 = require("http-proxy");
const proxy = (0, http_proxy_1.createProxyServer)({});
const Data_1 = require("../Data");
function web_proxy(req, res, next) {
    if (req.method == "GET") {
        const host = req.headers.host || '';
        console.log("host=>", host);
        const subdomain = host.split('.')[0];
        const mapping = Data_1.subdomainMappings.find((mapping) => mapping.subdomain === `${subdomain}.localhost`);
        if (mapping) {
            // Proxy the request to the target URL
            proxy.web(req, res, { target: mapping.targetURL }, (err) => {
                if (err) {
                    console.error('Proxy error:', err);
                    res.status(500).send('Proxy error');
                }
            });
        }
        else {
            console.error(`Subdomain not found: ${subdomain}.localhost`);
            // If subdomain is not found, send a 404 response
            res.status(404).send('Subdomain not found');
        }
    }
    else {
        next();
    }
}
