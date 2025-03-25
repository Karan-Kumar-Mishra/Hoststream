"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = deleteFolderRecursive;
const fs_1 = __importDefault(require("fs"));
async function deleteFolderRecursive(folderPath) {
    console.log("Attempting to delete folder at location:", folderPath);
    try {
        // Check if folder exists first
        if (!fs_1.default.existsSync(folderPath)) {
            console.log(`Folder does not exist at path: ${folderPath}`);
            return;
        }
        // Modern way to delete recursively (Node.js 14.14.0+)
        fs_1.default.rmSync(folderPath, {
            recursive: true,
            force: true, // Continue even if files are readonly
            maxRetries: 3, // Retry if files are temporarily locked
            retryDelay: 100 // Wait 100ms between retries
        });
        console.log("Successfully deleted folder and its contents");
    }
    catch (err) {
        console.error("Error deleting folder:", err);
        throw err; // Re-throw if you want calling code to handle it
    }
}
