import toast from "react-hot-toast";
export const set_error = (erro_msg) => {
    return async (dispatch,getState) => {
      dispatch({type:'SET_ERROR',payload:{msg:erro_msg,show:true}})
    };
};