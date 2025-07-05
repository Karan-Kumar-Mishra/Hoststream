
export const set_crvmpgif = (userdata) => {
    return async (dispatch, getState) => {
        const state = await getState();
        state.Data.UserInfo.other_info.crvmsrpgif.vm_url = `http://${userdata.vm_name}.hoststream.${import.meta.env.VITE_EC2_HOST}`;
        state.Data.UserInfo.other_info.crvmsrpgif.vm_name = userdata.vm_name;
        state.Data.UserInfo.other_info.crvmsrpgif.vm_id = userdata.vm_id;
        state.Data.UserInfo.other_info.crvmsrpgif.vm_username = userdata.vm_username;
        state.Data.UserInfo.other_info.crvmsrpgif.vm_password = userdata.vm_password;
        dispatch({ type: 'SET_CRVMPGIF', payload: state });
    };
};