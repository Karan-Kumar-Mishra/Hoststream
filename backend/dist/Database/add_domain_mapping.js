"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = add_domain_mapping;
const model_1 = require("./model");
async function add_domain_mapping(new_mapping) {
    console.log("Adding the domain");
    // Check if a document exists
    const existingDocument = await model_1.DomainMaping.findOne({});
    if (!existingDocument) {
        // If no document exists, create one with the new mapping
        const newDocument = new model_1.DomainMaping({
            subdomainMappings: [new_mapping]
        });
        return await newDocument.save();
    }
    else {
        // If a document exists, push the new mapping into the array
        return await model_1.DomainMaping.updateOne({ _id: existingDocument._id }, // Filter by document ID
        { $push: { subdomainMappings: new_mapping } } // Update object
        );
    }
}
