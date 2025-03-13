import UserModel from "./model.js";
import { user_type } from "../Data/types.js";

export default async function find_user(user: user_type) {
 return await UserModel.findOne({id:user.id});
}