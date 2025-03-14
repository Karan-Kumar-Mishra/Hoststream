"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = create_site_folder;
const fs_1 = __importDefault(require("fs"));
function create_site_folder(name) {
    const folderPath = `./uploads/${name}`;
    fs_1.default.mkdir(folderPath, { recursive: true }, (err) => {
        if (err) {
            console.error('Error creating folder:', err);
        }
        else {
            console.log('Folder created successfully!');
        }
    });
}
