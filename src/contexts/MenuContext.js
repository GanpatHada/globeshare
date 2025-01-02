import { createContext, useReducer } from "react";
import { initialMenuState, menuReducer } from "../reducers/MenuReducer";

export const MenuContext = createContext();
export const MenuProvider = ({ children }) => {
  const [state, dispatch] = useReducer(menuReducer,initialMenuState);
  return (
    <MenuContext.Provider value={{ state, dispatch }}>
      {children}
    </MenuContext.Provider>
  );
};
