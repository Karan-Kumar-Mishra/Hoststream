"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Data_1 = require("../Data");
const Services_1 = __importDefault(require("../Services"));
const ReadDomain_1 = __importDefault(require("../Database/ReadDomain"));
const add_route = express_1.default.Router();
exports.default = add_route.post('/', (req, res) => {
    const new_maping = {
        subdomain: `${Services_1.default.generate_domain_name()}.localhost`,
        targetURL: req.body.targetURL
    };
    Data_1.subdomainMappings.push(new_maping);
    //console.log(subdomainMappings);
    (0, ReadDomain_1.default)();
    res.send({
        status: "ok"
    });
});
