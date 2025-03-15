import express from "express"
const host_site = express.Router();
import multer from "multer";
import { storage } from "../Data/data.js"
import Services from "../Services";
import { locations } from "../Data/data.js";
const upload = multer({ storage: storage });
import Database from "../Database/index.js";

export default host_site.post('/', (req, res, next) => {
    Services.setup_site_folder();
    //setup the site folder name 
    next()
}, upload.array('files', 10), (req, res) => {

    const new_site = {
        website_name: req.body.websiteName,
        site_folder: `/uploads/${locations.user_folder_loactions}/${locations.user_site_loactions}`,
        route: `/${Services.generate_name(10)}`
    }
    Database.add_sites(new_site,req.body.id);
    console.log(new_site);
    Services.route_for_site(new_site);
    res.send({
        status: "ok",
    });
})