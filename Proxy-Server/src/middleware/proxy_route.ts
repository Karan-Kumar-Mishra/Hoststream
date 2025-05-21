import express from 'express';
import httpProxy from 'http-proxy';
import Redis from '../Redis';

const proxy = httpProxy.createProxyServer({ changeOrigin: true });

export default async function proxy_route(req: express.Request, res: express.Response, next: express.NextFunction) {
    if (req.method === 'GET') {
        const host = req.headers.host || '';
        const subdomain = host.split('.')[0];
        console.log('subdomain =>', subdomain);

        try {
            const ans = await Redis.find_item(subdomain);

            if (!ans?.route) {
                res.status(502).send('Bad Gateway: No route found');
                return;
            }

            // Properly trim trailing slash from ans.route
            const baseRoute = ans.route.endsWith('/') ? ans.route.slice(0, -1) : ans.route;
            console.log("base route=> ",baseRoute)
            const target = (process.env.BACKEND_URL || "http://127.0.0.1:88").concat(baseRoute);
      
            console.log('Proxying to =>', target + req.url);

            proxy.web(req, res, {
                target,
                selfHandleResponse: false,
                // avoid path rewrite issues
                ignorePath: false
            }, (err) => {
                console.error('Proxy error:', err);
                res.status(500).send('Proxy Error');
            });

        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    } else {
        next();
    }
}
