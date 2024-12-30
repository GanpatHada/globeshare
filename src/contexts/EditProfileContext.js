import { createContext,useReducer } from "react";
import {
  editProfileReducer,
  initialEditProfileState,
} from "../reducers/EditProfileReducer";
import { useUser } from "../hooks/useUser";

export const EditProfileContext = createContext();
export function EditProfileProvider({ children }) {
  const {user}=useUser()
  const [state, dispatch] = useReducer(
    editProfileReducer,
    user,
    initialEditProfileState
  );
  return (
    <EditProfileContext.Provider value={{ state, dispatch }}>
      {children}
    </EditProfileContext.Provider>
  );
}
