import express from "express"
const get_vms = express.Router();
import Database from "../Database";
export default get_vms.post('/', (req, res) => {
   if (!req.body.user_id) {
      res.json({
         status: "err",
         msg: "Invaild json !"
      })
   }
   Database.get_vms(req.body.user_id).then((ans) => {
      
      return res.json({
         status:"ok",
         vms:ans
      });
   }).catch((err) => {
      res.send({
         status: "err",
         msg: err
      })
   })
})