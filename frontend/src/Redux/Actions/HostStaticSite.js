import axios from "axios";
import { set_crspgif } from "./SetCrsrpgif.js";
export const host_static_website = ({ files, websiteName, domainName }) => {
    return async (dispatch, getState) => {
        try {
            let state = getState();
            const formData = new FormData();
            files.forEach((file, index) => {
                formData.append("files", file);
            });

            formData.append("websiteName", websiteName);
            formData.append("domainName", domainName);
            formData.append("id", state.Data.UserInfo.user.id);
            formData.append("user_name", state.Data.UserInfo.user.name);
            dispatch({ type: 'NVGT_TO_SITE', payload: false })
            dispatch({ type: 'SHOW_LOADER', payload: true })
            //  console.log("loading start =>", state.Data.ComponentData.show_file_loader);

            fetch(import.meta.env.VITE_BACKEND_URL + "/host_site", {
                method: 'POST',
                body: formData,
            }).then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            }
            ).then((response) => {
             //   console.log("Response data:------>", response.site);
                dispatch(set_crspgif(response.site));
         
                const updatedState = getState();
             //   console.log("checking in thunk SET_CRSRPGIF: ", updatedState.Data.UserInfo.other_info.crsrpgif);
                dispatch({ type: 'SHOW_LOADER', payload: false });
                dispatch({ type: 'NVGT_TO_SITE', payload: true });
             //   console.log("checking in thunk nvgt_to_site : ", updatedState.Data.ComponentData.nvgt_to_site);

                return response;
            })



        } catch (error) {
            console.error("Error uploading files:", error);
        }
    };
};