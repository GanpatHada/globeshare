import React, { useContext, useEffect } from "react";
import "./Home.css";
import LeftSideBar from "../../components/left-side-bar/LeftSideBar";

import Profile from "../profile/Profile";

import Feeds from "../feeds/Feeds";
import Suggestion from "../../components/suggestions/Suggestion";
import EditProfile from "../edit-profile/EditProfile";

import CreatePost from "../../components/create-post/CreatePost";
import { db } from "../../assets/Firebase";
import {doc, getDoc,} from "firebase/firestore";
import { Route, Routes,} from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import Loader from "../../components/loader/Loader";
import { ModalContext } from "../../contexts/ModalContext";
import Modal from "../../components/modal/Modal";
const FeedsList=()=><> <Feeds/>
<Suggestion/></>

const Home = () => {
  const{showCreatePostModal}=useContext(ModalContext)
  const{userDetails,setUserDetails,user}=useContext(UserContext)  
  console.log(user)

  const fetchCurrentUserDetails=async()=>{
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setUserDetails(docSnap.data())

    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  }
  useEffect(()=>{
    if(user.uid)
       fetchCurrentUserDetails();
  },[user])
  return (
     <div id="home-page">
      {user.uid?<>
      {showCreatePostModal&&<Modal>
           <CreatePost/>
        </Modal>} 
      <LeftSideBar />
      <main id="content">
        <div id="main-content">
          <Routes>
            <Route  path='/' element={<FeedsList/>}/>
            <Route  path='/profile' element={<Profile/>}/>
            <Route  path='/profile/likes' element={<Profile/>}/>
            <Route  path='profile/edit' element={<EditProfile/>}/>
            {/* <Route  path='*' element={<Navigate to='404'/>}/> */}
          </Routes>
          {/* <Profile /> */}
          {/* <CreatePost/> */}
          {/* <EditProfile/> */}
          {/* <Followers/> */}
          {/* <Comments/> */}
        </div>
      </main>
       </>:<Loader/>} 
    </div>
    
    
  );
};

export default Home;
