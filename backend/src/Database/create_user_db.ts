import UserModel from "./model.js";
import { user_type } from "../Data/types.js";
import find_user from "./find_user.js";
export default async function create_user_db(user: user_type) {


    if (await find_user(user) === null) {
        const newuser = new UserModel({
            id: user.id,
            email: user.email,
            name: user.name
        });
        await newuser.save();
    }
}