import React, { useContext, useEffect, useState } from "react";
import "./Profile.css";
import ProfileHeader from "./components/profile-header/ProfileHeader";
import ProfileNav from "./components/profile-nav/ProfileNav";
import MyPosts from "./components/my-posts/MyPosts";
import { UserContext } from "../../contexts/UserContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../assets/Firebase";
import { useParams } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import { useLocation } from "react-router-dom";
import MyLikes from "./components/my-likes/MyLikes";
import MyBookmarks from "./components/my-bookmarks/MyBookmarks";

const Profile = () => {
  const { userDetails } = useContext(UserContext);
  const [tab, setTab] = useState("POSTS");
  return (
    <div id="profile-page">
      <ProfileHeader user={userDetails} />
      <ProfileNav setTab={setTab} tab={tab} />
      <div id="profile-content">
        {tab === "POSTS" && <MyPosts />}
        {tab === "LIKES" && <MyLikes />}
        {tab === "BOOKMARKS" && <MyBookmarks />}
      </div>
    </div>
  );
};

export default Profile;
