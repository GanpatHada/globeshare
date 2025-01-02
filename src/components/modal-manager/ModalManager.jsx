import React from "react";
import "./ModelManager.css";
import { useModal } from "../../hooks/useModal";
const ModalManager = ({ children }) => {
  const{closeModal}=useModal()
  return (
    <div id="main-modal" className="all-centered" onClick={closeModal}>
      <div id="main-modal-content" onClick={e=>e.stopPropagation()}>{children}</div>
    </div>
  );
};

export default ModalManager;
