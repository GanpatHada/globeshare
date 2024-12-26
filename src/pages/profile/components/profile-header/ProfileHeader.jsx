import React, { useContext, useState } from "react";
import "./ProfileHeader.css";
import { useNavigate } from "react-router-dom";
import profile from "../../../../images/profile.png";
import { ModalContext } from "../../../../contexts/ModalContext";
import Followers from "../../../../components/followers/Followers";
import Modal from "../../../../components/modal/Modal";
import { FaLink } from "react-icons/fa6";
import { ProfileContext } from "../../../../contexts/ProfileContext";
const ProfileHeader = ({ userProfile }) => {
  console.log(userProfile);
  const navigate = useNavigate();
  const { bio, profilePhoto, userName,fullName, followers, following, website,} =
    userProfile;
  const { openFollowersModal, closeFollowersModal, showFollowersModal } =
    useContext(ModalContext);
  const [modalFor, setModalFor] = useState(null);
  const {state:{postedPosts},dispatch}=useContext(ProfileContext)

  const handleFollowersClick = (modalFor) => {
    setModalFor(modalFor);
    openFollowersModal();
  };
  return (
    <header id="profile-header">
      {showFollowersModal && (
        <Modal onClose={closeFollowersModal}>
          <Followers modalFor={modalFor} userProfile={userProfile} />
        </Modal>
      )}
      <section className="profile-image-section">
        <div className="profile-image">
          <img src={profilePhoto ?? profile} alt="" />
        </div>
      </section>
      <section className="profile-bio-section">
        <div>
          <h3>{userName}</h3>
          <button onClick={()=>navigate("/profile/edit")}>Edit Profile</button>
          <button>Logout</button>
        </div>

        <div id="posts-info">
          <p><strong>{postedPosts.length}</strong>Posts</p>
          <button onClick={() => handleFollowersClick("followers")}>
            <strong>{followers.length}</strong>Followers
          </button>
          <button onClick={() => handleFollowersClick("following")}>
            <strong>{following.length}</strong>Following
          </button>
        </div>
        <div id="profile-bio">
          <h4>{fullName}</h4>
          <p>{bio}</p>
          <p>
            <a
              href={website}
              title={website}
              rel="noreferrer"
              target="_blank"
            >
              <span>
                <FaLink />
              </span>
              {website?.replace(/^Https:\/\//i, "").replace(/\/$/, "")}
            </a>
          </p>
        </div>
      </section>
    </header>
  );
};

export default ProfileHeader;
