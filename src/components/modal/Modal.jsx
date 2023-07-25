import React, { useEffect, useRef, useState } from 'react'
import './Modal.css'
import useClickOutsideHandler from '../../hooks/useClickOutsideHandler'
const Modal = ({children,onClose}) => {
  const modalRef=useRef(null)
  useClickOutsideHandler(modalRef,onClose) 
  return (
    <div id='backdrop' className='all-centered'>
        <div id="modal" ref={modalRef}>
         {children}
        </div>
    </div>
  )
}

export default Modal