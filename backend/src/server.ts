import express from "express"
import dotenv from "dotenv"
import  Routers from "./Routers/index.js";
const server=express();
dotenv.config()

server.use('/create_user',Routers.create_user);



server.listen(process.env.PORT,()=>{
    console.log("Server is running ...");
})