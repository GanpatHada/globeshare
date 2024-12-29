import React, { useContext } from "react";
import "./ProfileNav.css";
import { NavLink } from "react-router-dom";
const ProfileNav = () => {
  


  return (
    <nav id="profile-nav">
      <ul className="all-centered" id="profile-nav-container">
        <NavLink to={""} end>Posts</NavLink>
        <NavLink to={"bookmarks"}>Bookmarks</NavLink>
      </ul>
    </nav>
  );
};

export default ProfileNav;
