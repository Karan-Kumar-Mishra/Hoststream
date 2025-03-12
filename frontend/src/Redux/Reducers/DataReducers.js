const initialState = {
    ComponentData: {
     
    },
    UserInfo: {
      user:{
        id:"default id",
        name:"defaut name",
        email:"default email"
      },
      services:{
        static_site:[]
      },
      other_info: {},
    },
  };
  
  const dataReducer = (state = initialState, action) => {
    switch (action.type) {
      case "SET_USER":
        return {...state };
      case "HOST_STATIC_SITE":
      return {...state };
     
      default:
  
      
        return state;
    }
  };
  
  export default dataReducer;