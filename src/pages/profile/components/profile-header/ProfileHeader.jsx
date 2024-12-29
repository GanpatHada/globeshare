import React, { useContext, useState } from "react";
import "./ProfileHeader.css";
import { useNavigate } from "react-router-dom";
import profile from "../../../../images/profile.png";
import { FaLink } from "react-icons/fa6";
import { ProfileContext } from "../../../../contexts/ProfileContext";
const ProfileHeader = ({ userProfile }) => {
  console.log(userProfile);
  const navigate = useNavigate();
  const {
    bio,
    profilePhoto,
    userName,
    fullName,
    followers,
    following,
    website,
  } = userProfile;
  const {
    state: { postedPosts },
  } = useContext(ProfileContext);

  
  return (
    <header id="profile-header">
      <section className="profile-image-section">
        <div className="profile-image">
          <img src={profilePhoto ?? profile} alt="" />
        </div>
      </section>
      <section className="profile-bio-section">
        <div>
          <h3>{userName}</h3>
          <button onClick={() => navigate("/profile/edit")}>
            Edit Profile
          </button>
          <button>Logout</button>
        </div>

        <div id="posts-info">
          <p>
            <strong>{postedPosts.length}</strong>Posts
          </p>
          <button >
            <strong>{followers.length}</strong>Followers
          </button>
          <button >
            <strong>{following.length}</strong>Following
          </button>
        </div>
        <div id="profile-bio">
          <h4>{fullName}</h4>
          <p>{bio}</p>
          <p>
            <a href={website} title={website} rel="noreferrer" target="_blank">
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
