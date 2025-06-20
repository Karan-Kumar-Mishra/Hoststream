import pull_image from "./pull_image";
import checkDockerImageExists from "./checkDockerImageExists";
import start_bash_container from "./start_bash_container";
import createNetwork from "./createNetwork";
import remove_network from "./remove_network";


export default async function init() {

    console.log("Running the init server...");
    await remove_network('hoststream-network');
    await createNetwork();


    let a: boolean = await checkDockerImageExists('karankumarmishra/wssh:latest');
    let b: boolean = await checkDockerImageExists('traefik');
    if (a && b) {
        console.log("images exist ready for container deployment ")
    }
    else {
        await pull_image('karankumarmishra/wssh:latest');
        await pull_image('traefik');
        await pull_image('karankumarmishra/wssh');
        console.log("images pullImage ready for container deployment ")
    }
    start_bash_container();





}