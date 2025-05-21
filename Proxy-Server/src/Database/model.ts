import mongoose from 'mongoose';
import {UserSchema ,subdomainMappingsSchema} from './schema.js';
import {
     model_type, UserModel_type,domain_model_type,domain_type 
} from '../Data/types.js';

const UserModel: UserModel_type = mongoose.model<model_type>("Hoststream", UserSchema);
const DomainMaping:domain_model_type=mongoose.model<domain_type>("DomainMaping",subdomainMappingsSchema)
export {
    UserModel,
    DomainMaping
} 