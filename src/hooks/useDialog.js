import { useContext } from "react"
import { DialogContext } from "../contexts/DialogContext"
import { close, open } from "../actions/DialogAction";


export const useDialog=()=>{
    const{state,dispatch}=useContext(DialogContext);
    const{isDialogOpen,dialogContentId,dialogContentType}=state;
    const openDialog=(ContentId,ContentType)=>open(dispatch,ContentId,ContentType);
    const closeDialog=()=>close(dispatch)
    return {isDialogOpen,openDialog,closeDialog,dialogContentId,dialogContentType}

}