import React from "react";
import "./Home.css";
import LeftSideBar from "../../components/left-side-bar/LeftSideBar";
import RightSideBar from "../../components/right-side-bar/RightSideBar";
import BottomNavbar from "../../components/bottom-navbar/BottomNavbar";
import Profile from "../profile/Profile";
import SearchBox from "../../components/search-box/SearchBox";
import Feeds from "../feeds/Feeds";
const Home = () => {
  return (
    <div id="home-page">
      <SearchBox/>
      <LeftSideBar />
      <main id="home-page">
        <div id="main-content">
          {/* <Profile /> */}
          <Feeds/>
        </div>
      </main>
      <RightSideBar />
      <BottomNavbar/>
    </div>
  );
};

export default Home;
