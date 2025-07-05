

export const delete_vm = (vm_id) => {
    return async (dispatch, getState) => {
        try {
            const state = getState();
            let option = {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user_id: state.Data.UserInfo.user.id,
                    vm_id: vm_id
                })
            }
            dispatch({ type: 'SHOW_LOADER', payload: true })
            let a = await fetch(import.meta.env.VITE_EC2 + '/delete', option);
            let res = await a.json()
            if (res.status === "ok") {
                dispatch({ type: 'DELETE_VM', payload: res })
                dispatch({ type: 'SHOW_LOADER', payload: false })
            }
        } catch (error) {
            console.error("Error deleting vm ", error);
        }
    };
};