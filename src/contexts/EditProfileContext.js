import { createContext, useContext, useReducer } from "react";
import {
  editProfileReducer,
  initialEditProfileState,
} from "../reducers/EditProfileReducer";
import { UserContext } from "./UserContext";

export const EditProfileContext = createContext();
export function EditProfileProvider({ children }) {
  const {
    state: { userDetails },
  } = useContext(UserContext);
  const [state, dispatch] = useReducer(
    editProfileReducer,
    userDetails,
    initialEditProfileState
  );
  return (
    <EditProfileContext.Provider value={{ state, dispatch }}>
      {children}
    </EditProfileContext.Provider>
  );
}
