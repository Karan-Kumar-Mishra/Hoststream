

export const get_list_static_site = () => {
    return async (dispatch, getState) => {
        try {
            const state = getState();

            let option = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: state.Data.UserInfo.user.id,
                })
            }
            let a = await fetch(import.meta.env.VITE_BACKEND_URL + '/get_sites_list', option);
            let res = await a.json()
           
 
            if (res.status === "ok") {
         
                dispatch({type:'GET_SITES_LIST',payload:res})
            }
        } catch (error) {
            console.error("Error uploading files:", error);
        }
    };
};