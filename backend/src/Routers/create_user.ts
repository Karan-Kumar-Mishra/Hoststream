import express from "express"
const create_user = express.Router();
import create_user_db from "../Database/create_user_db.js";


export default create_user.post('/', (req, res) => {

    create_user_db(req.body).then((ans) => {
        res.send({
            status:"ok"
        })
    }).catch((err) => {
        res.send(err)
    })

})