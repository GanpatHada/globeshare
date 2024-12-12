import React, { useContext, useEffect, useRef, useState } from "react";
import "./EditProfileModal.css";
import profile from "../../../../images/profile.png";
import { BsChevronDown } from "react-icons/bs";
import Avatars from "../avatars/Avatars";
import { UserContext } from "../../../../contexts/UserContext";

import { ModalContext } from "../../../../contexts/ModalContext";
import { getPreview } from "../../EditProfile";
const EditProfileModal = ({updateDetails,setUpdateDetails}) => {
  const [rotateArrow, setRotateArrow] = useState(false);
  const { userDetails } = useContext(UserContext);
  const { closeProfileModal } = useContext(ModalContext);
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    setUpdateDetails({...updateDetails,profilePhoto:file});
    closeProfileModal();

  };
  return (
    <div id="edit-profile-modal">
      <div className="all-centered">
        <div id="selected-image-box">
          <img src={getPreview(updateDetails)} alt=".." />
        </div>
      </div>
      <div>
        <button className="secondary-btn">
          <label htmlFor="upload-profile-photo">Upload photo</label>
        </button>
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          id="upload-profile-photo"
          onChange={handlePhotoUpload}
        />
      </div>
      <div
        id="avatar-box"
        onClick={() => {
          setRotateArrow(!rotateArrow);
        }}
      >
        <button className="secondary-btn">Add avatar</button>
        <span
          style={{ transform: `rotate(${rotateArrow ? "180" : "0"}deg)` }}
          className="all-centered"
        >
          <BsChevronDown />
        </span>
      </div>
      <div id="avatars" style={{ height: rotateArrow ? "270px" : "0px" }}>
        <Avatars
          updateDetails={updateDetails} setUpdateDetails={setUpdateDetails}
        />
      </div>
      {userDetails?.profilePhoto && (
        <div>
          <button className="danger">Remove Current photo</button>
        </div>
      )}
      <div>
        <button className="danger">Cancel</button>
      </div>
    </div>
  );
};

export default EditProfileModal;
