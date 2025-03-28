import express from "express"
const setup_folder = express.Router();
import { locations } from "../Data/data";
export default setup_folder.post('/', (req, res) => {
   locations.user_folder_loactions=req.body.name;
   res.send({
      status:"ok"
   })
})