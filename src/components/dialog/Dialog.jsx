import React from 'react'
import './Dialog.css'
import { useDialog } from '../../hooks/useDialog'
const Dialog = ({children}) => {
  const{closeDialog}=useDialog()
  return (
    <div id='dialog-wrapper' className='overlay all-centered' onClick={closeDialog}>
         <div id="dialog" onClick={e=>e.stopPropagation()}>
              {children}
         </div>
    </div>
  )
}

export default Dialog
