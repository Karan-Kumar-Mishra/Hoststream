import axios from "axios";

export const host_static_website = ({ files, websiteName, domainName }) => {
    return async (dispatch, getState) => {
        try {

            console.log("Files:", files);
            console.log("Website Name:", websiteName);
            console.log("Domain Name:", domainName);

            const state = getState();
            const formData = new FormData();


            files.forEach((file, index) => {
                formData.append("files", file);
            });

            formData.append("websiteName", websiteName);
            formData.append("domainName", domainName);
            formData.append("id", state.Data.UserInfo.user.id);


            for (let [key, value] of formData.entries()) {
                console.log(key, value);
            }


            const response = await axios.post(
                import.meta.env.VITE_BACKEND_URL + "/host_site",
                formData
            );

            console.log("Files uploaded successfully:", response.data);
        } catch (error) {
            console.error("Error uploading files:", error);
        }
    };
};