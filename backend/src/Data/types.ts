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
type user_type={
    id: string,
    email: string,
    name: string
}
type UserModel_type = Model<model_type>;

export {
    Data_type,
    user_type,
    model_type,
    UserModel_type
}