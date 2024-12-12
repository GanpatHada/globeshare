import React, {useRef} from 'react'
import './Modal.css'
const Modal = ({children,onClose}) => {
  
  // useClickOutsideHandler(modalRef,onClose) 
  const handleOutsideClick=(e)=>{
    if(onClose)
    onClose()
  }

  return (
    <div id='backdrop' className='all-centered' onClick={handleOutsideClick}>
        <div id="modal" onClick={e=>e.stopPropagation()}>
         {children}
        </div>
    </div>
  )
}

export default Modal