import { createContext, useReducer} from "react";
import { initialModalState, modalReducer } from "../reducers/ModalReducer";

export const ModalContext = createContext();
export function ModalProvider({ children }) {
  const [state, dispatch] = useReducer(modalReducer, initialModalState);
  const openModal=(type)=>dispatch({type:'OPEN_MODAL',payload:type})
  const closeModal=()=>dispatch({type:'CLOSE_MODAL'})
  const{type:modalType,isOpen:isModalOpen}=state;

  return (
    <ModalContext.Provider
      value={{
        openModal,closeModal,isModalOpen,modalType
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}
