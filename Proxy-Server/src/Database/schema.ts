import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    id: String,
    name: String,
    email: String,
    services: {
        static_site: []
    },
    other_info: {
      
    },
});
const subdomainMappingsSchema = new mongoose.Schema({
    subdomainMappings :[]
})

export  {
    UserSchema,
    subdomainMappingsSchema
}