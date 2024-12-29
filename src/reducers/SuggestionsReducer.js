export const initialSuggestionsState = {
  suggestedUsers: [],
  loading: true,
};

export function suggestionsReducer(state, action) {
  switch (action.type) {
    case "SET_SUGGESTED_USERS":
      return {
        ...state,
        suggestedUsers: action.payload,
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
  }
}
