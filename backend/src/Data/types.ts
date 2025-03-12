import { Document } from 'mongoose';
interface Data_type{
  
}
interface model_type extends Document {
    id: string,
    email: string,
    username: string
}
export {
    Data_type,
    model_type
}