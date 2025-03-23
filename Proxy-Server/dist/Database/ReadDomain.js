"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ReadDomains;
const model_1 = require("./model");
async function ReadDomains() {
    const document = await model_1.DomainMaping.findOne({});
    //  console.log("map from db=>",document?.subdomainMappings);
    return document?.subdomainMappings;
}
