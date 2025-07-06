import express from "express"
import dotenv from "dotenv"
import cors from "cors";
import Routers from "./Routers/index.js";
import bodyParser from "body-parser";
import Database from "./Database/index.js";
import server from "./Services/get_server.js"
import path from "path";
import Middleware from "./Middleware/index.js";
import { connect_redis } from "./Data/data.js";
// const server=express();

dotenv.config()
dotenv.config({
    path: path.resolve(__dirname, '../.env')
});
server.use(cors());

Database.connectdb();
connect_redis();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(express.json());
server.use(Middleware.get_site_route);

server.use('/create_user', Routers.create_user);
server.use('/host_site', Routers.host_site);
server.use('/get_sites_list', Routers.get_sites_list);
server.use('/delete_site', Routers.delete_site);
server.use('/setup_folder', Routers.setup_folder);
server.use('/get_vms', Routers.get_vms);
server.use('/create_order', Routers.createorder);
server.use('/verify_payment', Routers.verify_payment);

const port = process.env.PORT || 88;
server.listen(port, () => {
    console.log(`Backend Server is running on ${port} ....`);
})