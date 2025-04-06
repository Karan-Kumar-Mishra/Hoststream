import multer from "multer";
import path from "path";
import fs from "fs";

let locations = {
    user_folder_loactions: "default",
    user_site_loactions: "default"
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploads = path.join(__dirname,"..","uploads");
        if (!fs.existsSync(uploads)) {
            try {
                fs.mkdirSync(uploads, { recursive: true });
                console.log("uploads folder created successfully:", uploads);
            } catch (err) {
                console.error("Error creating uploads folder:", err);
            }
        }
        let folderPath = path.join(__dirname,"..","uploads", locations.user_folder_loactions, locations.user_site_loactions);
      
        
        if (!fs.existsSync(folderPath)) {
            try {
                fs.mkdirSync(folderPath, { recursive: true });
                console.log("site Folder created successfully:", folderPath);
            } catch (err) {
                console.error("Error site folder creating folder:", err);
            }
        }
        cb(null, folderPath);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

export {
    storage,
    locations
};