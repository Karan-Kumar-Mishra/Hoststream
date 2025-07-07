import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    id: String,
    name: String,
    email: String,
    is_prime:Boolean,
    services: {
        static_site: [],
        vms:[]
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