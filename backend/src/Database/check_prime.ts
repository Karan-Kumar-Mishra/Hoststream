import { UserModel } from "./model";

export default async function check_prime(user_id: string) {
    const user = await UserModel.findOne({ id: user_id });
    if (user?.is_prime === true) {
        return true;
    }
    else {
        return false;
    }
}