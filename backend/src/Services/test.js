const fs =require('fs')


async function deleteFolderRecursive() {
  let  folderPath="C:/Users/91888/Desktop/Projects/HostStream/backend/dist/uploads/Karan Mishra/1x5xt";
  fs.rmdirSync(folderPath,{ 
    recursive: true, 
    force: true 
  })
}
deleteFolderRecursive()