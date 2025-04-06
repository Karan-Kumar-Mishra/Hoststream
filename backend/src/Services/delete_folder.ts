import fs from 'fs';
import path from 'path';

export default async function deleteFolderRecursive(folderPath: string) {
    console.log("Attempting to delete folder at location:", folderPath);
    
    try {
        // Check if folder exists first
        if (!fs.existsSync(folderPath)) {
            console.log(`Folder does not exist at path: ${folderPath}`);
            return;
        }

        // Modern way to delete recursively (Node.js 14.14.0+)
        fs.rmSync(folderPath, {
            recursive: true,
            force: true, // Continue even if files are readonly
            maxRetries: 3, // Retry if files are temporarily locked
            retryDelay: 100 // Wait 100ms between retries
        });
        
        console.log("Successfully deleted folder and its contents");
    } catch (err) {
        console.error("Error deleting folder:", err);
        throw err; // Re-throw if you want calling code to handle it
    }
}