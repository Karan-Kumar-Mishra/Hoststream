import express from "express"
const create_user= express.Router();
export default create_user.post('/',(req,res)=>{
    console.log(req.body);
})