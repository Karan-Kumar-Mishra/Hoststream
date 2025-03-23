"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const proxy_route_js_1 = __importDefault(require("./proxy_route.js"));
const web_proxy_js_1 = __importDefault(require("./web_proxy.js"));
exports.default = {
    proxy_route: proxy_route_js_1.default,
    web_proxy: web_proxy_js_1.default
};
