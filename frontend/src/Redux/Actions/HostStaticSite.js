import axios from "axios";

export const host_static_website = ({ files, websiteName, domainName }) => {
    return async (dispatch, getState) => {
        try {
            const state = getState();
            const formData = new FormData();
            files.forEach((file, index) => {
                formData.append("files", file);
            });

            formData.append("websiteName", websiteName);
            formData.append("domainName", domainName);
            formData.append("id", state.Data.UserInfo.user.id);
            formData.append("user_name", state.Data.UserInfo.user.name);
            dispatch({type:'SHOW_LOADER',payload:true})
            console.log("loading start =>",state.Data.ComponentData.show_file_loader);
            
            const response = await axios.post(
                import.meta.env.VITE_BACKEND_URL + "/host_site",
                formData
            );
            dispatch({type:'SHOW_LOADER',payload:false})
            console.log("loading end =>",state.Data.ComponentData.show_file_loader);

            window.location.href = "/dashboard";

            console.log("after set crsp=>", state);

            console.log("Response=>", response.data);
        } catch (error) {
            console.error("Error uploading files:", error);
        }
    };
};