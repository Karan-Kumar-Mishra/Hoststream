import express from "express"
const delete_site = express.Router();
import Database from "../Database";
import Services from "../Services";
export default delete_site.post('/', (req, res) => {

    if (!req.body ||!req.body.user_id || !req.body.site_id ) {
        res.send({
            status: "error",
            msg: "Please give the user id and site id !"
        })
    }
    else {
  
       Services.find_site_folder_and_delete(req.body.user_id, req.body.site_id)
        Database.delete_site_db(req.body.user_id, req.body.site_id).then((ans) => {
            if (ans) {
                res.send({
                    status: "ok",
                })
            }
            else {
                res.send({
                    status: "error",
                    msg: "can not find the site !"
                })
            }
        }).catch((err) => {
            res.send({
                status: "error",
                msg: "error while deleteing your site !"
            })
        })


    }
})