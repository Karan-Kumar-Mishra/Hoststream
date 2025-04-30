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
                console.log("check response code ", response);
                if (response.status != 200) {
                    dispatch({ type: 'SHOW_LOADER', payload: false });
                    dispatch({ type: 'SET_ERROR', payload: { msg: "Network response was not ok", show: true } })
                    console.log("check the error resonse->", response)
                    // throw new Error('Network response was not ok');
                }
                if (!response.ok) {
                    dispatch({ type: 'SHOW_LOADER', payload: false });
                    dispatch({ type: 'SET_ERROR', payload: { msg: "Network response was not ok", show: true } })
                    throw new Error('Network response was not ok');
                }
                return response.json();
            }
            ).then((response) => {
                console.log("check the error resonse->", response)
                if (response.status == "error") {
                    dispatch({ type: 'SHOW_LOADER', payload: false });
                    dispatch({ type: 'SET_ERROR', payload: { msg: response.error, show: true } })
                    return;
                }

                dispatch(set_crspgif(response.site));
                const updatedState = getState();
                dispatch({ type: 'SHOW_LOADER', payload: false });
                dispatch({ type: 'NVGT_TO_SITE', payload: true });

                return response;
            }).catch((error) => {
                dispatch({ type: 'SHOW_LOADER', payload: false });
                dispatch({ type: 'SET_ERROR', payload: { msg: error.msg, show: true } })
            })



        } catch (error) {
            console.error("Error uploading files:", error);
            dispatch({ type: 'SHOW_LOADER', payload: false });
            dispatch({ type: 'SET_ERROR', payload: { msg: error.msg, show: true } })
        }
    };
};