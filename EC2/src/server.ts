import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import Services from "./Services";
import path from "path";
import Router from "./Router"; 
import bodyParser from "body-parser";



Services.init();
dotenv.config();


const server = express();
server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(express.json());

server.get('/', (req, res) => {
    res.send("ok");
});

server.use('/create',Router.create_container); 
server.use('/start', Router.start_container);
server.use('/stop', Router.stop_container);
server.use('/delete', Router.delete_container);

const port = process.env.PORT || 81;

server.listen(port, () => {
    console.log(`EC2 Server is running on ${port} ....`);
});