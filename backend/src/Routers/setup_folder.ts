import express from "express"
const setup_folder = express.Router();
import { locations } from "../Data/data";
import Services from "../Services";
import create_user_folder from "../Services/create_user_folder.js";
export default setup_folder.post('/', (req, res) => {
   locations.user_folder_loactions = req.body.name;
   create_user_folder();
   Services.setup_site_folder();
   res.send({
      status: "ok"
   })
})