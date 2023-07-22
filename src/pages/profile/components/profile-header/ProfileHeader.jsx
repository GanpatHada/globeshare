import React from "react";
import "./ProfileHeader.css";
import { useNavigate, useParams } from "react-router-dom";
const ProfileHeader = ({ user }) => {
  const navigate=useNavigate()
  const {userId}=useParams()
  const { bio, profilePhoto, userName, followers, following, website } = user;
  return (
    <header id="profile-header" className="all-centered">
      
      <div id="main-profile-image">
        <img
          src={
            profilePhoto
              ? profilePhoto
              : "https://w0.peakpx.com/wallpaper/979/876/HD-wallpaper-shahrukh-khan-actor-black-bollywood-csk-cute-jannat-king-love-movies-srk-thumbnail.jpg"
          }
          alt=""
        />
      </div>
      <div id="profile-bio">
        <div>
          <h2>{userName}</h2>
          <button onClick={()=>navigate(`/${userId}/edit`)}>Edit Profile</button>
          <button>Logout</button>
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
          <p>{bio} Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed possimus cupiditate soluta repellat perspiciatis ipsa</p>
          <h5>{website} <a href="https://ganpathada.vercel.app" target="_blank">{"https://ganpathada.vercel.app".replace('https://','')}</a> </h5>
        </section>
      </div>
    </header>
  );
};

export default ProfileHeader;
