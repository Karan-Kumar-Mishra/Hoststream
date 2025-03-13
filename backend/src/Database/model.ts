import mongoose from 'mongoose';
import UserSchema from './schema.js';
import { model_type, UserModel_type } from '../Data/types.js';

const UserModel: UserModel_type = mongoose.model<model_type>("Hoststream", UserSchema);

export default UserModel;