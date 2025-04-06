import { createProxyServer } from 'http-proxy';
import express from "express";
const proxy = createProxyServer({});
import { subdomainMappings } from "../Data";

export default function web_proxy(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) {
    if (req.method == "GET") {
        const host = req.headers.host || '';
        console.log("host=>",host);
        
        const subdomain = host.split('.')[0];
        const mapping = subdomainMappings.find((mapping) => mapping.subdomain === `${subdomain}.localhost`);

        if (mapping) {
            // Proxy the request to the target URL
            proxy.web(req, res, { target: mapping.targetURL }, (err) => {
                if (err) {
                    console.error('Proxy error:', err);
                    res.status(500).send('Proxy error');
                }
            });
        } else {
            console.error(`Subdomain not found: ${subdomain}.localhost`);
            // If subdomain is not found, send a 404 response
            res.status(404).send('Subdomain not found');
        }
    }
    else {
        next();
    }
}