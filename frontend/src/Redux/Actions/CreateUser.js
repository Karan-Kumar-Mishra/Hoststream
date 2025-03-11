 const create_user = (userdata) => {
    return async (dispatch,getState) => {
       const state = await getState();

      let option={
        method :"PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email:state.Data.UserData.email,
            notedata: userdata
        })
      }
      let a= await fetch(process.env.BACKEND_URL+'/create_user',option);
      let res= await a.json()
      if(res.status==="ok")
      {
       console.log("done");
      }
      dispatch({type:'ADD_NOTE',payload:res})
    };
};
export default create_user;