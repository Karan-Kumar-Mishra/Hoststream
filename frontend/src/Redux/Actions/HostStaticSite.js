
export const host_static_website = (userdata) => {
    return async (dispatch, getState) => {

        const state = await getState();
        console.log("user data and files => ", userdata);
        dispatch({ type: 'HOST_STATIC_SITE', payload: res })
    };
};