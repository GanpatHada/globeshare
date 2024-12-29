import { createContext, useReducer} from "react";
import { initialPostsState, postsReducer } from "../reducers/PostsReducer";

export const PostsContext = createContext();

export const PostsProvider = ({ children }) => {
  const[state,dispatch]=useReducer(postsReducer,initialPostsState)
  return <PostsContext.Provider value={{state,dispatch}}>{children}</PostsContext.Provider>;
};
