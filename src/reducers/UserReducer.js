import {
  addToBookmarkHandler,
  followUserHandler,
  removeFollowerHandler,
  removeFromBookmarkHandler,
  unfollowUserHandler,
} from "../utils/UserHelper";

export const initialUser = {
  user: null,
  loading: true,
};

export function userReducer(state, action) {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "ADD_FOLLOWING":
      return {
        ...state,
        userDetails: {
          ...state.userDetails,
          following: [...state.userDetails.following, action.payload],
        },
      };
    case "ADD_TO_BOOKMARK":
      return {
        ...state,
        user: addToBookmarkHandler(state.user, action.payload),
      };
    case "REMOVE_FROM_BOOKMARK":
      return {
        ...state,
        user: removeFromBookmarkHandler(state.user, action.payload),
      };
    case "FOLLOW_USER" : return {
      ...state,user:followUserHandler(state.user,action.payload)
    } ;
    case "UNFOLLOW_USER" : return {
      ...state,user:unfollowUserHandler(state.user,action.payload)
    }
    case "REMOVE_FOLLOWER":return {
      ...state,user:removeFollowerHandler(state.user,action.payload)
    } 
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
    case "REMOVE_USER":
      return {
        ...state,user:null,loading:false
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}
