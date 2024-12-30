import React, { useContext, useEffect, useReducer, useRef } from "react";
import "./EditProfile.css";
import Waiting from "../../components/waiting/Waiting";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../../images/loading2.gif";
import { isUserNameAvialable, saveProfilePhoto, updateProfile } from "../../services/UserService";
import { ModalContext } from "../../contexts/ModalContext";
import ModalManager from "../../components/modal-manager/ModalManager";
import SelectProfilePhotoModal from "./components/select-profile-photo-modal/SelectProfilePhotoModal";
import { EditProfileContext } from "../../contexts/EditProfileContext";
import { isProfilePhotoChnaged } from "../../utils/EditProfileHelper";
import defaultProfile from '../../images/profile.png'
import { useUser } from "../../hooks/useUser";
const SelectProfilePhotoModalWrapper = () => {
  const { isModalOpen, closeModal, modalType } = useContext(ModalContext);
  return (
    <React.Fragment>
      {isModalOpen && modalType === "SELECT_PROFILE_PHOTO" && (
        <ModalManager closeModal={closeModal} >
          <SelectProfilePhotoModal closeModal={closeModal}  />
        </ModalManager>
      )}
    </React.Fragment>
  );
};

const EditProfile = () => {
  const navigate = useNavigate();
  const {user,saveUser}=useUser()
  const { openModal } = useContext(ModalContext);
  const {state,dispatch} = useContext(EditProfileContext)

  const timeOut = useRef(null);
  const { profilePhoto, userName, fullName, isPrivate, bio, website } =
    state.updatedProfile;
  const { loading, userNameFetching, userNameInfo } = state;

  const openSelectProfilePhotoModal = () => {
    openModal("SELECT_PROFILE_PHOTO");
  };

  const handleUpdate = async () => {
    {
      try {
        dispatch({ type: "START_LOADING" });
        let updatedProfile=state.updatedProfile
        if(isProfilePhotoChnaged(user.profilePhoto,profilePhoto))
        {
            if(updatedProfile.profilePhoto?.type==='DEVICE')
            {
              let savedProfilePhotoUrl=await saveProfilePhoto(updatedProfile.profilePhoto.url)
              updatedProfile={...updatedProfile,profilePhoto:{...updatedProfile.profilePhoto,url:savedProfilePhotoUrl}}
            }
        }
        const updatedData = await updateProfile(
          user.userId,
          updatedProfile
        );
        saveUser(updatedData);
        toast.success("Profile edited successfully");
      } catch (error) {
        toast.error("unable to update at the moment");
        console.log(error);
      } finally {
        dispatch({ type: "STOP_LOADING" });
      }
    }
    
  };

  const handleFieldChange = ({ target: { name, value } }) => {
    if (name === "isPrivate")
      return dispatch({
        type: "SET_FIELD",
        payload: { field: name, value: !isPrivate },
      });

    return dispatch({ type: "SET_FIELD", payload: { field: name, value } });
  };

  const handleUserNameAvailability = ({ target: { value } }) => {
    timeOut.current = setTimeout(async () => {
      try {
        dispatch({ type: "START_USERNAME_FETCHING" });
        const userNameAvailable = await isUserNameAvialable(
          value,
          user.userName
        );
        if (userNameAvailable)
          return dispatch({
            type: "SET_USERNAME_INFO",
            payload: { type: "SUCCESS", infoText: "UserName is available" },
          });
        return dispatch({
          type: "SET_USERNAME_INFO",
          payload: { type: "ERROR", infoText: "Username is not available" },
        });
      } catch (error) {
        toast.error("Something went wrong while fetching username");
      } finally {
        dispatch({ type: "STOP_USERNAME_FETCHING" });
      }
    }, 500);
  };

  const handleUserName = (e) => {
    handleFieldChange(e);
    if (timeOut.current) clearTimeout(timeOut.current);
    handleUserNameAvailability(e);
  };

  const handleKeyDown = (event) => {
    if (event.key === " ") {
      toast.warning("Whitespace is not allowed");
      event.preventDefault();
    }
  };

  const getUserNameInfo = () => {
    if (userName.trim().length === 0)
      return <p className="error-username">Username cannot be empty</p>;
    if (userName.trim() === user.userName)
      return <p className="success-username">Your current Username</p>;
    if (userNameFetching) return <p>checking availability ...</p>;
    if (userNameInfo.type === "ERROR")
      return <p className="error-username">{userNameInfo.infoText}</p>;
    return <p className="success-username">{userNameInfo.infoText}</p>;
  };

  const getPreviewOfProfilePhoto=()=>{
    if(!profilePhoto)
      return defaultProfile;
    if(typeof profilePhoto.url==='object')
      return URL.createObjectURL(profilePhoto.url)
    return profilePhoto.url
  }

  return (
    <div id="edit-profile-page" className="app-pages">
      <SelectProfilePhotoModalWrapper />
      <main id="edit-profile-page-content">
        {loading ? (
          <Waiting />
        ) : (
          <>
            <h1>Edit Profile</h1>
            <section className="profile-image-section">
              <div className="profile-image">
                <img src={getPreviewOfProfilePhoto()} alt="" />
              </div>
              <button
                className="primary-btn"
                onClick={openSelectProfilePhotoModal}
              >
                Change Photo
              </button>
            </section>
            <section className="profile-username">
              <label htmlFor="user-name">Username</label>
              {userNameFetching && (
                <div id="username-loader">
                  <img src={Loading} alt="" />
                </div>
              )}
              <input
                type="text"
                placeholder="Username "
                id="user-name"
                value={userName}
                maxLength={50}
                name="userName"
                onChange={(e) => handleUserName(e)}
                onKeyDown={handleKeyDown}
              />
              {getUserNameInfo()}
            </section>
            <section className="profile-name">
              <label htmlFor="full-name">Full Name</label>
              <input
                type="text"
                id="full-name"
                value={fullName}
                name="fullName"
                onChange={handleFieldChange}
                placeholder="Enter full name"
              />
            </section>
            <section className="profile-bio">
              <label htmlFor="bio">Bio</label>
              <span>{bio.length}/150</span>
              <textarea
                id="bio"
                value={bio}
                name="bio"
                onChange={handleFieldChange}
                rows={1}
              ></textarea>
              <p>Bio must not be more than 150 characters</p>
            </section>
            <section className="profile-website">
              <label htmlFor="website">Your Personal website</label>
              <input
                type="text"
                value={website}
                name="website"
                id="website"
                placeholder="Your Website link"
                onChange={handleFieldChange}
              />
            </section>
            <section className="private-account-box">
              <div className="private-account-info">
                <h4>Private Account</h4>
                <p>only your followers will be able to see your Posts</p>
              </div>
              <input
                type="checkbox"
                checked={isPrivate}
                name="isPrivate"
                onChange={handleFieldChange}
              />
            </section>
            <section className="button-section">
              <button
                disabled={userName.trim().length === 0}
                id="update-profile-button"
                className="primary-btn"
                onClick={handleUpdate}
              >
                Update Profile
              </button>
              <button className="secondary-button" id='profile-update-cancel-button' onClick={()=>navigate(-1)}>Cancel</button>
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default EditProfile;
