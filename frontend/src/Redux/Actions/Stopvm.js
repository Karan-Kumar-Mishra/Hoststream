export const stop_vm = (vm_id) => {
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
                    vm_id:vm_id
                })
            }
            let a = await fetch(import.meta.env.VITE_EC2+ '/stop', option);
            let res = await a.json()
            if (res.status === "ok") {
                dispatch({ type: 'STOP_VM', payload: res })
            }
        } catch (error) {
            console.error("Error stoping vms:", error);
        }
    };
};