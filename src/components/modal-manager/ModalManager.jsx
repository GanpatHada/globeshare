import React, { useEffect } from "react";
import "./ModelManager.css";
import { useModal } from "../../hooks/useModal";
const ModalManager = ({ children }) => {
  const { closeModal } = useModal();
  useEffect(() => {
    
    const updateHeight = () => {
      const vh = window.innerHeight*0.01; 
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    
    updateHeight();

    
    window.addEventListener('resize', updateHeight);

    
    return () => {
      window.removeEventListener('resize', updateHeight);
    };
  }, []);
  

  return (
    <div id="main-modal" className="all-centered" onClick={closeModal}>
      <div id="main-modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default ModalManager;
