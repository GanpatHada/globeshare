import React from "react";
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

const FeedsList=()=><> <Feeds/>
<Suggestion/></>

const Home = () => {
  return (
    <div id="home-page">
       <SearchBox/>
      <LeftSideBar />
      <main id="content">
        <div id="main-content">
          {/* <Profile /> */}
          {/* <FeedsList/> */}
          <EditProfile/>
          <Followers/>
        </div>
      </main>
      
    </div>
  );
};

export default Home;
