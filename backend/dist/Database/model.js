"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const schema_js_1 = __importDefault(require("./schema.js"));
const UserModel = mongoose_1.default.model("Hoststream", schema_js_1.default);
exports.default = UserModel;
