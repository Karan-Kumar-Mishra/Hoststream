"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainMaping = exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const schema_js_1 = require("./schema.js");
const UserModel = mongoose_1.default.model("Hoststream", schema_js_1.UserSchema);
exports.UserModel = UserModel;
const DomainMaping = mongoose_1.default.model("DomainMaping", schema_js_1.subdomainMappingsSchema);
exports.DomainMaping = DomainMaping;
