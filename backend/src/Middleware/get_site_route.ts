import express from "express";
import path from "path";
import fs from "fs";

export default function get_site_route(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) {
    if (req.method === 'GET') {
        // Check if the path has a file extension
        const hasExtension = path.extname(req.path) !== '';
        
        let filePath;
        if (hasExtension) {
            // If there's an extension, use the requested path directly
            filePath = path.join(__dirname, "..", req.path);
        } else {
            // If no extension, append index.html
            filePath = path.join(__dirname, "..", req.path, "index.html");
        }

        console.log("path url is=>", filePath);
        
        // Check if file exists before sending
        fs.access(filePath, fs.constants.F_OK, (err) => {
            if (err) {
                // File doesn't exist, pass to next middleware
                next();
                return;
            }
            res.sendFile(filePath);
        });
    } else {
        next();
    }
}