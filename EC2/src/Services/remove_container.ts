import Data from "../Data";
export default async function remove_container(id: string) {
    try {
        const container = Data.docker.docker.getContainer(id);
        await container.stop();
        await container.remove();
        console.log(`Container ${id} delete successfully.`);
    } catch (error) {
        console.log("error while try to delete the container !");
    }
}