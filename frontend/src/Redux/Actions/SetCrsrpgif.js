
export const set_crspgif = (userdata) => {
    return async (dispatch,getState) => {
       const state = await getState();     
      state.Data.UserInfo.other_info.crsrpgif.URL=userdata.URL;
      state.Data.UserInfo.other_info.crsrpgif.site_name=userdata.website_name;
      state.Data.UserInfo.other_info.crsrpgif.Date=userdata.Date;
      state.Data.UserInfo.other_info.crsrpgif.id=userdata.id;

      dispatch({type:'SET_CRSRPGIF',payload:state})
    };
};