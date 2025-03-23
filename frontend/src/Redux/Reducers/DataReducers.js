const initialState = {
  ComponentData: {

  },
  UserInfo: {
    user: {
      id: "default id",
      name: "defaut name",
      email: "default email"
    },
    services: {
      static_site: []
    },
    other_info: {
      crsrpgif:{ // current servicepage information
        id:1234,
        URL:"https://www.google.com",
        site_name:"site name",
        Date:Date.now()
      }
    },
  },
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state };
    case "HOST_STATIC_SITE":
      return { ...state };
    case "GET_SITES_LIST":
      state.UserInfo.services.static_site=action.payload.URL;
      return state ;
    case "SET_CRSRPGIF":
      return state;
    case "DELETE_SITE":
        return state;
    default:


      return state;
  }
};

export default dataReducer;