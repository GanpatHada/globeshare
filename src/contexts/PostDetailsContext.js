import { createContext, useReducer } from "react";
import {
  initialPostDetailsState,
  postDetailsReducer,
} from "../reducers/PostDetailsReducer";

export const PostDetailsContext = createContext();
export const PostDetailsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    postDetailsReducer,
    initialPostDetailsState
  );

  return (
    <PostDetailsContext.Provider value={{ state, dispatch }}>
      {children}
    </PostDetailsContext.Provider>
  );
};
