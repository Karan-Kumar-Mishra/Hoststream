

export const delete_site = (site_id) => {
    return async (dispatch, getState) => {
        try {
            const state = getState();
         
            let option = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user_id: state.Data.UserInfo.user.id,
                    site_id:site_id
                })
            }
            let a = await fetch(import.meta.env.VITE_BACKEND_URL + '/delete_site', option);
            let res = await a.json()
            if (res.status === "ok") {
                dispatch({type:'DELETE_SITE',payload:res})
            }
        } catch (error) {
            console.error("Error uploading files:", error);
        }
    };
};