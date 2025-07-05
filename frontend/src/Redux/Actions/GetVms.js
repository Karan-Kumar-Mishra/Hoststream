

export const get_ec2s = (vm_data) => {
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
                    name: state.Data.UserInfo.user.name,
                })
            }
            let a = await fetch(import.meta.env.VITE_BACKEND_URL + '/get_vms', option);
            let res = await a.json()
            if (res.status === "ok") {
                dispatch({ type: 'GET_VMS', payload: res.vms })
            }
        } catch (error) {
            console.error("Error uploading files:", error);
        }
    };
};