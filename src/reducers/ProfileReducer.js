export const initialProfileState = {
  profile: null,
  postedPosts: [],
  likedPosts:[],
  savedPosts:[],
  loading: true,
  postsLoading:false
};
export function profileReducer(state, action) {
  switch (action.type) {
    case "SET_PROFILE":
      return {
        ...state,
        profile: action.payload,
      };
    case "SET_POSTS":
      return {
        ...state,
        [action.payload.type]: action.payload.value,
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
    case "START_POST_LOADING": {
      return {
        ...state,
        postLoading: true,
      };
    }
    case "STOP_POST_LOADING": {
      return {
        ...state,
        postLoading: false,
      };
    }
  }
}
