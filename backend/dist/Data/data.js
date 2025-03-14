"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.locations = exports.storage = void 0;
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
let locations = {
    user_folder_loactions: "",
    user_site_loactions: "default"
};
exports.locations = locations;
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        locations.user_folder_loactions = 'uploads/' + locations.user_folder_loactions + "/" + locations.user_site_loactions;
        if (!fs_1.default.existsSync(locations.user_folder_loactions)) {
            try {
                fs_1.default.mkdirSync(locations.user_folder_loactions, { recursive: true });
                console.log('Folder created successfully!');
            }
            catch (err) {
                console.error('Error creating folder:', err);
            }
        }
        cb(null, locations.user_folder_loactions);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
exports.storage = storage;
