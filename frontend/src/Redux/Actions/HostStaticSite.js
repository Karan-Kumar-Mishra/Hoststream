import axios from "axios";

export const host_static_website = ({ files, websiteName, domainName }) => {
    return async (dispatch) => {
        try {
            console.log(files,websiteName,domainName);
            
            const formData = new FormData();
            files.forEach((file, index) => {
                formData.append("files", file);
            });
            formData.append("websiteName", websiteName);
            formData.append("domainName", domainName);

            for (let [key, value] of formData.entries()) {
                console.log(key, value);
            }
            const response = await axios.post(import.meta.env.VITE_BACKEND_URL+"/host_site", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
          console.log("Files uploaded successfully:", response.data);
        } catch (error) {
            console.error("Error uploading files:", error);
        }
    };
};