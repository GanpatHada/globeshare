import { createContext, useReducer } from "react";
import { initialUser, userReducer } from "../reducers/UserReducer";

export const UserContext = createContext();
export function UserProvider({ children }) {
  const [state, dispatch] = useReducer(userReducer, initialUser);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
}

