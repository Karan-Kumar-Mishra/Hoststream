import express from "express"
import Services from "../Services";
const start_container = express.Router();
export default start_container.post('/', (req, res) => {
    // if ((!req.body) || (!req.body.id)) {
    //     res.json({
    //         status: "error",
    //         msg: "Please the id for container ?"
    //     })
    // }
    Services.start_container(req.body.user_id,req.body.vm_id).then(() => {
        res.json({
            status: "ok"
        })
    }).catch(() => {
        res.json({
            status: "error",
        })
    })
}) 