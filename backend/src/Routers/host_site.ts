import express from "express"
const host_site = express.Router();
import multer from "multer";
import { storage } from "../Data/data.js"
import Services from "../Services";
import { locations } from "../Data/data.js";
const upload = multer({ storage: storage });
import Database from "../Database/index.js";



export default host_site.post('/', upload.array('files', 10), (req, res) => {
    const route = Services.generate_name(10);
    const new_site = {
        id: Services.generate_name(20),
        website_name: req.body.websiteName,
        site_folder: `/uploads/${locations.user_folder_loactions}/${locations.user_site_loactions}`,
        route: `/${route}`,
        URL: `http://localhost:88/${route}`,
        Date: new Date().toLocaleDateString()
    }
    Database.add_sites(new_site, req.body.id).then(() => {
        Services.route_for_site(new_site);
        res.send({
            status: "ok",
            site: new_site
        });
    })
    // console.log(new_site);
    // Services.get_url_with_domain(`http://localhost${new_site.route}`);
    // Database.add_domain_mapping({
    //     subdomain:`${Services.generate_name(6)}`,
    //     targetURL:`http://localhost${new_site.route}`
    // }).then((ans)=>{
    //     console.log("ans",ans);
    // }).catch((err)=>{
    //     console.log("err",err);
    // })

})
