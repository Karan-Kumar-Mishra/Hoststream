const set_user = (userdata) => {
  return async (dispatch, getState) => {
    const state = await getState();
    state.Data.UserInfo.user.id = userdata.id;
    state.Data.UserInfo.user.email = userdata.email;
    state.Data.UserInfo.user.name = userdata.name;
    console.log("state =>", state.Data);
    dispatch({ type: 'SET_USER', payload: state })
  };
};
export default set_user;