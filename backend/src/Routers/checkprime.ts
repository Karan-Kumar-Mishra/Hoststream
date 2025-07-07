import express from "express"
const checkprime = express.Router();
import Database from "../Database";
export default checkprime.post('/', (req, res) => {
    // if (!req.body.user_id) {
    //     res.send({
    //         status: "error",
    //         msg: "please send the user_id !"
    //     })
    // }
 
    Database.check_prime(req.body.user_id).then((ans) => {
        res.send({
            status: "ok",
            ans: ans
        })
    }).catch((error) => {
        res.send({
            status: "error",
            msg: error
        })
    })

})