import React, { useContext, useState } from "react";
import "./ProfileHeader.css";
import { useNavigate } from "react-router-dom";
import profile from "../../../../images/profile.png";
import { FaLink } from "react-icons/fa6";
import { usePosts } from "../../../../hooks/usePosts";
import { logout } from "../../../../services/LoginService";
import { useUser } from "../../../../hooks/useUser";
import { useDialog } from "../../../../hooks/useDialog";
const ProfileHeader = ({ userProfile }) => {
  const {posts}=usePosts()
  const {user}=useUser()
  const {openDialog}=useDialog()
  const navigate = useNavigate();
  const {
    userId,
    bio,
    profilePhoto,
    userName,
    fullName,
    followers,
    following,
    website,
  } = userProfile;
  const myPostsCount=()=>posts.filter(post=>post.user===userId).length;

  const showFollowing=()=>openDialog(null,'FOLLOWING')
  const showFollowers=()=>openDialog(null,'FOLLOWERS')
  
  return (
    <header id="profile-header">
      <section className="profile-image-section">
        <div className="profile-image">
          <img src={profilePhoto?profilePhoto.url:profile} alt="" />
        </div>
      </section>
      <section className="profile-bio-section">
        <div>
          <h3>{userName}</h3>
         {userId===user.userId && <><button className="secondary-btn" onClick={() => navigate("/profile/edit")}>
            Edit Profile
          </button>
          <button className="secondary-btn" onClick={logout}>
            Logout
          </button></>}
        </div>

        <div id="posts-info">
          <p>
            <strong>{myPostsCount()}</strong>Posts
          </p>
          <button  disabled={followers.length===0} onClick={showFollowers}>
            <strong>{followers.length}</strong>Followers
          </button>
          <button  disabled={following.length===0} onClick={showFollowing}>
            <strong>{following.length}</strong>Following
          </button>
        </div>
        <div id="profile-bio">
          <h4>{fullName}</h4>
          <p>{bio}</p>
          
          <p>
            {website && <a href={website} title={website} rel="noreferrer" target="_blank">
              <span>
                <FaLink />
              </span>
              website
            </a>}
          </p>
        </div>
      </section>
    </header>
  );
};

export default ProfileHeader;
