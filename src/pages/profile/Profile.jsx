import React, { useContext, useEffect, useState } from "react";
import "./Profile.css";
import ProfileHeader from "./components/profile-header/ProfileHeader";
import ProfileNav from "./components/profile-nav/ProfileNav";
import MyPosts, { myPosts } from "./components/my-posts/MyPosts";
import { UserContext } from "../../contexts/UserContext";
import MyLikes from "./components/my-likes/MyLikes";
import MyBookmarks from "./components/my-bookmarks/MyBookmarks";
import { PostContext } from "../../contexts/PostContext";

const Profile = ({content}) => {
  const { userDetails,user } = useContext(UserContext);
  const {posts}=useContext(PostContext)
  const [tab, setTab] = useState(null);
  
  useEffect(()=>{
      setTab(content)
  },[content])

  return (
    <div id="profile-page">
      <ProfileHeader user={userDetails} postsCount={myPosts(posts,user).length} />
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
