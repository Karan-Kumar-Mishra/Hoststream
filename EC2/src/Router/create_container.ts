import express from "express"

const creat_container = express.Router();
export default creat_container.post('/', (req, res) => {
    const new_container = {
        name: req.body.name,
        username: req.body.username,
        password: req.body.password,
        ports: req.body.ports
    }

}) 