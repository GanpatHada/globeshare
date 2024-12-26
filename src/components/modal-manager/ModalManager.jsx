import React from "react";
import './ModelManager.css'
const ModalManager = ({children,closeModal}) => {
  return (
    <div id="main-modal" className="all-centered">
      <div id="main-modal-content">
        {
          React.cloneElement(children,{closeModal})
        }
      </div>
    </div>
  );
};

export default ModalManager;
