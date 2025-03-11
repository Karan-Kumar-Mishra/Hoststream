import axios from "axios";

export const host_static_website = ({ files, websiteName, domainName }) => {
    return async (dispatch) => {
        try {
            const formData = new FormData();
            files.forEach((file, index) => {
                formData.append("files", file);
            });
            formData.append("websiteName", websiteName);
            formData.append("domainName", domainName);
            console.log("data=>",formData);
            // const response = await axios.post("http://your-backend-url/upload", formData, {
            //     headers: {
            //         "Content-Type": "multipart/form-data",
            //     },
            // });
           // console.log("Files uploaded successfully:", response.data);
        } catch (error) {
            console.error("Error uploading files:", error);
        }
    };
};