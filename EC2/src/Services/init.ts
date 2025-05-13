import pull_image from "./pull_image";
export default async function init() {
    console.log("Running the init server...");
    
    const f1= await  pull_image('karankumarmishra/wssh:latest');
    const f2= await  pull_image('traefik');
    if (f1 && f2) {
        console.log("images pullImage ready for container deployment ")
    }
}