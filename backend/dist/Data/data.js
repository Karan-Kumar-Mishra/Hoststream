"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.locations = exports.storage = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
let locations = {
    user_folder_loactions: "default",
    user_site_loactions: "default"
};
exports.locations = locations;
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        const uploads = path_1.default.join("uploads");
        if (!fs_1.default.existsSync(uploads)) {
            try {
                fs_1.default.mkdirSync(uploads, { recursive: true });
                console.log("uploads folder created successfully:", uploads);
            }
            catch (err) {
                console.error("Error creating uploads folder:", err);
            }
        }
        let folderPath = path_1.default.join("uploads", locations.user_folder_loactions, locations.user_site_loactions);
        console.log("check site paht=>", folderPath);
        if (!fs_1.default.existsSync(folderPath)) {
            try {
                fs_1.default.mkdirSync(folderPath, { recursive: true });
                console.log("site Folder created successfully:", folderPath);
            }
            catch (err) {
                console.error("Error site folder creating folder:", err);
            }
        }
        cb(null, folderPath);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
exports.storage = storage;
