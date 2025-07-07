import { UserModel } from "./model";

export default async function mark_prime(user_id: string) {
    await UserModel.updateOne(
        { id: user_id },
        { $set: { "is_prime": true } }
    );
}