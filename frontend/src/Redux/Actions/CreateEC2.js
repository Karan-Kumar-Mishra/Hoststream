

export const create_ec2 = (site_id) => {
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
                    site_id: site_id,
                    name: state.Data.UserInfo.user.name
                })
            }
            let a = await fetch(import.meta.env.VITE_BACKEND_URL + '/create', option);
            let res = await a.json()
            if (res.status === "ok") {
                dispatch({ type: 'DELETE_SITE', payload: res })
            }
        } catch (error) {
            console.error("Error uploading files:", error);
        }
    };
};