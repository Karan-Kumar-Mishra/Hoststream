import express from "express"
import dotenv from "dotenv"
import cors from "cors";
import Services from "./Services";
import path from "path"
import Router from "./Router";


Services.init();
dotenv.config()
dotenv.config({
    path: path.resolve(__dirname, '.env')
});
const server= express();
server.use(cors());

server.use('/start',Router.start_container);



const port = process.env.PORT || 77;
server.listen(port, () => {
    console.log(`EC2 Server is running on ${port} ....`);
})


