export const initialProfileState = {
  profile: null,
  loading: true,
};
export function profileReducer(state, action) {
  switch (action.type) {
    case "SET_PROFILE":
      return {
        ...state,
        profile: action.payload,
      };
    case "START_LOADING": 
      return {
        ...state,
        loading: true,
      };
    
    case "STOP_LOADING": 
      return {
        ...state,
        loading: false,
      };
      default : return state
    
    
  }
}
