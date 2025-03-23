import fs from 'fs';
import path from 'path';

export default async function deleteFolderRecursive(folderPath: string) {
    try {
        // Resolve the full path to avoid issues with relative paths
        const resolvedPath = path.resolve(folderPath);

        // Check if the folder exists
        if (fs.existsSync(resolvedPath)) {
            console.log(`Deleting folder: ${resolvedPath}`);

            // Use fs.promises.rm for asynchronous deletion
            await fs.promises.rm(resolvedPath, { recursive: true, force: true });
            console.log(`Folder deleted successfully: ${resolvedPath}`);
        } else {
            console.log(`Folder does not exist: ${resolvedPath}`);
        }
    } catch (err) {
        console.error(`Error deleting folder: ${err}`);
    }
}
