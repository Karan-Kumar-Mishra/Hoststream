import express from "express"
import dotenv from "dotenv"
const server=express();
dotenv.config()





server.listen(process.env.PORT,()=>{
    console.log("Server is running ...");
})