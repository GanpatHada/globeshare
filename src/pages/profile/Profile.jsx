import React, { useContext, useEffect, useState } from "react";
import "./Profile.css";
import ProfileHeader from "./components/profile-header/ProfileHeader";
import ProfileNav from "./components/profile-nav/ProfileNav";
import MyPosts, { myPosts } from "./components/my-posts/MyPosts";
import { UserContext } from "../../contexts/UserContext";
import MyLikes from "./components/my-likes/MyLikes";
import MyBookmarks from "./components/my-bookmarks/MyBookmarks";
import { PostContext } from "../../contexts/PostContext";
import { useLocation, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../assets/Firebase";
import { toast } from "react-toastify";
import Loader from "../../components/loader/Loader";

const Profile = ({ content }) => {
  const location=useLocation();
  const[loading,setLoading]=useState(false)
  const [tab, setTab] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const { userId } = useParams();
  const {user,userDetails}=useContext(UserContext)
  const fetchUserProfile = async () => {

    if(user.uid===userId)
       return setUserProfile({userId,...userDetails})
    try {
    setLoading(true);  
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
    finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    setTab(content);
  }, [content]);

  useEffect(() => {
    fetchUserProfile();
  },[location.pathname]);

  return (
    <div id="profile-page">
      {loading&&<Loader/>}
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
