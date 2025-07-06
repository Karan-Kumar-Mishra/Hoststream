const initialState = {
  ComponentData: {
    show_file_loader: false,
    nvgt_to_site: false,
    show_error: false,
    error_message: "none",
    nvgt_to_vm: false
  },
  UserInfo: {
    user: {
      id: "default id",
      name: "defaut name",
      email: "default email"
    },
    services: {
      static_site: [{ website_name: "test" }],
      vms: [{ website_name: "test vm" }]
    },
    other_info: {
      crsrpgif: { // current servicepage information
        id: null,
        URL: null,
        domain_name: null,
        site_name: null,
        Date: null
      },
      crvmsrpgif: {
        vm_url: null,
        vm_id: null,
        vm_name: null,
        vm_username: null,
        vm_password: null,
        vm_state: 'off'
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
      state.UserInfo.services.static_site = action.payload.URL;
      return state;
    case "SET_CRSRPGIF":
      return state;
    case "SET_CRVMPGIF":
      return state;
    case "DELETE_SITE":
      return state;
    case "SETUP_FOLDER":
      return state;
    case "SHOW_LOADER":
      state.ComponentData.show_file_loader = action.payload;
      return { ...state };
    case "NVGT_TO_SITE":
      state.ComponentData.nvgt_to_site = action.payload;
      return { ...state };
    case "SET_ERROR":
      state.ComponentData.show_error = action.payload.show;
      state.ComponentData.error_message = action.payload.msg;
      return { ...state };
    case "CREATE_VM":
      state.UserInfo.services.vms.push = action.payload;
      return { ...state };
    case "GET_VMS":
      state.UserInfo.services.vms = action.payload;
      return { ...state };
    case "NVGT_TO_VM":
      state.ComponentData.nvgt_to_vm = action.payload;
      return { ...state };
    case "DELETE_VM":
      return state;
    case "STOP_VM":
      state.UserInfo.other_info.crvmsrpgif.vm_state="off"; 
        console.log("compelete for stop ")
      return state;
    case "START_VM":
      state.UserInfo.other_info.crvmsrpgif.vm_state="on"; 
      return state;

    default:
      return state;
  }
};

export default dataReducer;