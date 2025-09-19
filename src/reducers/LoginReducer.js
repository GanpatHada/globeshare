export const initialLoginFormState = {
    email: "",
    password: "",
    loading:false,
    showPassword:false,
    error:""
};

export const loginFormReducer = (state, action) => {
    switch (action.type) {
      case "SET_FIELD":
        return {
          ...state,
          [action.payload.field]: action.payload.value,
        };
      case "SET_ERROR":
        return {
          ...state,
          error: action.payload,
        };
      case "TOGGLE_SHOW_PASSWORD":
        return {
            ...state,
            showPassword:!state.showPassword
        };
      case "START_LOADING":
        return {
            ...state,loading:true
        }  
      
      case "STOP_LOADING":
        return {
            ...state,loading:false
        }  
      
      default:
        throw new Error(`Unhandled action type: ${action.type}`);
    }
  };
