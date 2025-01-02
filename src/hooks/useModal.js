import { useContext } from "react"
import { ModalContext } from "../contexts/ModalContext"
import { close, open } from "../actions/ModalAction";


export const useModal=()=>{
    const{state,dispatch}=useContext(ModalContext);
    const{isModalOpen,modalContentId,modalContentType}=state;
    const openModal=(ContentId,ContentType)=>open(dispatch,ContentId,ContentType);
    const closeModal=()=>close(dispatch)
    return {isModalOpen,openModal,closeModal,modalContentId,modalContentType}

}