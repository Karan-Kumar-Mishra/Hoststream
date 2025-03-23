"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connectdb_1 = __importDefault(require("./connectdb"));
const ReadDomain_1 = __importDefault(require("./ReadDomain"));
exports.default = {
    connectdb: connectdb_1.default,
    ReadDomains: ReadDomain_1.default
};
