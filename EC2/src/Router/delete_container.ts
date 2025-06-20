import express from "express"
import Services from "../Services";
const delete_container = express.Router();
export default delete_container.delete('/', (req, res) => {
    if((!req.body) || (!req.body.id))
    {
         res.json({
            status: "error",
            msg:"Please the id for container ?"
        })
    }
    Services.remove_container(req.body.id).then(() => {
        res.json({
            status: "ok"
        })
    }).catch(() => {
        res.json({
            status: "error",
        })
    })
}) 