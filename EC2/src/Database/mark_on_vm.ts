import { UserModel } from "./model";

export default async function mark_on_vm(user_id: string, vm_id: string) {
    try {
        // Update only the specific VM in the vms array
        let result = await UserModel.updateOne(
            { 
                id: user_id,
                "services.vms.vm_id": vm_id  // Match both user_id and the specific VM
            },
            { 
                $set: { "services.vms.$.vm_state": "on" }  // Use positional $ operator to update matched VM
            }
        );

        if (result.modifiedCount === 0) {
            console.warn("No document was modified. Check if the user_id or vm_id is correct.");
        }
        
        return result.modifiedCount;
    } catch (error) {
        console.error("Error updating VM state:", error);
        throw error;  // Re-throw the error for the caller to handle
    }
}