import React, { useContext, useEffect, useState } from "react";
import "./Profile.css";
import ProfileHeader from "./components/profile-header/ProfileHeader";
import ProfileNav from "./components/profile-nav/ProfileNav";
import Posts from "./components/posts/Posts";
import { UserContext } from "../../contexts/UserContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../assets/Firebase";
import { useParams } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import { useLocation } from 'react-router-dom';



const Profile = () => {
  const{userDetails}=useContext(UserContext)

  return (
    <div id="profile-page">
     
      <ProfileHeader user={userDetails} />
      <ProfileNav />
      <Posts />
    </div>
  );
};

export default Profile;
