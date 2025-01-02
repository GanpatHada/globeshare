import { useContext } from "react"
import { MenuContext } from "../contexts/MenuContext"
import { closeMenuAction, openMenuAction } from "../actions/MenuAction";


export const useMenu=()=>{
    const{state,dispatch}=useContext(MenuContext);
    const{menuContentId,menuContentType,isMenuOpen}=state;

    const openMenu=(menuContentId,menuContentType)=>{
        openMenuAction(dispatch,{menuContentId,menuContentType});
    }
    const closeMenu=()=>closeMenuAction(dispatch);

    return {isMenuOpen,menuContentId,menuContentType,openMenu,closeMenu}
}