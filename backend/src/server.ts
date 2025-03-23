import express from "express"
import dotenv from "dotenv"
import cors from "cors";
import  Routers from "./Routers/index.js";
import bodyParser from "body-parser";
import Database from "./Database/index.js";
import  server  from "./Services/get_server.js"

// const server=express();
dotenv.config()
server.use(cors());
Database.connectdb();
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(express.json());

server.use('/create_user',Routers.create_user);
server.use('/host_site',Routers.host_site);
server.use('/get_sites_list',Routers.get_sites_list);
server.use('/delete_site',Routers.delete_site);



server.listen(88,()=>{
    console.log("Server is running ...");
})