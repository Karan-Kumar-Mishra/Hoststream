import express from "express"
const create_user = express.Router();
import create_user_db from "../Database/create_user_db.js";
import create_user_folder from "../Services/create_user_folder.js";
import { locations } from "../Data/data.js";
export default create_user.post('/', (req, res) => {
    create_user_db(req.body).then((ans) => {
        locations.user_folder_loactions=req.body.name;
        create_user_folder();
        res.send({
            status: "ok"
        })
    }).catch((err) => {
        res.send(err)
    })

})