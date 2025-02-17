import React, { useReducer, useRef } from "react";
import "./UploadImage.css";
import { CiImageOn } from "react-icons/ci";

const UploadImage = ({state,dispatch}) => {
  const fileRef=useRef(null)
  const{images}=state;
  const  handleSelectedImages=(e)=>{
       const file=fileRef.current.files[0];
       dispatch({type:'SET_IMAGES',payload:file})

  }
  return (
    <section id="upload-image" className="all-centered">
      <div id="upload-image-content" className="all-centered">
        <span id="upload-image-placeholder">
          <CiImageOn />
        </span>
        {images.length<=2 && <label
          id="upload-from-device"
          htmlFor="upload-photo"
          className="primary-btn"
        >
          Upload image from device
        </label>}
        <input
          type="file"
          accept="image/*"
          multiple={false}
          style={{ display: "none" }}
          id="upload-photo"
          onChange={handleSelectedImages}
          ref={fileRef}
        />
        {/* <button id="enter-url">Enter URL</button> */}    
      </div>
    </section>
  );
};

export default UploadImage;
