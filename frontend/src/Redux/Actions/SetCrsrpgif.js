
export const set_crspgif = (userdata) => {
    return async (dispatch,getState) => {
       const state = await getState();     
     
        
      state.Data.UserInfo.other_info.crsrpgif.URL=userdata.URL;
      state.Data.UserInfo.other_info.crsrpgif.site_name=userdata.website_name;
      state.Data.UserInfo.other_info.crsrpgif.Date=userdata.Date;
      state.Data.UserInfo.other_info.crsrpgif.id=userdata.id;
      state.Data.UserInfo.other_info.crsrpgif.domain_name=
      `http://${userdata.domain_name}.${import.meta.env.VITE_PROXY || "localhost"}`;
      console.log("chik in action after comming date :",state.Data.UserInfo.other_info.crsrpgif);

     // console.log("checking in action SET_CRSRPGIF: ", updatedState.Data.UserInfo.other_info.crsrpgif);
      dispatch({type:'SET_CRSRPGIF',payload:state})
    };
};