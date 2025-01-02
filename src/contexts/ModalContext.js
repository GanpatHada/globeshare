import { createContext, useReducer } from "react";
import { initialModalState, modalReducer } from "../reducers/ModalReducer";

export const ModalContext = createContext();
export function ModalProvider({ children }) {
  const [state, dispatch] = useReducer(modalReducer, initialModalState);

  return (
    <ModalContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}
