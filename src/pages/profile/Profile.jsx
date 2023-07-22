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
const Profile = () => {
  const{userDetails,setUserDetails}=useContext(UserContext)
  const{userId}=useParams()
  const fetchUserDetails = async () => {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setUserDetails(docSnap.data());
      console.log(docSnap.data())

    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  };
  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <div id="profile-page">
     {userDetails?<>
      <ProfileHeader user={userDetails} />
      <ProfileNav />
      <Posts />
      </>:<Loader/>}
    </div>
  );
};

export default Profile;
