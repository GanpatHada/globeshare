import { createContext, useReducer } from "react";
import { initialProfileState, profileReducer } from "../reducers/ProfileReducer";


export const ProfileContext = createContext();
export function ProfileProvider({ children }) {
  const [state, dispatch] = useReducer(profileReducer, initialProfileState);
  return (
    <ProfileContext.Provider value={{ state, dispatch }}>
      {children}
    </ProfileContext.Provider>
  );
}