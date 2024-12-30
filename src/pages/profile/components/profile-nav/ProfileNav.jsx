import React, { useContext } from "react";
import "./ProfileNav.css";
import { NavLink, useParams } from "react-router-dom";
import { useUser } from "../../../../hooks/useUser";
const ProfileNav = () => {
  const {user:{userId}}=useUser();
  const {userId:currentUser}=useParams()
  return (
    <nav id="profile-nav">
      <ul className="all-centered" id="profile-nav-container">
        <NavLink to={""} end>
          Posts
        </NavLink>
        {userId===currentUser&&<NavLink to={"bookmarks"}>Bookmarks</NavLink>}
      </ul>
    </nav>
  );
};

export default ProfileNav;
