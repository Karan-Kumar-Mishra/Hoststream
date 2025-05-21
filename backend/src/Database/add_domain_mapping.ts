import { DomainMaping } from "./model";
import { domain_maping_type } from "../Data/types";

export default async function add_domain_mapping(new_mapping: domain_maping_type) {
    console.log("Adding the domain");

    // Check if a document exists
    const existingDocument = await DomainMaping.findOne({});

    if (!existingDocument) {
        // If no document exists, create one with the new mapping
        const newDocument = new DomainMaping({
            subdomainMappings: [new_mapping]
        });
        return await newDocument.save();
    } else {
        // If a document exists, push the new mapping into the array
        return await DomainMaping.updateOne(
            { _id: existingDocument._id }, // Filter by document ID
            { $push: { subdomainMappings: new_mapping } } // Update object
        );
    }
}