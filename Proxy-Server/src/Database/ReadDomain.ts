import { DomainMaping } from "./model";
export default async  function ReadDomains() {
    
        const document = await DomainMaping.findOne({}); 
      //  console.log("map from db=>",document?.subdomainMappings);
        return document?.subdomainMappings
        
}