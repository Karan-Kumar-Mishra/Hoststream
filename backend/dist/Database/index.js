"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connectdb_js_1 = __importDefault(require("./connectdb.js"));
const create_user_db_js_1 = __importDefault(require("./create_user_db.js"));
exports.default = {
    connectdb: connectdb_js_1.default,
    create_user: create_user_db_js_1.default
};
