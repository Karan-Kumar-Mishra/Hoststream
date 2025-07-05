import express, { Request, Response } from "express"
import Services from "../Services";
import Database from "../Database";
const creat_container = express.Router();

export default creat_container.post('/', (req: Request, res: Response) => {

    // if (!req.body.vm_name || req.body.username || req.body.password) {
    //   res.json({
    //           status:"error",
    //           message:"Invaild json!"
    //     })
    // }
    console.log("on create route=> ",req.body)
    const new_container = {
        user_id: req.body.user_id,
        name: req.body.vm_name,
        username: req.body.vm_username,
        password: req.body.vm_password,
        ports: req.body.vm_ports
    }

    Services.create_container(new_container)
        .then(async (id) => {
            return await Services.start_container(id).then(() => id);
        })
        .then(async (id) => {

            return await Database.add_vm(req.body.user_id, {
                vm_id: id,
                vm_name: new_container.name,
                vm_username: new_container.username,
                vm_password: new_container.password
            }).then(() => id);
        })
        .then((id) => {
            console.log("send object=> ",new_container)
            res.send({
                status: "ok",
                vm_id: id,
                vm_name: new_container.name,
                vm_username: new_container.username,
                vm_password: new_container.password
            });
        })
        .catch((error) => {

            res.status(500).json({
                status: "error",
                message: error.message
            });
        });

}) 