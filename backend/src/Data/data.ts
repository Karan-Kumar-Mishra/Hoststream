import multer from "multer";
import express from "express";
import path from "path";
import fs from "fs";
import Services from "../Services";
let locations = {
    user_folder_loactions: "default",
    user_site_loactions: "default"
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
     
        let folderPath = path.join("uploads", locations.user_folder_loactions, locations.user_site_loactions);
        if (!fs.existsSync(folderPath)) {
            try {
                fs.mkdirSync(folderPath, { recursive: true });
                console.log("Folder created successfully:", folderPath);
            } catch (err) {
                console.error("Error creating folder:", err);
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