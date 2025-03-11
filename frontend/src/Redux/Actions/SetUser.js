const set_user = (userdata) => {
    return async (dispatch,getState) => {
       const state = await getState();

    console.log("setting user =>",userdata);
    console.log("state =>",userdata);

       
      dispatch({type:'ADD_NOTE',payload:res})
    };
};
export default set_user;