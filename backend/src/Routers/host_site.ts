import express from "express"
const host_site = express.Router();

export default host_site.post('/', (req, res) => {
    console.log(req.body);

    res.send({
        status: "ok"
    })

})