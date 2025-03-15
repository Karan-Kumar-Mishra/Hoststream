import express from "express";
import { subdomainMappings } from "../Data";
import { createProxyMiddleware, Options } from 'http-proxy-middleware';
import { IncomingMessage, ServerResponse } from 'http';

function createDynamicProxyMiddleware(target: string) {
    return createProxyMiddleware({
        target,
        changeOrigin: true,
        on: {
            proxyRes: (proxyRes: IncomingMessage, req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
                // console.log(`Proxying request to: ${target}${req.url}`);
            },
        },
    });
}

export default function proxy_route(req: express.Request, res: express.Response, next: express.NextFunction) {
    const host = req.headers.host || '';
    const subdomain = host.split('.')[0];
    const mapping = subdomainMappings.find((mapping) => mapping.subdomain === `${subdomain}.localhost`);
    if (mapping) {
        const middleware = createDynamicProxyMiddleware(mapping.targetURL);
        middleware(req, res, next);
    } else {
        console.error(`Subdomain not found: ${subdomain}.localhost`);
        res.status(404).send('Subdomain not found');
    }
}