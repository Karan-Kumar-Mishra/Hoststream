import express from "express"
const host_site = express.Router();
import multer from "multer";
import { storage } from "../Data/data.js"
import Services from "../Services";
import { locations } from "../Data/data.js";
import Redis from "../Redis/index.js";
import Database from "../Database/index.js";
import { upload } from "../Data/data.js";
import { site_type, redis_item_type } from "../Data/types.js";

export default host_site.post('/', upload.array('files', 20), async (req, res, next) => {
    try {
        const route = Services.generate_name(10);
        let new_site: site_type | null = null;
        let new_redis_item: redis_item_type | null = null;

        const domainAvailable = await Redis.find_domain(req.body.domainName);
        if (domainAvailable === true) {
            res.json({ status: "error", error: "domain is not available" });
            return;
        }

        new_site = {
            id: Services.generate_name(20),
            website_name: req.body.websiteName,
            domain_name: req.body.domainName,
            site_folder: `/uploads/${locations.user_folder_loactions}/${locations.user_site_loactions}`,
            route: `/${route}`,
            URL: `http://localhost:88/${route}`,
            Date: new Date().toLocaleDateString()
        };

        new_redis_item = {
            id: new_site.id,
            route: new_site.route,
            domain: new_site.domain_name,
            site_folder: new_site.site_folder
        };

        await Redis.add_item(new_redis_item);
        await Database.add_sites(new_site, req.body.id);
        await Services.route_for_site(new_site, req.body.id);

        res.status(200).json({
            status: "ok",
            site: new_site
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", error: "Internal server error" });
    }
});