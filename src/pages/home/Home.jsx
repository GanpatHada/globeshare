import React, { useEffect } from "react";
import "./Home.css";
import LeftSideBar from "../../components/left-side-bar/LeftSideBar";
import RightSideBar from "../../components/right-side-bar/RightSideBar";
import BottomNavbar from "../../components/bottom-navbar/BottomNavbar";
import Profile from "../profile/Profile";
import SearchBox from "../../components/search-box/SearchBox";
import Feeds from "../feeds/Feeds";
import Suggestion from "../../components/suggestions/Suggestion";
import EditProfile from "../edit-profile/EditProfile";
import Followers from "../../components/followers/Followers";
import Comments from "../../components/comments/Comments";
import CreatePost from "../../components/create-post/CreatePost";
import { auth, db } from "../../assets/Firebase";
import Login from '../login/Login'
import { collection, getDocs } from "firebase/firestore";
import { Navigate, Route, Routes, useNavigate,useRouteMatch } from "react-router-dom";
import PageNotFound from "../../components/page-not-found/PageNotFound";
const FeedsList=()=><> <Feeds/>
<Suggestion/></>

const Home = () => {
  
  return (
     <div id="home-page">
       {/* <SearchBox/> */}
      <LeftSideBar />
      <main id="content">
        <div id="main-content">
          <Routes>
            <Route  path='/' element={<FeedsList/>}/>
            <Route  path='/:userId' element={<Profile/>}/>
            <Route  path='/:userId/likes' element={<Profile/>}/>
            <Route  path='/:userId/edit' element={<EditProfile/>}/>
            <Route  path='*' element={<Navigate to='404'/>}/>
          </Routes>
          {/* <Profile /> */}
          {/* <CreatePost/> */}
          {/* <EditProfile/> */}
          {/* <Followers/> */}
          {/* <Comments/> */}
        </div>
      </main>
      
    </div>
    
    
  );
};

export default Home;
