import express from "express"
import dotenv from "dotenv"
import cors from "cors";
import middleware from "./middleware/index"
import bodyParser from "body-parser";
const server = express();
dotenv.config()
server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(express.json());
server.use(middleware.proxy_route);

//server.use('/add_route',middleware.)

server.setMaxListeners(100000);
server.listen(80, () => {
  console.log(`server is running on ${process.env.PORT}...`);
})