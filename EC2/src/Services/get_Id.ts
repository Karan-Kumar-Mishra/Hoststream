import Data from "../Data";

export default async function get_ID(container_name: string) {
    const containers = await Data.docker.docker.listContainers({ all: true });
    const target_cntr = containers.find((cntnr) => 
        cntnr.Names.some(name => name.includes(`/${container_name}`))
    );
  
    return target_cntr?.Id; 
}