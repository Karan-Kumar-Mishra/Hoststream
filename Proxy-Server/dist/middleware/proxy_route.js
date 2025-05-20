"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = proxy_route;
const http_proxy_1 = __importDefault(require("http-proxy"));
const Redis_1 = __importDefault(require("../Redis"));
const proxy = http_proxy_1.default.createProxyServer({ changeOrigin: true });
async function proxy_route(req, res, next) {
    if (req.method === 'GET') {
        const host = req.headers.host || '';
        const subdomain = host.split('.')[0];
        console.log('subdomain =>', subdomain);
        try {
            const ans = await Redis_1.default.find_item(subdomain);
            if (!ans?.route) {
                res.status(502).send('Bad Gateway: No route found');
                return;
            }
            // Properly trim trailing slash from ans.route
            const baseRoute = ans.route.endsWith('/') ? ans.route.slice(0, -1) : ans.route;
            console.log("base route=> ", baseRoute);
            const target = (process.env.BACKEND_URL || "http://localhost:88").concat(baseRoute);
            console.log("target route=> ", target);
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
        }
        catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    }
    else {
        next();
    }
}
