"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_1 = require("../Data/data");
const fs_1 = __importDefault(require("fs"));
const setUploadDestination = (req, res, next) => {
    data_1.locations.user_folder_loactions = 'uploads/' + data_1.locations.user_folder_loactions + "/" + data_1.locations.user_site_loactions;
    if (!fs_1.default.existsSync(data_1.locations.user_folder_loactions)) {
        try {
            fs_1.default.mkdirSync(data_1.locations.user_folder_loactions, { recursive: true });
            console.log('Folder created successfully!');
        }
        catch (err) {
            console.error('Error creating folder:', err);
        }
    }
    next();
};
exports.default = setUploadDestination;
