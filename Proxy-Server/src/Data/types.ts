import { Document,Model } from 'mongoose';
interface Data_type{
   
}
interface model_type extends Document {
    id: string,
    email: string,
    username: string,
    services: {
        static_site: []
    },
    other_info: {},
}
interface domain_type extends Document{
    subdomainMappings :[]
}
type user_type={
    id: string,
    email: string,
    name: string
}
type UserModel_type = Model<model_type>;
type domain_model_type=Model<domain_type>;
type site_type={
    website_name:string,
    site_folder:string,
    route:string
}
type domain_maping_type={
    subdomain:String,
    targetURL:String
}
type redis_item_type={
    id:string,
    route:string,
    domain:string,
    site_folder:string
}
export  {
    Data_type,
    user_type,
    model_type,
    UserModel_type,
    site_type,
    domain_model_type,
    domain_type,
    domain_maping_type,
    redis_item_type
}