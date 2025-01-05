import React, { useContext, useRef, useState } from "react";
import "./SelectProfilePhotoModal.css";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import Avatars from "../avatars/Avatars";
import { EditProfileContext } from "../../../../contexts/EditProfileContext";
import useClickOutsideHandler from "../../../../hooks/useClickOutsideHandler";

const SelectProfilePhotoModal = () => {
  const { state, dispatch } = useContext(EditProfileContext);
  const [expandAvatarBox, setExpandAvatarBox] = useState(false);
  const inputProfileRef = useRef();
  const modalRef = useRef();


  const onClose=()=>dispatch({type:"CLOSE_SELECT_PHOTO_MODAL"})

  useClickOutsideHandler(modalRef,onClose)

  const {
    updatedProfile: { profilePhoto },
  } = state;

  const handleProfilePhotInput = (event) => {
    const file = event.target.files[0];
    dispatch({
      type: "SET_FIELD",
      payload: { field: "profilePhoto", value: { type: "DEVICE", url: file } },
    });
    setTimeout(() => {
      onClose();
    }, 200);
  };

  const removeCurrentProfilePhoto = () => {
    dispatch({
      type: "SET_FIELD",
      payload: { field: "profilePhoto", value: null },
    });
    onClose();
  };

  return (
    <div className="overlay all-centered" id="select-profile-photo-modal-wrapper">
      <div id="select-profile-photo-modal" ref={modalRef}>
        <section>
          <button onClick={() => inputProfileRef.current.click()}>
            <span>Upload from device</span>
          </button>
          <input
            ref={inputProfileRef}
            type="file"
            id="choose-from-device"
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleProfilePhotInput}
          />
        </section>
        <section>
          <button onClick={() => setExpandAvatarBox(!expandAvatarBox)}>
            <span>Choose Avatar</span>
            <span
              className="up-down-arrow all-centered"
              style={{
                transform: `${
                  expandAvatarBox ? "rotate(180deg)" : "rotate(0deg)"
                }`,
              }}
            >
              <MdOutlineKeyboardArrowDown />
            </span>
          </button>
          <div
            id="choose-avatar-box"
            style={{ height: `${expandAvatarBox ? "270px" : "0px"}` }}
          >
            <Avatars closeModal={onClose} />
          </div>
        </section>
        {profilePhoto && (
          <section>
            <button
              id="remove-profile-photo-button"
              onClick={removeCurrentProfilePhoto}
            >
              Remove Current Photo
            </button>
          </section>
        )}
        <section>
          <button id="profile-photo-cancel-button" onClick={onClose}>
            Cancel
          </button>
        </section>
      </div>
    </div>
  );
};

export default SelectProfilePhotoModal;
