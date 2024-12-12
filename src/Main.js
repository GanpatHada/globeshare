import React, { useState } from "react";
import LeftSideBar from "./components/left-side-bar/LeftSideBar";
import "./Main.css";
import Home from "./pages/home/Home";
import Header from "./components/header/Header";
import BottomNavbar from "./components/bottom-navbar/BottomNavbar";
import AppRoutes from "./AppRoutes";
import SearchBox from "./components/search-box/SearchBox";
import ModalManager from "./components/modal-manager/ModalManager";

const AppSideNav = () => {
  const [searchBox,setSearchBox]=useState(false);

  const openSearchBox=()=>setSearchBox(true);
  const closeSearchBox=()=>setSearchBox(false);
  return (
    <>
      <LeftSideBar openSearchBox={openSearchBox} searchBox={searchBox} />
      <SearchBox searchBox={searchBox} closeSearchBox={closeSearchBox} />
    </>
  );
};

const AppContent = () => {
  return (
    <section id="app-content">
      <div className="app-pages">
        <AppRoutes />
      </div>
    </section>
  );
};

const Main = () => {
  return (
    <main id="main-app">
      <ModalManager/>
      <AppSideNav />
      <Header />
      <AppContent />
      <BottomNavbar />
    </main>
  );
};

export default Main;
