import React, { useContext, useState } from "react";
import "./ProfileHeader.css";
import { useNavigate } from "react-router-dom";
import profile from "../../../../images/profile.png";
import { ModalContext } from "../../../../contexts/ModalContext";
import { PostContext } from "../../../../contexts/PostContext";
import { UserContext } from "../../../../contexts/UserContext";
import Followers from "../../../../components/followers/Followers";
import Modal from "../../../../components/modal/Modal";
import { FaLink } from "react-icons/fa6";
const ProfileHeader = ({ userProfile }) => {
  console.log(userProfile);
  const navigate = useNavigate();
  const { bio, profilePhoto, userName, followers, following, website, userId } =
    userProfile;
  const { openFollowersModal, closeFollowersModal, showFollowersModal } =
    useContext(ModalContext);
  // const postsCount = () => posts.filter((post) => post.user === userId).length;
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
      <section className="profile-image-section">
        <div className="profile-image">
          <img src={profilePhoto ?? profile} alt="" />
        </div>
      </section>
      <section className="profile-bio-section">
        <div>
          <h3>{"username@rtj" || "unknown"}</h3>
          <button onClick={()=>navigate("/profile/edit")}>Edit Profile</button>
          <button>Logout</button>
        </div>

        <div id="posts-info">
          <p><strong>{"2"}</strong>Posts</p>
          <button onClick={() => handleFollowersClick("followers")}>
            <strong>{followers.length}</strong>Followers
          </button>
          <button onClick={() => handleFollowersClick("following")}>
            <strong>{following.length}</strong>Following
          </button>
        </div>
        <div id="profile-bio">
          <h4>Ganpat Hada</h4>
          <p>{bio}</p>
          <p>
            <a
              href={website}
              title="https://localhost:500"
              rel="noreferrer"
              target="_blank"
            >
              <span>
                <FaLink />
              </span>
              this is website
              {/* {website?.replace(/^Https:\/\//i, "").replace(/\/$/, "")} */}
            </a>
          </p>
        </div>
      </section>
    </header>
  );
};

export default ProfileHeader;
