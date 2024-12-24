import React from "react";
import './ModelManager.css'
import CreatePost from "../create-post/CreatePost";
const ModalManager = ({type,closePopup}) => {
  return (
    <div id="main-modal" className="all-centered">
      <div id="main-modal-content">
        <CreatePost mode="CREATE" closePopup={closePopup}/>
      </div>
    </div>
  );
};

export default ModalManager;
