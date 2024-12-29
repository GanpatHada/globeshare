export const initialUser = {
  user: null,
  userDetails: null,
  loading: true,
  userDetailsLoading: true,
};

export function userReducer(state, action) {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "SET_USER_DETAILS":
      return {
        ...state,
        userDetails: action.payload,
      };
    case "START_LOADING": {
      return {
        ...state,
        loading: true,
      };
    }
    case "ADD_FOLLOWING":
      return {
        ...state,
        userDetails: {
          ...state.userDetails,
          following: [...state.userDetails.following, action.payload],
        },
      };
    case "STOP_LOADING": {
      return {
        ...state,
        loading: false,
      };
    }
    case "START_USER_DETAILS_LOADING": {
      return {
        ...state,
        userDetailsLoading: true,
      };
    }
    case "STOP_USER_DETAILS_LOADING": {
      return {
        ...state,
        userDetailsLoading: false,
      };
    }
    case "REMOVE_USER":
      return {
        ...initialUser,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}
