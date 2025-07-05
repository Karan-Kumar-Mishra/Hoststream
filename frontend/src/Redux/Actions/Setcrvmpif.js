
export const set_crvmpgif = (userdata) => {
    return async (dispatch, getState) => {
        const state = await getState();


        state.Data.UserInfo.other_info.crvmsrpgif.vm_url = "https://www.google.com";
        state.Data.UserInfo.other_info.crvmsrpgif.vm_name = userdata.vm_name;
        state.Data.UserInfo.other_info.crvmsrpgif.id = userdata.vm_id;
        state.Data.UserInfo.other_info.crvmsrpgif.vm_username = userdata.vm_username;
        state.Data.UserInfo.other_info.crvmsrpgif.vm_password = userdata.vm_password;
        //   `http://${userdata.domain_name}.${import.meta.env.VITE_PROXY || "localhost"}`;
        //   console.log("chik in action after comming date :",state.Data.UserInfo.other_info.crsrpgif);

        // console.log("checking in action SET_CRSRPGIF: ", updatedState.Data.UserInfo.other_info.crsrpgif);
        dispatch({ type: 'SET_CRVMPGIF', payload: state })
    };
};