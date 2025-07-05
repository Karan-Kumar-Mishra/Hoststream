import { UserModel } from "./model";

export default async function get_vms(id: string) {
    try {
        const user = await UserModel.findOne({ id: id }, { 'services.vms': 1 });

        return user?.services?.vms;
    } catch (error) {
        console.error("Error fetching user vms:", error);
        throw error;
    }
}