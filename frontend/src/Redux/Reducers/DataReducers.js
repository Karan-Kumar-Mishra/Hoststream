const initialState = {
    ComponentData: {
     
    },
    UserInfo: {
      name: "Username",
      email: "Email",
      services:{
        static_site:[]
      },
      other_info: {},
    },
  };
  
  const dataReducer = (state = initialState, action) => {
    switch (action.type) {
  
      
 
      case "HOST_STATIC_SITE":
      return {...state };
     
      default:
  
      
        return state;
    }
  };
  
  export default dataReducer;