import { UserModel } from "./model";
export default async function delete_vm(user_id:string,vm_id:string) {
        let result = await UserModel.updateOne(
        { id: user_id }, 
        { $pull: { 'services.vms': { vm_id: vm_id } } } 
    );
    
    if (result.modifiedCount === 0) {
        console.warn("No document was modified. Check if the user_id or site_id is correct.");
    }
    return result.modifiedCount; 
}