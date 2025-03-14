import multer from "multer";
import express from "express";
import path from "path";
import fs from "fs";

let locations = {
    user_folder_loactions: "",
    user_site_loactions: "default"
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        locations.user_folder_loactions = 'uploads/' + locations.user_folder_loactions+"/"+locations.user_site_loactions;
        if (!fs.existsSync(locations.user_folder_loactions)) {
            try {
                fs.mkdirSync(locations.user_folder_loactions, { recursive: true });
                console.log('Folder created successfully!');
            } catch (err) {
                console.error('Error creating folder:', err);
            }
        }
        cb(null, locations.user_folder_loactions);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

export {
    storage,
    locations
};