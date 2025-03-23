"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subdomainMappingsSchema = exports.UserSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    id: String,
    name: String,
    email: String,
    services: {
        static_site: []
    },
    other_info: {},
});
exports.UserSchema = UserSchema;
const subdomainMappingsSchema = new mongoose_1.default.Schema({
    subdomainMappings: []
});
exports.subdomainMappingsSchema = subdomainMappingsSchema;
