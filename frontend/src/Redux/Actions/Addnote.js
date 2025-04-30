
export const addNote = (userdata) => {
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
      let a= await fetch(process.env.REACT_APP_BACKEND_URL+'/addnote',option);
      let res= await a.json()
      if(res.status==="ok")
      {
        toast.success("New note is save successfully !");
      }
      dispatch({type:'ADD_NOTE',payload:res})
    };
};