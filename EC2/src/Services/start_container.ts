import Data from "../Data";
export default async function start_container(id: string) {
    try {
        const container = Data.docker.docker.getContainer(id);
        await container.start();
        console.log(`Container ${id} start successfully.`);
    } catch (error) {
        console.log("error while try to start the container !");
        console.log(error)
    }
}