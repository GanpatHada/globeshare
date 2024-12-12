import React, { useContext, useRef } from 'react'
import useClickOutsideHandler from '../../hooks/useClickOutsideHandler'
import { ModalContext} from '../../contexts/ModalContext'
import {PostContext} from '../../contexts/PostContext'
import './EditMenu.css'
const EditMenu = ({currentPost,posts}) => { 
  const{deletePostFromServer}=useContext(PostContext)
  const{openEditPostModal,setCurrentPost,closeCommentsModal,closeEditMenu}=useContext(ModalContext)

  const handlePostDelete=(postId)=>{
    closeEditMenu()
    closeCommentsModal()
    deletePostFromServer(postId)

  }

  const handlePostEdit=(postId)=>{
    closeEditMenu()
    setCurrentPost(postId)
    openEditPostModal();
  }
  const editMenuRef=useRef(null)  
  useClickOutsideHandler(editMenuRef,closeEditMenu)  
  return (
    <div id='edit-menu' ref={editMenuRef}>
        <button onClick={()=>handlePostEdit(currentPost)}>Edit</button>
        <button onClick={()=>handlePostDelete(currentPost)}>Delete</button>
        <button onClick={()=>closeEditMenu()}>Cancel</button>
    </div>
  )
}

export default EditMenu