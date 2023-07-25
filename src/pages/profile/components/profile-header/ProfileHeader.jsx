import React from "react";
import "./ProfileHeader.css";
import { useNavigate } from "react-router-dom";
import profile from "../../../../images/profile.png";
const ProfileHeader = ({ user }) => {
  const navigate = useNavigate();
  const { bio, profilePic, userName, followers, following, website } = user;
  return (
    <header id="profile-header" className="all-centered">
      <div id="main-profile-image">
        <img src={profilePic ?? profile} alt="" />
      </div>
      <div id="profile-bio"> 
        <div>
          <h2>{userName}</h2>
          <button className="secondary-btn" onClick={() => navigate("edit")}>
            Edit Profile
          </button>
          <button className="secondary-btn">Logout</button>
        </div>
        <div>
          <span>
            <strong>0</strong> posts
          </span>
          <span>
            <strong>{followers.length}</strong> followers
          </span>
          <span>
            <strong>{following.length}</strong> following
          </span>
        </div>
        <section>
          <p>
            {bio} 
          </p>
          <h5>
            <a href={website} target="_blank">{website}</a>
          </h5>
        </section>
        </div>
    </header>
  );
};

export default ProfileHeader;
