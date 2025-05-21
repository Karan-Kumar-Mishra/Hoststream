export const setup_folder = () => {
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
                    name:state.Data.UserInfo.user.name
                })
            }
            let a = await fetch(import.meta.env.VITE_BACKEND_URL + '/setup_folder', option);
            let res = await a.json()
           
 
            if (res.status === "ok") {
         
                dispatch({type:'SETUP_FOLDER',payload:res})
            }
        } catch (error) {
            console.error("Error uploading files:", error);
        }
    };
};