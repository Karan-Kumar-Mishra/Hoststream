import { new_vm_type } from "../Data/types";
import { UserModel } from "./model";
export default async function add_vm(user_id:string, new_vm:new_vm_type) {
     await UserModel.updateOne(
        { id: user_id },
        { $push: { "services.vms": new_vm } }
    );
}