import React from "react";
import "./ProfileHeader.css";
const ProfileHeader = () => {
  return (
    <header id="profile-header" className="all-centered">
      <div id="main-profile-image">
        <img src="https://w0.peakpx.com/wallpaper/979/876/HD-wallpaper-shahrukh-khan-actor-black-bollywood-csk-cute-jannat-king-love-movies-srk-thumbnail.jpg" alt="" />
      </div>
      <div id="profile-bio">
        <div>
          <h3>user_name</h3>
          <button>Edit Profile</button>
          <button>Logout</button>
        </div>
        <div>
          <span>posts</span>
          <span>followers</span>
          <span>following</span>
        </div>

        <section>
          <h3>Name</h3>
          <h4>About</h4>
          <h5>website</h5>
        </section>
      </div>
    </header>
  );
};

export default ProfileHeader;
