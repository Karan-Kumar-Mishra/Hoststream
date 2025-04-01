import fs from "fs";
import path from "path";
import { locations } from "../Data/data.js";

export default function create_user_folder() {
    // Use absolute path for uploads directory
    const uploadsDir = path.join(__dirname, "..","uploads"); // Points to project-root/uploads

    if (!fs.existsSync(uploadsDir)) {
        try {
            fs.mkdirSync(uploadsDir, { recursive: true });
            fs.chmodSync(uploadsDir, 0o755);
            console.log("Uploads folder created:", uploadsDir);
        } catch (err) {
            console.error("Error creating uploads folder:", err);
            return; // Exit if uploads folder fails
        }
    }

   
    
    const userFolder = path.join(uploadsDir, locations.user_folder_loactions);


    if (!fs.existsSync(userFolder)) {
        try {
            fs.mkdirSync(userFolder, { recursive: true });
            fs.chmodSync(userFolder, 0o755);
            console.log("User folder created:", userFolder);
        } catch (err) {
            console.error("Error creating user folder:", err);
        }
    } else {
        console.log("User folder already exists:", userFolder);
    }
}