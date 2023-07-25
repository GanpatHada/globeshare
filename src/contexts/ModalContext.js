import { createContext, useState } from "react";


export const ModalContext = createContext();
export function ModalProvider({ children }) {
  //states here
const[showCreatePostModal,setShwoCreatePostModal]=useState(false)
const[showProfileModal,setShowProfileModal]=useState(false)


const openCreatePostModal=()=>setShwoCreatePostModal(true)
const closeCreatePostModal=()=>setShwoCreatePostModal(false)


const openProfileModal=()=>setShowProfileModal(true)
const closeProfileModal=()=>setShowProfileModal(false)


return (
    <ModalContext.Provider
      value={{
        openCreatePostModal,closeCreatePostModal,showCreatePostModal,
        showProfileModal,openProfileModal,closeProfileModal
         
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}