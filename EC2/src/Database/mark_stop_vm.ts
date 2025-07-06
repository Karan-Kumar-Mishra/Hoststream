import { UserModel } from "./model";

export default async function mark_stop_vm(user_id: string, vm_id: string) {
    try {
      
        let result = await UserModel.updateOne(
            { 
                id: user_id,
                "services.vms.vm_id": vm_id  
            },
            { 
                $set: { "services.vms.$.vm_state": "off" }  
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