export const initialSignupFormState = {
  email: "",
  password: "",
  confirmPassword: "",
  showPassword: false,
  showConfirmPassword: false,
  loading: false,
  error: "",
};

export const signupFormReducer = (state, action) => {
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
        showPassword: !state.showPassword,
      };
    case "TOGGLE_SHOW_CONFIRM_PASSWORD":
      return {
        ...state,
        showConfirmPassword: !state.showConfirmPassword,
      };
    case "START_LOADING": {
      return {
        ...state,
        loading: true,
      };
    }
    case "STOP_LOADING": {
      return {
        ...state,
        loading: false,
      };
    }
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
