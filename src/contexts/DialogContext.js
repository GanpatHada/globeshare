import { createContext, useReducer } from "react";
import { initialDialogState, DialogReducer } from "../reducers/DialogReducer";

export const DialogContext = createContext();
export function DialogProvider({ children }) {
  const [state, dispatch] = useReducer(DialogReducer, initialDialogState);

  return (
    <DialogContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </DialogContext.Provider>
  );
}