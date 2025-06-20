import express from "express"
import Services from "../Services";
const stop_container = express.Router();
export default stop_container.post('/', (req, res) => {
    if ((!req.body) || (!req.body.id)) {
        res.json({
            status: "error",
            msg: "Please the id for container ?"
        })
    }
    Services.stop_container(req.body.id).then(() => {
        res.json({
            status: "ok"
        })
    }).catch(() => {
        res.json({
            status: "error",
        })
    })
}) 