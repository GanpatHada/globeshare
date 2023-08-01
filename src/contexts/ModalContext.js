import { createContext, useState } from "react";


export const ModalContext = createContext();
export function ModalProvider({ children }) {
  //states here
const[showCreatePostModal,setShwoCreatePostModal]=useState(false)
const[currentPost,setCurrentPost]=useState(null)


const[showProfileModal,setShowProfileModal]=useState(false)
const[showCommentsModal,setShowCommentsModal]=useState(false)


const openCreatePostModal=()=>setShwoCreatePostModal(true)
const closeCreatePostModal=()=>setShwoCreatePostModal(false)
  


const openProfileModal=()=>setShowProfileModal(true)
const closeProfileModal=()=>setShowProfileModal(false)


const openCommentsModal=()=>setShowCommentsModal(true)
const closeCommentsModal=()=>setShowCommentsModal(false)

return (
    <ModalContext.Provider
      value={{
        openCreatePostModal,closeCreatePostModal,showCreatePostModal,currentPost,setCurrentPost,
        showProfileModal,openProfileModal,closeProfileModal,
        showCommentsModal,openCommentsModal,closeCommentsModal  
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}