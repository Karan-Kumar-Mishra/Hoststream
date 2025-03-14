import fs from "fs";
export default function create_site_folder(name: string) {
    const folderPath = `./uploads/${name}`;
    fs.mkdir(folderPath, { recursive: true }, (err) => {
        if (err) {
            console.error('Error creating folder:', err);
        } else {
            console.log('Folder created successfully!');
        }
    });
}
