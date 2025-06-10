import Data from "../Data";
export default async function stop_container(id: string) {
    try {
        const container = Data.docker.docker.getContainer(id);
        await container.stop();
        
        console.log(`Container ${id} stopped successfully.`);
    } catch (error) {
        console.log("error while try to stop the container !");
    }
}