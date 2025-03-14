import express from "express"
const host_site = express.Router();
import multer from "multer";
import { storage } from "../Data/data.js"
import { locations } from "../Data/data.js";
import generate_name from "../Services/generate_name.js";

const upload = multer({ storage: storage });

export default host_site.post('/', (req, res, next) => {
    locations.user_site_loactions = generate_name();
    next()
}, upload.array('files'), (req, res) => {

    const files = req.files;
    const websiteName = req.body.websiteName;
    const domainName = req.body.domainName;
    const username = req.body.username;
    locations.user_folder_loactions = username;
    res.send({
        status: "ok",

    });

})