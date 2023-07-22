import React, { useState } from "react";
import "./Modal.css";

import { BsChevronDown } from "react-icons/bs";
import Avatars from "../avatars/Avatars";
const Modal = () => {
  const [rotateArrow,setRotateArrow]=useState(false) ;
  const[selectedImage,setSelectedImage]=useState('https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=');
  return (
    <div className="fixed-centered" id="edit-profile-modal">
      <div className="all-centered">
        <div id="selected-image-box">
           <img src={selectedImage} alt=".." />
        </div>
      </div>
      <div>
        <button>Upload photo</button>
      </div>
      <div id='avatar-box' onClick={()=>{setRotateArrow(!rotateArrow)}}>
        <button >Add avatar</button>
        <span style={{transform:`rotate(${rotateArrow?'180':'0'}deg)`}} className="all-centered"><BsChevronDown/></span>
      </div>
      <div id='avatars' style={{height:rotateArrow?'270px':'0px'}}>
        <Avatars setSelectedImage={setSelectedImage} selectedImage={selectedImage}/>
      </div>
      <div>
        <button className="danger">Remove Current photo</button>
      </div>
      <div>
        <button className="danger">Cancel</button>
      </div>
    </div>
  );
};

export default Modal;
