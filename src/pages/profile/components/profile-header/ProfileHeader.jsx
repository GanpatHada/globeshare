import React, { useContext, useState } from "react";
import "./ProfileHeader.css";
import { useNavigate } from "react-router-dom";
import profile from "../../../../images/profile.png";
import { ModalContext } from "../../../../contexts/ModalContext";
import { PostContext } from "../../../../contexts/PostContext";
import { UserContext } from "../../../../contexts/UserContext";
import Followers from "../../../../components/followers/Followers";
import Modal from "../../../../components/modal/Modal";
const ProfileHeader = ({ userProfile }) => {
  const { posts } = useContext(PostContext);
  const { user, logOut } = useContext(UserContext);
  const navigate = useNavigate();
  const { bio, profilePhoto, userName, followers, following, website, userId } =userProfile;
  const { openFollowersModal, closeFollowersModal, showFollowersModal } = useContext(ModalContext);
  const postsCount = () => posts.filter((post) => post.user === userId).length;
  const [modalFor, setModalFor] = useState(null);

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
      <div id="main-profile-image">
        <img src={profilePhoto ?? profile} alt="" />
      </div>
      <div id="profile-bio">
        <div>
          <h2>{userName}</h2>
          {user.uid === userId && (
            <div id="main-buttons">
              <button
                className="secondary-btn"
                onClick={() => navigate("/profile/edit")}
              >
                Edit Profile
              </button>
              <button className="secondary-btn" onClick={logOut}>
                Logout
              </button>
            </div>
          )}
        </div>
        <div id="posts-info">
          <span><strong>{postsCount()}</strong> posts</span>
          <span>
            <button onClick={()=>handleFollowersClick('followers')}>
              <strong>{followers.length}</strong> followers
            </button>
          </span>
          <span>
            <button onClick={()=>handleFollowersClick('following')}>
              <strong>{following.length} </strong>following
            </button>
          </span>
        </div>
        <section>
          <p>{bio}</p>
          <h5>
            <a href={website} rel="noreferrer" target="_blank">
              {website?.replace(/^Https:\/\//i, "").replace(/\/$/, "")}
            </a>
          </h5>
        </section>
      </div>
    </header>
  );
};

export default ProfileHeader;
