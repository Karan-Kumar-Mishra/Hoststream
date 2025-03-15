import fs from "fs";
import { locations } from "../Data/data.js";

export default function create_user_folder() {
    const folderPath = `uploads/${locations.user_folder_loactions}`;
    if (!fs.existsSync(folderPath)) {
        try {
            fs.mkdirSync(folderPath);
            console.log('Folder created successfully!');
        } catch (err) {
            console.error('Error creating folder:', err);
        }
    } else {
        console.log('Folder already exists. Skipping creation.');
    }
}