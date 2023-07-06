import React from "react";
import "./Home.css";
import LeftSideBar from "../../components/left-side-bar/LeftSideBar";
import RightSideBar from "../../components/right-side-bar/RightSideBar";
import BottomNavbar from "../../components/bottom-navbar/BottomNavbar";
import Profile from "../profile/Profile";
const Home = () => {
  return (
    <div id="home-page">
      <LeftSideBar />
      <main>
        <div id="main-content">
          <Profile />
        </div>
      </main>
      <RightSideBar />
      {/* <BottomNavbar/> */}
    </div>
  );
};

export default Home;
