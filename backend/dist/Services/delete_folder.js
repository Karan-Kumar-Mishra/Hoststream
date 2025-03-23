"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = deleteFolderRecursive;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
async function deleteFolderRecursive(folderPath) {
    try {
        // Resolve the full path to avoid issues with relative paths
        const resolvedPath = path_1.default.resolve(folderPath);
        // Check if the folder exists
        if (fs_1.default.existsSync(resolvedPath)) {
            console.log(`Deleting folder: ${resolvedPath}`);
            // Use fs.promises.rm for asynchronous deletion
            await fs_1.default.promises.rm(resolvedPath, { recursive: true, force: true });
            console.log(`Folder deleted successfully: ${resolvedPath}`);
        }
        else {
            console.log(`Folder does not exist: ${resolvedPath}`);
        }
    }
    catch (err) {
        console.error(`Error deleting folder: ${err}`);
    }
}
