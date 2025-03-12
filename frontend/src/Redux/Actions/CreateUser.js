const create_user = () => {
  return async (dispatch, getState) => {
    const state = await getState();


    let option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: state.Data.UserInfo.user.id,
        name: state.Data.UserInfo.user.name,
        email: state.Data.UserInfo.user.email
      })
    }



    let a = await fetch(import.meta.env.VITE_BACKEND_URL + '/create_user', option);
    let res = await a.json()
    if (res.status === "ok") {
      console.log("done");
    }
    dispatch({ type: 'ADD_NOTE', payload: "ok" })
  };
};
export default create_user;