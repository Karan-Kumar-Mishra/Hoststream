import Data from "../Data";
import Database from "../Database";
export default async function stop_container(user_id:string,vm_id: string) {
    try {
        const container = Data.docker.docker.getContainer(vm_id);
        await container.stop();
        await Database.mark_stop_vm(user_id,vm_id);
        console.log(`Container ${vm_id} stopped successfully.`);
    } catch (error) {
        console.log("error while try to stop the container !");
    }
}