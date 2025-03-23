import express from "express";
import { createProxyMiddleware } from 'http-proxy-middleware';
import { IncomingMessage, ServerResponse } from 'http';
import Database from "../Database";

// Define the type for subdomain mappings
interface SubdomainMapping {
    subdomain: string;
    targetURL: string;
}

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

export default async function proxy_route(req: express.Request, res: express.Response, next: express.NextFunction) {
    if (req.method == "GET") {

        // Handle the case where Database.ReadDomains() might return undefined
        Database.ReadDomains().then((subdomainMappings: SubdomainMapping[] | undefined) => {
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
            } else {
                // console.error(`Subdomain not found: ${subdomain}.localhost`);
                res.status(404).send('Subdomain not found');
            }
        }).catch((err) => {
            console.log(err);
        });
    } else {
        next();
    }
}