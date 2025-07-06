
import { set_crvmpgif } from "./Setcrvmpif";
export const create_ec2 = (vm_data) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: 'NVGT_TO_VM', payload: false })
            const state = getState();

            let option = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user_id: state.Data.UserInfo.user.id,
                    //name: state.Data.UserInfo.user.name,
                    vm_name: vm_data.name,
                    vm_username: vm_data.username,
                    vm_password: vm_data.password
                })
            }
            console.log("vm_data whiling sending..", vm_data)
            dispatch({ type: 'SHOW_LOADER', payload: true })
            let a = await fetch(import.meta.env.VITE_EC2 + '/create', option);
            let res = await a.json()
            if (res.status === "ok") {
                const res_obj = {
                    id: res.vm_id,
                    name: res.vm_name,
                    username: res.vm_username,
                    password: res.vm_password
                }
                dispatch({ type: 'CREATE_VM', payload: res_obj })
                console.log("response=>", res)
                dispatch(set_crvmpgif(res));
                dispatch({ type: 'SHOW_LOADER', payload: false })
                dispatch({ type: 'NVGT_TO_VM', payload: true })
            }
        } catch (error) {
            console.error("Error uploading files:", error);
        }
    };
};