"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = create_user_folder;
const fs_1 = __importDefault(require("fs"));
const data_js_1 = require("../Data/data.js");
function create_user_folder() {
    const uploads = "uploads";
    if (!fs_1.default.existsSync(uploads)) {
        try {
            fs_1.default.mkdirSync(uploads, { recursive: true });
            console.log("uploads folder created successfully:", uploads);
        }
        catch (err) {
            console.error("Error creating uploads folder:", err);
        }
    }
    const folderPath = `uploads/${data_js_1.locations.user_folder_loactions}`;
    if (!fs_1.default.existsSync(folderPath)) {
        try {
            fs_1.default.mkdirSync(folderPath);
            console.log('Folder created successfully!');
        }
        catch (err) {
            console.error('Error creating folder:', err);
        }
    }
    else {
        console.log('Folder already exists. Skipping creation.');
    }
}
