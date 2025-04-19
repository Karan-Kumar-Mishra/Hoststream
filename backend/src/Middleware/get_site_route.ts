import express from "express"
import Redis from "../Redis";
import path from "path";
export default function get_site_route(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) {
    if (req.method === 'GET') {
        console.log("we are try to geting your route : ", req.path);
        Redis.find_item(req.path.substring(0, req.path.length)).then((ans) => {
            console.log(" coming path is :", ans?.site_folder);
            const filePath = path.join(__dirname, "..", ans?.site_folder || "/default_folder", "/index.html");
            console.log("final path is :", filePath);
            
            res.sendFile(filePath, (err) => {
                if (err) {
                    console.error("Error sending file:", err);
                    next(err); // Pass error to Express error handler
                }
            });
        }).catch((err) => {
            console.error("Redis error:", err);
            next(err); // Pass Redis error to Express error handler
        });
    } else {
        next(); // Continue to next middleware if not GET request
    }
}