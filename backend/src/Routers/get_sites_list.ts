import express from "express"
const get_sites_list = express.Router();
import Database from "../Database";
export default get_sites_list.post('/', (req, res) => {
  Database.get_sites_list_db(req.body.id).then((ans) => {
    res.send({
      status: "ok",
      URL: ans
    })
  }).catch((err) => {
    console.log(err)
    res.send({
      status: "error",
      error: err
    })
  })
})