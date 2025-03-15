"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_1 = require("../Data/data");
const index_js_1 = __importDefault(require("../Services/index.js"));
const setUploadDestination = (req, res, next) => {
    data_1.locations.user_site_loactions = index_js_1.default.generate_name();
    next();
};
exports.default = setUploadDestination;
