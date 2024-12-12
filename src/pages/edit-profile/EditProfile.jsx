import React, { useContext, useEffect, useRef, useState } from "react";
import "./EditProfile.css";
import { UserContext } from "../../contexts/UserContext";
import profile from "../../images/profile.png";
import { ModalContext } from "../../contexts/ModalContext";
import EditProfileModal from "./components/modal/EditProfileModal";
import Modal from "../../components/modal/Modal";
import Loader from "../../components/loader/Loader";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../assets/Firebase";
import { doc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from 'uuid'
export const getPreview = (updateDetails) => {
  if (!updateDetails.profilePhoto) return profile;
  if (typeof updateDetails.profilePhoto === "object")
    return URL.createObjectURL(updateDetails.profilePhoto);
  return updateDetails.profilePhoto;
};

const EditProfile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { showProfileModal, openProfileModal, closeProfileModal } =
    useContext(ModalContext);
  const { userDetails, setUserDetails, user } = useContext(UserContext);
  const [updateDetails, setUpdateDetails] = useState({ ...userDetails });
  const bio = useRef(null);
  useEffect(() => {
    console.log(userDetails);
  }, [userDetails]);
  const handleBioChange = (e) => {
    bio.current.style.height = bio.current.scrollHeight + "px";
    onFieldChange("bio", e);
  };

  const onFieldChange = (field, e) => {
    setUpdateDetails({ ...updateDetails, [field]: e.target.value });
  };

  const isDetailsUpdated = () => {
    return JSON.stringify(userDetails) === JSON.stringify(updateDetails);
  };

  const handleUpdateProfile = async () => {
    const { profilePhoto } = updateDetails;
    try {
      setLoading(true);
      let image = profilePhoto;
      if (typeof image === "string") {
        const response = await fetch(profilePhoto);
        image = await response.blob();
      }

      const storageRef = ref(storage,uuid() );
      const snapshot = await uploadBytes(storageRef, image);
      const downloadUrl = await getDownloadURL(snapshot.ref);

      const userRef = doc(db, "users", user.uid);
      if (downloadUrl !== userDetails.profilePhoto) {
        await updateDoc(userRef, {
          profilePhoto: downloadUrl,
        });
      }
      if (updateDetails.bio !== userDetails.bio) {
        await updateDoc(userRef, {
          bio: updateDetails.bio,
        });
      }
      if (updateDetails.website !== userDetails.website) {
        await updateDoc(userRef, {
          website: updateDetails.website,
        });
      }
      if (updateDetails.userName !== userDetails.userName) {
        await updateDoc(userRef, {
          userName: updateDetails.userName,
        });
      }
      setUserDetails(updateDetails);
      setLoading(false);
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {showProfileModal && (
        <Modal onClose={closeProfileModal}>
          <EditProfileModal
            updateDetails={updateDetails}
            setUpdateDetails={setUpdateDetails}
          />
        </Modal>
      )}
      <div id="edit-profile" className="all-centered">
        <div id="edit-profile-box">
          {!loading ? (
            <>
              <h2>Edit Profile</h2>
              <div>
                <label htmlFor="profile-image" id="profile-image">
                  <img src={getPreview(updateDetails)} alt="" />
                </label>
                <div>
                  <strong>{userDetails?.userName}</strong>
                  <div>
                    <button id="profile-image-btn" onClick={openProfileModal}>
                      {updateDetails?.profilePhoto ? "Change" : "Add"} profile
                      photo
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor="name">
                  <strong>user name</strong>
                </label>
                <div>
                  <input
                    id="name"
                    value={updateDetails?.userName}
                    onChange={(e) => onFieldChange("userName", e)}
                    type="text"
                  />
                  <span>
                    username that to be displayed accross the globeshare enter
                    the first name followed by space and then last name
                  </span>
                </div>
              </div>
              <div>
                <label htmlFor="website">
                  <strong>Website</strong>
                </label>
                <div>
                  <input
                    type="text"
                    value={updateDetails?.website}
                    onChange={(e) => onFieldChange("website", e)}
                    id="website"
                  />
                  <span>
                    Enter the url of you personal website portfolio or any pages
                    that you want to showcase
                  </span>
                </div>
              </div>
              <div>
                <label htmlFor="bio">
                  <strong>Bio</strong>
                </label>
                <div>
                  <textarea
                    value={updateDetails?.bio}
                    id="bio"
                    ref={bio}
                    onChange={(e) => handleBioChange(e)}
                    style={{ minHeight: "80px" }}
                  ></textarea>
                  <span id="bio-counter">{updateDetails?.bio?.length}/150</span>
                  <span>
                    Enter the bio about your interests and profession the bio
                    should not be more than 150 words
                  </span>
                </div>
              </div>
              <button
                className="profile-btns primary-btn"
                id="upload-btn"
                disabled={isDetailsUpdated()}
                onClick={handleUpdateProfile}
              >
                Update
              </button>
              <button
                className="profile-btns secondary-btn"
                id="can-btn"
                onClick={() => navigate(-1)}
              >
                Cancel
              </button>
            </>
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </>
  );
};

export default EditProfile;
