import React, { useContext, useEffect, useState } from "react";
import "./Profile.css";
import ProfileHeader from "./components/profile-header/ProfileHeader";
import ProfileNav from "./components/profile-nav/ProfileNav";
import MyPosts, { myPosts } from "./components/my-posts/MyPosts";
import { UserContext } from "../../contexts/UserContext";
import MyLikes from "./components/my-likes/MyLikes";
import MyBookmarks from "./components/my-bookmarks/MyBookmarks";
import { PostContext } from "../../contexts/PostContext";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../assets/Firebase";
import { toast } from "react-toastify";

const Profile = ({ content }) => {
  const [tab, setTab] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const { userId } = useParams();
  const {user}=useContext(UserContext)
  const fetchUserProfile = async () => {
    try {
      const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setUserProfile({userId,...docSnap.data()})
    } else {
      console.log("No such document!");
    }
    } catch (error) {
      toast.error('Something went wrong')
    }
  };

  useEffect(() => {
    setTab(content);
  }, [content]);

  useEffect(() => {
    fetchUserProfile();
  },[]);

  return (
    <div id="profile-page">
      {userProfile&&<>
      <ProfileHeader
        userProfile={userProfile}
      />
      <ProfileNav userProfile={userProfile} setTab={setTab} tab={tab} />
      <div id="profile-content">
        {tab === "POSTS" && <MyPosts userProfile={userProfile} />}
        {tab === "LIKES" && <MyLikes />}
        {tab === "BOOKMARKS" && <MyBookmarks />}
      </div>
      </>}
    </div>
  );
};

export default Profile;
