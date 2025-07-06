import express from "express"
import Services from "../Services";
const stop_container = express.Router();
export default stop_container.post('/', (req, res) => {
    // if ((!req.body) || (!req.body.vm_id)) {
    //     res.json({
    //         status: "error",
    //         msg: "Please the id for container ?"
    //     })
    // }
    console.log("while stoping => ",req.body);
    Services.stop_container(req.body.user_id,req.body.vm_id).then(() => {
        res.json({
            status: "ok"
        })
    }).catch(() => {
        res.json({
            status: "error",
        })
    })
}) 